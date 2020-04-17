from flask import Flask
import requests

app = Flask(__name__)


@app.route('/api')
def fetch_clouds():
    CLOUD_URL = "https://api.aiven.io/v1/clouds"
    response = requests.get(CLOUD_URL)

    if response.status_code == 200:
        return {'success': 'true', 'clouds': response.json()}
    else:
        return {'success': 'false', 'clouds': ''}
