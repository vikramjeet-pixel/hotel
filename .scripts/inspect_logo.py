import os

image_path = 'assets/images/christmas menu 2026/logo.gif'
if not os.path.exists(image_path):
    print(f"Error: {image_path} does not exist.")
else:
    try:
        with open(image_path, 'rb') as f:
            data = f.read()
            print("Size of file:", len(data))
            print("Header:", data[:6])
            width = data[6] + (data[7] << 8)
            height = data[8] + (data[9] << 8)
            print(f"Dimensions: {width}x{height}")
            # print some byte frequencies or if it has transparency
            # Check for transparent color index in GIF Graphic Control Extension (0x21, 0xF9)
            has_gce = b'\x21\xf9' in data
            print("Contains GCE (transparency info potential):", has_gce)
    except Exception as e:
        print("Error reading image:", e)
