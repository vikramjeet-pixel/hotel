import urllib.request

urls = [
    "http://localhost:8080/assets/images/christmas%20menu%202026/logo.gif",
    "http://localhost:8080/assets/images/christmas menu 2026/logo.gif"
]

for url in urls:
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            print(f"{url}: {response.status}")
    except Exception as e:
        print(f"{url}: Failed - {e}")
