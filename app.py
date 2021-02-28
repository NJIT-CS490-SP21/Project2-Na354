import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')

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
@socketio.on('board')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(data["message"][10])
    #data['message'][10] = str(PLAYER_ID)
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    #if (data['message'][10] ==  "0"):
    global LastBoard
    LastBoard = data['message']
    print(LastBoard)
    socketio.emit('board',  data, broadcast=False, include_self=True)




PLAYER_ID = 0








@socketio.on('LogIn')
def on_logIn(data):
    print(data)
    global PLAYER_ID
    data['id'] = str(PLAYER_ID)
    data['board'] = LastBoard
    PLAYER_ID = PLAYER_ID + 1
    print(PLAYER_ID)
    socketio.emit('LogIn',  data, broadcast=False, include_self=True)
# Note that we don't call app.run anymore. We call socketio.run with app arg
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)