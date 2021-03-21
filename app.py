import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
import time
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db = SQLAlchemy(app)

def converter(data):
    return [item.makeReadable for item in data]
    
    
import models
Person=models.define_user_class(db)
db.create_all()
DB_Data = Person.query.order_by(Person.rank.desc())
players = converter(DB_Data)
print(players)





cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')


def index(filename):
    return send_from_directory('./build', filename)
    
# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')
    socketio.emit('connect', broadcast=True, include_self=False)
   



# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')
    
    


# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided


LastBoard = ['false','','','','','','','','','','0','0']
Default = ['false','','','','','','','','','','0','0']
PLAYER_ID = 0
PLAYER_LIST = []

@socketio.on('board')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(data["message"][10])
    global LastBoard
    LastBoard = data['message']
    print(LastBoard)
    CheckForWin()
    if('' not in LastBoard):
        print('BOARD FULL')
        socketio.emit('board',  data, broadcast=True, include_self=True)
        time.sleep(5)
        on_reset()
    socketio.emit('board',  data, broadcast=True, include_self=True)


@socketio.on('Reset')
def on_reset():
    print('ResetBoard')
    global PLAYER_ID
    global PLAYER_LIST
    global LastBoard
    global Default
    PLAYER_ID = 0
    PLAYER_LIST = []
    LastBoard = Default
    socketio.emit('Reset', Default, broadcast=True, include_self=True)
    

@socketio.on('LogIn')
def on_logIn(data):
    global PLAYER_ID
    global PLAYER_LIST
    NewName = True
    PLAYER_LIST.append(data['message'])
    for users in players:
        if data['message'] in users['username']:
            NewName = False
            
    if NewName:
        newPlayer = Person(username=data['message'], rank=100, wins=0)
        db.session.add(newPlayer)
        db.session.commit()
    print(PLAYER_LIST)
    data['message'] = PLAYER_LIST
    data['id'] = str(PLAYER_ID)
    data['board'] = LastBoard
    PLAYER_ID = PLAYER_ID + 1
    print(PLAYER_ID)
    
    
    
    socketio.emit('LogIn',  data, broadcast=True, include_self=True)
# Note that we don't call app.run anymore. We call socketio.run with app arg

LeaderBoard = []
@socketio.on('Leaderboard')
def on_LeaderboardOpen():
    global LeaderBoard
    DB_Data = Person.query.order_by(Person.rank.desc())
    players = converter(DB_Data)
    LeaderBoard = []
    for users in players:
        LeaderBoard.append([users['username'], users['rank'], users['wins']])
    print(LeaderBoard)
    socketio.emit('Leaderboard', LeaderBoard, broadcast=True, include_self=True)
    print("opening Leaderboard")
    
def CheckForWin():
    print("checking for winner")
    
    #check Vertical Win condition
    for i in range(1,4):
        if((LastBoard[i] != '') and (LastBoard[i] == LastBoard[(i+3)]) and (LastBoard[i] == LastBoard[(i+6)])):
            
            if(LastBoard[i] == 'x'):
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.wins:1+Person.wins}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.rank:1+Person.rank}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.rank:Person.rank-1}, synchronize_session = 'evaluate')
                db.session.commit()
                socketio.emit('winner', PLAYER_LIST[0],  broadcast=True, include_self=True)
                
                
            else:
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.wins:1+Person.wins}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.rank:1+Person.rank}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.rank:Person.rank-1}, synchronize_session = 'evaluate')
                db.session.commit()
                socketio.emit('winner', PLAYER_LIST[1],  broadcast=True, include_self=True)
                print("winner found")
             
    
    #check Horiziontal Win condition
    for i in range(1,8,3):
        print(i)
        if((LastBoard[i] != '') and (LastBoard[i] == LastBoard[(i+1)]) and (LastBoard[i] == LastBoard[(i+2)])):
            
            if(LastBoard[i] == 'x'):
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.wins:1+Person.wins}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.rank:1+Person.rank}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.rank:Person.rank-1}, synchronize_session = 'evaluate')
                db.session.commit()
                socketio.emit('winner', PLAYER_LIST[0],  broadcast=True, include_self=True)
                
                
            else:
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.wins:1+Person.wins}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.rank:1+Person.rank}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.rank:Person.rank-1}, synchronize_session = 'evaluate')
                db.session.commit()
                socketio.emit('winner', PLAYER_LIST[1],  broadcast=True, include_self=True)
                print("winner found")
                
                
    #checks Diagonal
    if((LastBoard[1] != '') and (LastBoard[1] == LastBoard[5]) and (LastBoard[1] ==  LastBoard[9])):
            
            if(LastBoard[i] == 'x'):
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.wins:1+Person.wins}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.rank:1+Person.rank}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.rank:Person.rank-1}, synchronize_session = 'evaluate')
                db.session.commit()
                socketio.emit('winner', PLAYER_LIST[0],  broadcast=True, include_self=True)
                
                
            else:
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.wins:1+Person.wins}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.rank:1+Person.rank}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.rank:Person.rank-1}, synchronize_session = 'evaluate')
                db.session.commit()
                socketio.emit('winner', PLAYER_LIST[1],  broadcast=True, include_self=True)
                print("winner found")
                
    
    if((LastBoard[3] != '') and (LastBoard[3] == LastBoard[5]) and (LastBoard[3] ==  LastBoard[7])):
            
            if(LastBoard[i] == 'x'):
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.wins:1+Person.wins}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.rank:1+Person.rank}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.rank:Person.rank-1}, synchronize_session = 'evaluate')
                db.session.commit()
                socketio.emit('winner', PLAYER_LIST[0],  broadcast=True, include_self=True)
                
                
            else:
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.wins:1+Person.wins}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[1]).update({Person.rank:1+Person.rank}, synchronize_session = 'evaluate')
                x = db.session.query(Person).filter(Person.username==PLAYER_LIST[0]).update({Person.rank:Person.rank-1}, synchronize_session = 'evaluate')
                db.session.commit()
                socketio.emit('winner', PLAYER_LIST[1],  broadcast=True, include_self=True)
                print("winner found")

if __name__ == "__main__":
    db.create_all()                 
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)