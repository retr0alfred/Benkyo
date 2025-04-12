# Test the backend API
curl http://localhost:8000/api/video/start -X POST -H "Content-Type: application/json" -d '{"title":"Test Recording","captureBlackboard":true}'

# You should see a response with a recordingId 