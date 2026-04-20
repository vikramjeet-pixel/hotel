import os
import glob
import subprocess

def get_image_info(filepath):
    try:
        size_kb = os.path.getsize(filepath) / 1024
        
        # Use macOS sips to get dimensions
        cmd = f"sips -g pixelWidth -g pixelHeight '{filepath}'"
        output = subprocess.check_output(cmd, shell=True, text=True)
        
        width = 0
        height = 0
        for line in output.split('\n'):
            if 'pixelWidth' in line:
                width = int(line.split()[-1])
            elif 'pixelHeight' in line:
                height = int(line.split()[-1])
                
        format = os.path.splitext(filepath)[1][1:].upper()
        if format == 'JPG': format = 'JPEG'
        
        return size_kb, width, height, format
    except Exception as e:
        return 0, 0, 0, "Unknown"

def main():
    base_dir = "/Users/vikramjeetsingh/Desktop/work/starsupermarket/hotel/assets/images"
    image_files = glob.glob(f"{base_dir}/**/*.*", recursive=True)
    
    print("| Image Path | Current Size | Current Dims | Format | Type | Priority |")
    print("|---|---|---|---|---|---|")
    
    for filepath in sorted(image_files):
        if not filepath.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif')):
            continue
            
        rel_path = os.path.relpath(filepath, "/Users/vikramjeetsingh/Desktop/work/starsupermarket/hotel")
        size_kb, width, height, format = get_image_info(filepath)
        
        # Determine Type and Priority
        img_type = "Gallery"
        priority = "Medium (3)"
        
        lower_path = rel_path.lower()
        if "hero" in lower_path:
            img_type = "Hero"
            priority = "High (1)"
        elif "logo" in lower_path or "icon" in lower_path:
            img_type = "Logo/Icon"
            priority = "Low (5)"
        elif "rooms" in lower_path or "single-room" in lower_path or "standard-double" in lower_path or "king-room" in lower_path or "twin-room" in lower_path or "quad-room" in lower_path:
            img_type = "Room Gallery"
            priority = "High (2)"
        
        if size_kb > 500:
            priority = f"High - Large File ({priority})"
            
        print(f"| `/{rel_path}` | {size_kb:.1f} KB | {width}x{height} | {format} | {img_type} | {priority} |")

if __name__ == '__main__':
    main()
