import json
import os
import re
import time
import hashlib
import http.client

URL = "rawpad.up.railway.app"
DIRECTORY = "./stonescript"
ENTRYPOINT = 'Cobblestone.txt'
IMPORT_PATTERN = re.compile(r'\/\/\s?import ([^\s]*)')


def calculate_md5(file_path):
    """Calculate MD5 hash of the file contents."""
    with open(file_path, 'rb') as f:
        file_content = f.read()
    return hashlib.md5(file_content).hexdigest()


def load_script(script_name):
    """Load the content of the script file."""
    file_path = os.path.join(DIRECTORY, f"{script_name}.txt")

    if os.path.exists(file_path):
        with open(file_path, 'r', encoding="utf_8") as f:
            return f.read()
    else:
        print(f"Warning: {file_path} does not exist.")
        return f"// {script_name}.txt not found\n"


def remove_empty_lines(content):
    lines = content.split('\n')
    non_empty_lines = [line for line in lines if line.strip() != '']
    cleaned_text = '\n'.join(non_empty_lines)
    return cleaned_text


def compile(file_path):
    """Compiles the stonescripts into one main script"""
    # TODO, seperate out the stonescripts and custom import them
    with open(file_path, 'r', encoding="utf_8") as f:
      file_content = f.read()

    # Find all import statements
    matches = IMPORT_PATTERN.findall(file_content)

    # Replace each import statement with the content of the corresponding script
    for match in matches:
        print(f"Found import {match}")
        script_content = load_script(match)
        file_content = IMPORT_PATTERN.sub(script_content, file_content, 1)

    # Minify
    # Remove comments
    file_content = re.sub(r'//.*', '', file_content)
    # Remove empty lines
    file_content = remove_empty_lines(file_content)

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


def watch_files(paths):
    """Watch multiple files for changes and post the contents when changed."""
    last_hashes = {path: calculate_md5(path) for path in paths}
    print(f"Watching {paths}")

    while True:
        time.sleep(1)  # Wait for 1 second
        for file_path in paths:
            current_hash = calculate_md5(file_path)
            if current_hash != last_hashes[file_path]:
                print(f"Change detected in {file_path}.")
                compiled_text = compile(file_path)
                post_to_rawpad(compiled_text)
                last_hashes[file_path] = current_hash


def get_imported_files(entrypoint):
    with open(entrypoint, 'r', encoding="utf_8") as f:
      file_content = f.read()

    # build file list
    paths = [os.path.join(DIRECTORY, f"{match}.txt")
             for match in IMPORT_PATTERN.findall(file_content)]
    paths.append(entrypoint)
    # remove paths if it doesnt exist
    paths = [path for path in paths if os.path.exists(path)]

    return paths


if __name__ == "__main__":
    full_path = os.path.join(DIRECTORY, ENTRYPOINT)

    watch_files(get_imported_files(full_path))
