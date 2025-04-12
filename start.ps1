# Start the FastAPI backend
Start-Process powershell -ArgumentList "uvicorn server.api:app --reload --port 8000"

# Start the frontend
Start-Process powershell -ArgumentList "npm run dev" 