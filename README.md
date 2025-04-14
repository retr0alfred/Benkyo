# 📚 Benkyo — AI-Powered Learning Assistant

**Benkyo** is an intelligent classroom assistant designed to enhance teaching and learning experiences. It records live lectures, transcribes them using AI, and generates structured study materials like summaries, quizzes, and flashcards. With Benkyo, students can revisit lectures efficiently, and educators can offer more impactful learning experiences.

---

## 🚀 Features

- 🎙️ **Real-Time Lecture Recording & Transcription**  
  Capture classroom audio and convert it into accurate, time-stamped text using speech-to-text AI.

- 🧠 **Automatic Study Material Generation**  
  Extracts summaries, multiple-choice questions, and flashcards from lecture content for improved revision and comprehension.

- 🧾 **Structured Notes Output**  
  Outputs structured transcripts and notes in an easy-to-read format, exportable for later use.

- 🌐 **Cross-Platform Web Interface**  
  Built with modern tools like Vite, TypeScript, and Tailwind CSS for a smooth, responsive user experience.

- ⚙️ **Developer Friendly & Open Source**  
  Modular architecture, documented scripts, and MIT license make it easy to deploy, customize, and contribute.


## 📁 Project Structure

```bash
.
├── index.html              # Entry point of the web interface
├── start.sh                # Startup script for Linux/macOS
├── start.ps1               # Startup script for Windows PowerShell
├── package.json            # Node.js project metadata and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS settings
├── vite.config.ts          # Vite development server configuration
├── dependencies.txt        # 📌 Unified list of Python & Node dependencies
├── requirements.txt        # Python-specific dependencies
├── .eslintrc.cjs           # ESLint config for code linting
├── .gitignore              # Git ignore rules
└── src/                    # Application source code (React/TypeScript)
    ├── main.tsx            # App entry point
    ├── App.tsx             # Main React component
    └── components/         # UI components
```

---

## ⚙️ Installation & Setup

> 💡 All dependencies (Node + Python) are listed in `dependencies.txt`.

### 1. Clone the Repository

```bash
git clone https://github.com/retr0alfred/Benkyo.git
cd Benkyo
```

### 2. Install Node.js Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install
```

### 3. Install Python Dependencies

Make sure you have [Python 3.8+](https://www.python.org/) and `pip` installed.

Using the comprehensive list:

```bash
pip install -r dependencies.txt
```

Or the default Python-only list:

```bash
pip install -r requirements.txt
```

### 4. Start the App

#### On Linux/macOS:

```bash
./start.sh
```

#### On Windows (PowerShell):

```powershell
.\start.ps1
```

---

## 🧪 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Vite + TypeScript + Tailwind CSS  |
| Backend    | Python                            |
| Runtime    | Bun (optional) or Node.js         |
| Scripts    | Shell & PowerShell Startup Files  |

---

## 📌 Dependencies

All required libraries and tools are listed in `dependencies.txt`, including:

- Node modules: `vite`, `tailwindcss`, `typescript`, etc.
- Python packages: `openai`, `pydub`, `whisper`, `transformers`, `torch`, etc.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork this repository
2. Create a feature branch: `git checkout -b new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin new-feature`
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.  
Feel free to use, distribute, and modify — just give credit where it’s due. See the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgements

Built with ❤️ by retr0alfred and contributors.  
Inspired by the vision of smarter, accessible education through technology.

---

## 📬 Contact

For questions, feedback, or collaborations, open an issue or reach out via GitHub.
```

---

Let me know if you want this saved as a downloadable `.md` file or embedded into your repo!
