from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS package

app = Flask(__name__)

# Enable CORS for all routes from your frontend origin
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        return jsonify({
            "status": "healthy",
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Proper error handling

# Your other routes...