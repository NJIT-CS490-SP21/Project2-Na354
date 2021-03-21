# Read me for starting app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Testing
1. Open atleast 2 copies of the heroku website.
2. Type in names for accounts
3. hit reset and watch it restart the board
4. only 1 person can go at a time
5. The first two people can go starting with x and the next person is os

## Known Problems
1. I wasnt able to get the names of players to display. If I had more time I would've made them work taking an array and adding it to a usestate. For some reason this wasn't working when testing it and I didn't have time to fix it.
2. I wasn't able to get it to display who won. With more time I would've checked the array sent to the server for the different array comibnations spots and if theyre all the same letter do a socketio.emit(winner) of some type and call the resest function. I didn't have enough time today to do these as I was afraid to break the code as it was bugging out.

## Technical Issues
1. For a while I was getting a host invalid when I deployed to Heroku. What I noticed is the gitignore wasn't sending the env file to disable host check. So I removed the git ignore on that file and re-commited.

2. Before I could upload on the due day my server was bugging out and my log in function was reseting player ids making the second person able to go. I had to rewrite the log in function to then realize I could just import a value form the login. Because I was pinging to the server to log in I couldn't find a way to broadcast only to the original client. So it was changing player IDs. I imported a value from the login component to the original app.js file to return a new player id if that client actually logged in and to not include those who already logged in.
