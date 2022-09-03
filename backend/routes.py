from flask import render_template, url_for, flash, redirect, request, send_file
from backend import app, db
from backend.models import Card,Photo
from time import localtime, strftime

from flask import jsonify
import datetime
from datetime import timezone, timedelta
from werkzeug.utils import secure_filename
import secrets
from PIL import Image
import os
import json
from PIL import Image



def save_document(new_file):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(new_file.filename)
    picture_fn = random_hex + f_ext
    new_file_path = os.path.join(app.root_path, "static/images/", picture_fn)
    new_file.save(new_file_path)

    return new_file_path

@app.route("/")
def home():

    return "Running",200


@app.route("/api/getcards",methods=['GET'])
def get_cards():
    cards = Card.query.all()
    return jsonify([i.serialize for i in cards])

@app.route("/api/getphoto/<photo_id>",methods=['GET'])
def getphoto(photo_id):
    
    return send_file(Photo.query.get_or_404(photo_id).path)


@app.route("/api/getphotos",methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return jsonify(photos=[i.serialize for i in photos])

@app.route("/api/getfirstphoto?<card_id>",methods=['GET'])
def get_first_photo(card_id):
    try:
        # card_id = request['card_id']
        
        photo = Card.query.get_or_404(card_id).pics[0]
        
        return send_file(photo.path)
    except Exception as e:
        print(e)
        return 400

@app.route("/api/get_card_photos/",methods=['GET'])
def get_card_photo():
    try:
        card_id = request.args.get('card_id')
        
        photos = Photo.query.filter(Photo.card_id==card_id)
        print(card_id)
        
        return jsonify(photos=[i.serialize for i in photos])
    except Exception as e:
        print(e)
        return str(e)
    
@app.route("/deletecard",methods=['POST'])
def deletecard():
    try:
        
        card_id = request.args.get("card_id")
        print("Deleting " + card_id)
        card = Card.query.get_or_404(card_id)
        db.session.delete(card)
        db.session.commit()
        return
    except Exception as e:
        return str(e)
@app.route("/addcard/", methods=["POST"])
def add_card():
    try:
        name = request.form.get("name")
        shop_name = request.form.get("shop_name")
        language = request.form.get("language")
        type = request.form.get("type")
        mail = request.form.get("mail")
        country = request.form.get("country")
        city = request.form.get("city")
        street = request.form.get("street")
        street_no= request.form.get("street_no")
        post_code= request.form.get("post_code")
        pics=request.files.getlist("pics")


        print("Request received.")
        print(name)
        print(shop_name)
        print(language)
        print(type)
        print(mail)
        print(country)
        print(city)
        print(street)
        print(street_no)
        print(post_code)
        
        for pic in pics:
            print(pic)
        new_card = Card(
            name=name,
            shop_name=shop_name,
            language=language,
            type=type,
            mail=mail,
            country=country,
            city=city,
            steeet=street,
            street_no=street_no,
            post_code=post_code
        )
        db.session.add(new_card)
        db.session.flush()
        
        for pic in pics:
            print("Saving image" + pic.filename)
            filename = save_document(pic)
            
            new_pic = Photo(
                path = filename,
                card_id = new_card.id
            )
            db.session.add(new_pic)
            db.session.commit()
    except Exception as e:
        print(str(e))
        return (str(e)), 400
    return "New  card added", 200


