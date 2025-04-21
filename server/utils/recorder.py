import time
from threading import Thread
from datetime import datetime
from utils.processor import process_audio_and_save
import os
import cv2
import wave
import pyaudio

AUDIO_DIR = "output/audio"
IMAGE_DIR = "public/images"
TRANSCRIPTION_DIR = "public/transcription"
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(IMAGE_DIR, exist_ok=True)
os.makedirs(TRANSCRIPTION_DIR, exist_ok=True)

session_data = {
    "running": False,
    "start_time": None,
    "captured_images": [],
    "summary_file": None,
    "audio_file": None,
    "threads": []
}

CAMERA_INTERVAL = 5
DEFAULT_DURATION = 20

def record_audio(path):
    CHUNK, FORMAT, CHANNELS, RATE = 1024, pyaudio.paInt16, 1, 44100
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
    print("🎙 Audio recording started.")
    frames = []

    while session_data["running"]:
        frames.append(stream.read(CHUNK, exception_on_overflow=False))

    stream.stop_stream()
    stream.close()
    p.terminate()

    with wave.open(path, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(p.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))

    print(f"✅ Audio saved to {path}")

def capture_images():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("❌ Camera not accessible.")
        return
    print("📸 Image capture started.")
    time.sleep(3)
    for _ in range(5):
        cap.read()

    while session_data["running"]:
        ret, frame = cap.read()
        if ret:
            ts = time.strftime("%Y%m%d-%H%M%S")
            fname = os.path.join(IMAGE_DIR, f"blackboard_{ts}.jpg")
            cv2.imwrite(fname, frame)
            session_data["captured_images"].append(f"/images/blackboard_{ts}.jpg")
            print(f"📷 Captured: {fname}")
        time.sleep(CAMERA_INTERVAL)

    cap.release()

def start_session():
    session_data["running"] = True
    session_data["start_time"] = datetime.now()
    session_data["captured_images"] = []

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    audio_path = os.path.join(AUDIO_DIR, f"audio_{ts}.wav")
    session_data["audio_file"] = audio_path

    audio_thread = Thread(target=record_audio, args=(audio_path,))
    camera_thread = Thread(target=capture_images)

    session_data["threads"] = [audio_thread, camera_thread]
    audio_thread.start()
    camera_thread.start()

def stop_session():
    session_data["running"] = False
    for thread in session_data["threads"]:
        thread.join()

    summary_path = process_audio_and_save(
        session_data["audio_file"],
        session_data["captured_images"],
        TRANSCRIPTION_DIR
    )
    session_data["summary_file"] = summary_path