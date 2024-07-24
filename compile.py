import json
import os
import time
import hashlib
import http.client

URL = "rawpad.up.railway.app"
FILE_PATH = 'Cobblestone.txt'

def calculate_md5(file_path):
    """Calculate MD5 hash of the file contents."""
    with open(file_path, 'rb') as f:
        file_content = f.read()
    return hashlib.md5(file_content).hexdigest()

def compile(file_path):
    """Compiles the stonescripts into one main script"""
    # TODO, seperate out the stonescripts and custom import them
    with open(file_path, 'r') as f:
      file_content = f.read()
    
    return file_content

def post_to_rawpad(content):
    """Post the contents of the file to the specified URL."""
    conn = http.client.HTTPSConnection(URL)
    headers = {'Content-type': 'application/json'}
    body = json.dumps({"content": content})
    conn.request('POST', '/save', body, headers)
    response = conn.getresponse()
    print(response.status, response.reason)
    conn.close()

def watch_file(file_path):
    """Watch the file for changes and post the contents when changed."""
    last_hash = calculate_md5(file_path)
    while True:
        time.sleep(1)  # Wait for 1 second
        current_hash = calculate_md5(file_path)
        if current_hash != last_hash:
            print(f"Change detected in {file_path}.")
            compiled_text = compile(file_path)
            post_to_rawpad(compiled_text)
            last_hash = current_hash

if __name__ == "__main__":
    if os.path.exists(FILE_PATH):
        print(f"Watching {FILE_PATH} for changes...")
        watch_file(FILE_PATH)
    else:
        print(f"File {FILE_PATH} does not exist.")
