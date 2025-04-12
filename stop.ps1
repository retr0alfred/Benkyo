# Kill processes on the ports
Get-Process | Where-Object {$_.MainWindowTitle -like "*npm*"} | Stop-Process -Force
Get-Process | Where-Object {$_.MainWindowTitle -like "*uvicorn*"} | Stop-Process -Force 