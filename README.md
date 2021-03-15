# Read me for starting app (Milestone 2)

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
6. One winning you can restart the board but you need to refresh.
7. Once a person wins the leaderboard will update and highlight their name and increase/decrease based on the outcome.

## Known Problems (Milestone 2)
1. When someone wins it declares the winner and lets the players hit the reset button. For some reason whe nthis button is pressed it takes hitting it twice. But, this doesnt always properly reset it. The person has to refresh the page and log in and hit that reset button to properly reset the board for some reason. I could probably fix this by recalling the reset function in my win check and use a delay like I did for a full board with more time.

2. For some reason when you enter a new usernamer if its lower case it counts as being a new name to the server but not to the database and can cause issues if you log in with caps then non capital letters. I would probably fix this by doing a .lowercase function for any username entered with more time.
## Technical Issues (Milestone 2)
1. I struggled really hard with getting my database to work with my app.py I figured out all the leaderboard problems I just couldn't solve the circular import error. I end up copying the solution in the slack and changed it a bit to fit my database. I had to fix a circular import issue by using a function call to create the class from model.py.
2.  My database wasnt properly sorting even though I was using order_by. I end found out that I was typing the wrong call. I was doing query.all.order_by. I spent 2 hours trying to fix it to realize I used the wrong call.
