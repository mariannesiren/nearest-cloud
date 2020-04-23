from flask import Flask
from flask_caching import Cache
import requests

config = {
    "DEBUG": True,
    "CACHE_TYPE": "simple",
    "CACHE_DEFAULT_TIMEOUT": 300
}

app = Flask(__name__)
app.config.from_mapping(config)
cache = Cache(app)


@app.route('/api')
@cache.cached()
def fetch_clouds():
    URL = "https://api.aiven.io/v1/clouds"
    response = requests.get(URL)

    if response.status_code == 200:
        return {'success': 'true', 'clouds': response.json()}
    else:
        return {'success': 'false', 'clouds': ''}
