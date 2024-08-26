from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/typing', methods=['POST', 'GET'])
def typing():
    data = request.json
    if data['status'] == 'started':
        print("User started typing...")
    elif data['status'] == 'stopped':
        print("User stopped typing.")

    return jsonify(success=True)


if __name__ == '__main__':
    app.run(debug=True)
