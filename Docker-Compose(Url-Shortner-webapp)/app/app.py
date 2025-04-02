from flask import Flask, render_template, request, redirect
import redis
import random
import string

app = Flask(__name__)
r = redis.Redis(host='redis', port=6379, db=0)

def generate_short_id():
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(6))

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        long_url = request.form['url']
        short_id = generate_short_id()
        r.set(short_id, long_url)
        return f"Short URL: {request.host_url}{short_id}"
    return render_template('index.html')

@app.route('/<short_id>')
def redirect_url(short_id):
    long_url = r.get(short_id)
    if long_url:
        return redirect(long_url.decode('utf-8'))
    return "URL not found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
