import flask, os
from flask import render_template, make_response, send_file
from threading import Thread

app = flask.Flask('xmods')
app.secret_key = os.environ['appsecretkey']

@app.route('/')
def mods():
    return '<body style="background:#000000"></body><script>window.location.href = "https://qwkq.repl.co/o/l/mods";</script>'

@app.route('/_')
def mods_():
    return make_response(render_template('mods.html'))

@app.route('/mod/<n>')
def mod(n):
    return send_file(f'mods/{n}', mimetype='text/javascript')

@app.route('/css/<n>')
def css(n):
    return send_file(f'css/{n}', mimetype='text/css')

@app.route('/img/<n>')
def img(n):
    return send_file(f'img/{n}', mimetype='image/png')

def run():
    app.run(host='0.0.0.0', port=5050)

def keep_alive():
    keepalivet = Thread(target=run)
    keepalivet.start()


keep_alive()