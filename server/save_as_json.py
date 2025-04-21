import json
from datetime import datetime
import os

def save_as_json(summary_text, corrected_text, output_dir="transcriptions"):
    os.makedirs(output_dir, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{output_dir}/lecture_{timestamp}.json"

    data = {
        "timestamp": timestamp,
        "corrected_summary": corrected_text
    }

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"📄 Notes saved as JSON: {filename}")
