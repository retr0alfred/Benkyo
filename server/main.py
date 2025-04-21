from flask import Flask, jsonify
from flask_cors import CORS
from threading import Thread
import time
import os
import json
from flask import request
from utils.recorder import start_session, stop_session, session_data

app = Flask(__name__)  # Fix here: __name__ instead of _name_
CORS(app, origins=["http://localhost:8080"])

TRANSCRIPTION_DIR = "public/transcription"

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"}), 200

@app.route('/api/recordings/start', methods=['POST'])
def start():
    if session_data["running"]:
        return jsonify({"status": "error", "message": "Session already running"}), 400
    Thread(target=start_session).start()
    return jsonify({"status": "started"}), 200

@app.route('/api/recordings/stop', methods=['POST'])
def stop():
    if not session_data["running"]:
        return jsonify({"status": "error", "message": "No session running"}), 400
    stop_session()
    return jsonify({
        "status": "completed",
        "summary_file": session_data["summary_file"]
    }), 200

@app.route('/api/transcriptions', methods=['GET'])
def get_transcriptions():
    transcriptions = []

    if not os.path.exists(TRANSCRIPTION_DIR):
        return jsonify([])

    for filename in os.listdir(TRANSCRIPTION_DIR):
        if filename.endswith(".json"):
            filepath = os.path.join(TRANSCRIPTION_DIR, filename)
            try:
                with open(filepath, 'r') as f:
                    data = json.load(f)
                    transcriptions.append(data)
            except Exception as e:
                print(f"Error loading {filename}: {e}")

    # Optional: sort by timestamp descending
    transcriptions.sort(key=lambda x: x.get("timestamp", ""), reverse=True)

    return jsonify(transcriptions), 200


@app.route('/api/create-event', methods=['POST'])
def create_event():
    try:
        data = request.json
        summary_text = data.get("text", "")

        if not summary_text:
            return jsonify({"error": "No text provided"}), 400

        result = extract_and_create_events(summary_text)
        return jsonify({"status": "success", "created_events": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':  # Fix here: __name__ instead of _name_
    app.run(debug=True)
