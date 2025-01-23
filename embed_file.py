import sys
import base64

with open(sys.argv[1]) as f:
  js = f.read()

with open(sys.argv[2], "rb") as f:
  b64 = base64.b64encode(f.read()).decode()
  js = js.replace("__iwad_file__", b64, 1)
  js = js.replace("__iwad_filename__", "doom1.wad", 1)

with open(sys.argv[3], "w") as f:
  f.write(js)