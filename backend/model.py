from datetime import datetime
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    username = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, default=datetime.now())


    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()


    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()


    def set_password(self, password: str):
        self.password = generate_password_hash(password)

    def check_password(self, password: str):
        return check_password_hash(self.password, password)


    @classmethod
    def find_by_email(cls, email: str) -> "User":
        return cls.query.filter_by(email=email).first()


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(50), nullable=False)
    directions = db.Column(db.String(1500), nullable=False)
    ingredients = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    minute = db.Column(db.Integer)
    serving = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    timestamp = db.Column(db.DateTime, default=datetime.now())


    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id: int) -> "Recipe":
        return cls.query.filter_by(id=_id).first()
                        