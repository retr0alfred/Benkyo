import whisper
import json
from transformers import pipeline
from datetime import datetime
import language_tool_python
import os


def transcribe_audio(audio_path):
    model = whisper.load_model("medium")
    result = model.transcribe(audio_path)
    return result["text"]

def summarize_text(text):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    return summarizer(text, max_length=200, min_length=50, do_sample=False)[0]["summary_text"]

def correct_text(text):
    tool = language_tool_python.LanguageTool('en-US')
    return tool.correct(text)

def process_audio_and_save(audio_file, images, output_dir):
    print("🔠 Transcribing...")
    transcribed = transcribe_audio(audio_file)
    print("📝 Summarizing...")
    summary = summarize_text(transcribed)
    print("🔧 Correcting grammar...")
    corrected = correct_text(summary)

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_path = os.path.join(output_dir, f"lecture_{ts}.json")
    data = {
        "timestamp": ts,
        "summary": summary,
        "corrected_summary": corrected,
        "images": images
    }
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"📁 Summary saved: {output_path}")
    return output_path