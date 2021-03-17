import os
import time
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
DB = SQLAlchemy(APP)


def converter(data):  #test test
    return [item.makeReadable for item in data]


import models

Person = models.define_user_class(DB)
DB.create_all()
DB_DATA = Person.query.order_by(Person.rank.desc())
PLAYERS = converter(DB_DATA)
print(PLAYERS)

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@SOCKETIO.on('connect')
def on_connect():
    print('User connected!')
    SOCKETIO.emit('connect', broadcast=True, include_self=False)


# When a client disconnects from this Socket connection, this function is run
@SOCKETIO.on('disconnect')
def on_disconnect():
    print('User disconnected!')


# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided

lastBoard = ['false', '', '', '', '', '', '', '', '', '', '0', '0']
Default = ['false', '', '', '', '', '', '', '', '', '', '0', '0']
PLAYER_ID = 0
PLAYER_LIST = []


@SOCKETIO.on('board')
def on_chat(data):  # data is whatever arg you pass in your emit call on client
    print(data["message"][10])
    global lastBoard
    lastBoard = data['message']
    print(lastBoard)
    CheckForWin()
    if '' not in lastBoard:
        print('BOARD FULL')
        SOCKETIO.emit('board', data, broadcast=True, include_self=True)
        time.sleep(5)
        on_reset()
    SOCKETIO.emit('board', data, broadcast=True, include_self=True)


@SOCKETIO.on('Reset')
def on_reset():
    print('ResetBoard')
    global PLAYER_ID
    global PLAYER_LIST
    global lastBoard
    global Default
    PLAYER_ID = 0
    PLAYER_LIST = []
    lastBoard = Default
    SOCKETIO.emit('Reset', Default, broadcast=True, include_self=False)


@SOCKETIO.on('LogIn')
def on_logIn(data):
    global PLAYER_ID
    global PLAYER_LIST
    NewName = True
    PLAYER_LIST.append(data['message'])
    for users in PLAYERS:
        if data['message'] in users['username']:
            NewName = False

    if NewName:
        add_user(data['message'])
        
    print(PLAYER_LIST)
    data['message'] = PLAYER_LIST
    data['id'] = str(PLAYER_ID)
    data['board'] = lastBoard
    PLAYER_ID = PLAYER_ID + 1
    print(PLAYER_ID)

    SOCKETIO.emit('LogIn', data, broadcast=True, include_self=True)

def add_user(username):
    newPlayer = Person(username=username, rank=100, wins=0)
    DB.session.add(newPlayer)
    DB.session.commit()
# Note that we don't call app.run anymore. We call socketio.run with app arg

LeaderBoard = []


@SOCKETIO.on('Leaderboard')
def on_LeaderboardOpen():
    global LeaderBoard
    DB_DATA2 = Person.query.order_by(Person.rank.desc())
    players = converter(DB_DATA2)
    LeaderBoard = []
    for users in players:
        LeaderBoard.append([users['username'], users['rank'], users['wins']])
    print(LeaderBoard)
    SOCKETIO.emit('Leaderboard',
                  LeaderBoard,
                  broadcast=True,
                  include_self=True)
    print("opening Leaderboard")


def playerOneWon():
    update = DB.session.query(Person).filter(
        Person.username == PLAYER_LIST[0]).update(
            {Person.wins: 1 + Person.wins}, synchronize_session='evaluate')
    update = DB.session.query(Person).filter(
        Person.username == PLAYER_LIST[0]).update(
            {Person.rank: 1 + Person.rank}, synchronize_session='evaluate')
    update = DB.session.query(Person).filter(
        Person.username == PLAYER_LIST[1]).update(
            {Person.rank: Person.rank - 1}, synchronize_session='evaluate')
    DB.session.commit()
    SOCKETIO.emit('winner', PLAYER_LIST[0], broadcast=True, include_self=True)
    print(update)


def playerTwoWon():
    update = DB.session.query(Person).filter(
        Person.username == PLAYER_LIST[1]).update(
            {Person.wins: 1 + Person.wins}, synchronize_session='evaluate')
    update = DB.session.query(Person).filter(
        Person.username == PLAYER_LIST[1]).update(
            {Person.rank: 1 + Person.rank}, synchronize_session='evaluate')
    update = DB.session.query(Person).filter(
        Person.username == PLAYER_LIST[0]).update(
            {Person.rank: Person.rank - 1}, synchronize_session='evaluate')
    DB.session.commit()
    SOCKETIO.emit('winner', PLAYER_LIST[1], broadcast=True, include_self=True)
    print(update)


def checkVertical():
    for i in range(1, 4):
        if lastBoard[i] != '' and (lastBoard[i] == lastBoard[(i + 3)] and
                                   (lastBoard[i] == lastBoard[(i + 6)])):

            if lastBoard[i] == 'x':
                playerOneWon()

            else:
                playerTwoWon()


def checkHorizontal():
    for i in range(1, 8, 3):
        print(i)
        if ((lastBoard[i] != '') and (lastBoard[i] == lastBoard[(i + 1)])
                and (lastBoard[i] == lastBoard[(i + 2)])):

            if lastBoard[i] == 'x':
                playerOneWon()

            else:
                playerTwoWon()


def CheckForWin():
    print("checking for winner")
    checkVertical()
    checkHorizontal()
    #checks Diagonal
    if (lastBoard[1] != '') and (lastBoard[1] == lastBoard[5] and
                                 (lastBoard[1] == lastBoard[9])):

        if lastBoard[5] == 'x':
            playerOneWon()

        else:
            playerTwoWon()

    if (lastBoard[3] != '') and (lastBoard[3] == lastBoard[5] and
                                 (lastBoard[3] == lastBoard[7])):

        if lastBoard[5] == 'x':
            playerOneWon()

        else:
            playerTwoWon()


if __name__ == "__main__":
    DB.create_all()
SOCKETIO.run(
    APP,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
