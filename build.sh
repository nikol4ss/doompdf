#!/bin/bash

set -e
set -x

if [ ! -d "./emsdk" ]; then
  git clone https://github.com/emscripten-core/emsdk.git --branch 1.39.20
  ./emsdk/emsdk install 1.39.20-fastcomp
  ./emsdk/emsdk activate 1.39.20-fastcomp
fi

source ./emsdk/emsdk_env.sh >/dev/null 2>&1
source ./.venv/bin/activate >/dev/null 2>&1

if [ ! -f "doomgeneric/doom1.wad" ]; then
  wget "https://distro.ibiblio.org/slitaz/sources/packages/d/doom1.wad" -O "doomgeneric/doom1.wad"
fi
if [ "$1" = "clean" ]; then
  emmake make -C doomgeneric -f Makefile.pdfjs clean
fi
emmake make -C doomgeneric -f Makefile.pdfjs -j$(nproc --all)

mkdir -p out
cp web/* out/

python3 embed_file.py file_template.js doomgeneric/doom1.wad out/data.js
cat pre.js out/data.js doomgeneric/doomgeneric.js > out/compiled.js
cat pre.js file_template.js doomgeneric/doomgeneric.js > out/compiled_nowad.js

python3 generate.py out/compiled.js out/doom.pdf
python3 generate.py out/compiled_nowad.js out/doom_nowad.pdf