from flask import Flask, render_template
import requests


class LineNotify:
    API_URL = 'https://notify-api.line.me/api/notify'

    def __init__(self, access_token):
        self.__header = {'Authorization': 'Bearer ' + access_token}

    def send_message(self, message, image=None, sticker_package_id=None, sticker_id=None):
        # payload: データのうち実際に送る部分
        payload = {
            'message': message,
            'stickerPackageId': sticker_package_id,
            'stickerId': sticker_id,
        }
        files = {}
        if image is not None:
            files = {'imageFile': open(image, 'rb')}
        r = requests.post(LineNotify.API_URL, headers=self.__header, data=payload, files=files, )



        
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    bot = LineNotify(access_token='WNV9a94MM1TG8FBlziuWodI2zTphlnmzhzcGK9Jqu5Z')
    bot.send_message(message='hello')
