from datetime import datetime
from sqlite3 import register_converter
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from backend import db, app



class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(60), nullable=False)
    shop_name = db.Column(db.String(60), nullable=False)
    language = db.Column(db.String(60), nullable=False)
    type = db.Column(db.String(60), nullable=False)
    mail = db.Column(db.String(60), nullable=False)
    country = db.Column(db.String(60), nullable=False)
    city =db.Column(db.String(60), nullable=False)
    steeet =db.Column(db.String(60), nullable=False)
    street_no =db.Column(db.String(60), nullable=False)
    post_code = db.Column(db.String(10), nullable=False)
    pics = db.relationship("Photo", cascade="all,delete", backref="card")
    
    def __repr__(self):
        return f'<Card "{self.name}">'

    @property
    def serialize(self):
     
        return {
            "id": self.id,
            "name": self.name,
            "shop_name": self.shop_name,
            "language": self.language,
            "type": self.type,
            "mail": self.mail,
            "country": self.country,
            "city": self.city,
            "street": self.steeet,
            "street_no": self.street_no,
            "post_code": self.post_code
            
        }
        
        
        
class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    path = db.Column(db.String(60), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    card_id = db.Column(db.Integer, db.ForeignKey("card.id"), nullable=False)

    def __repr__(self):
        return f'<Photo "{self.path}">'

    @property
    def serialize(self):
       
        return {
            "id": self.id,
            "path": self.path,
            "card": self.card_id
        }