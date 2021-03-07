def define_user_class(db):
    class Person(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)
        rank = db.Column(db.Integer())
        wins = db.Column(db.Integer())
    
        def __repr__(self):
            return '<Person %r>' % self.username
        
        @property
        def makeReadable(self):
            return {
            'id' : self.id,
            'username' : self.username,
            'rank' : self.rank,
            'wins' : self.wins
            }
    return Person
    