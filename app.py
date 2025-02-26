from flask import Flask, jsonify
import psutil

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello, World!'

@app.route('/getcpu', methods=['GET'])
def get_cpu():
    cpu_percent = psutil.cpu_percent(interval=1)
    cpu_count = psutil.cpu_count()
    return jsonify({
        'cpu_usage_percent': cpu_percent,
        'cpu_count': cpu_count,
        'status': 'success'
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint bulunamadı',
        'status_code': 404
    }), 404

if __name__ == '__main__':
    app.run(debug=True) 