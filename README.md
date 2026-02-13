# DoomPDF

This is a Doom source port that runs inside a PDF file. You can play Doom directly inside a PDF, leveraging Javascript in a PDF for interactive gaming.

Play it here: [doom.pdf](https://doompdf.pages.dev/doom.pdf)

## Tech Stack

**Client:** PDF (Chromium, Firefox)

**Server:** JavaScript, Emscripten, PDF.js

## PDF Javascript Integration

Surprisingly, PDF files support Javascript, which can be used for interactive features like gaming. In this project, we leverage this capability to run Doom inside a PDF file. 

### Key Concepts

- **PDF Javascript**: The PDF file format supports Javascript with its own standard library. This allows for interactive elements such as games.
- **Porting Doom**: We compile C code to run inside a PDF using Emscripten targeting asm.js instead of WebAssembly.
- **Text Field Manipulation**: We simulate a framebuffer by manipulating text fields to display Doom’s graphical output in a limited way (monochrome with ASCII characters).

### Features

1. **Doom Gameplay**: Play Doom directly within the PDF using keyboard input and an ASCII-based framebuffer output.
2. **Console Logging**: The PDF features a console for debugging, which captures stdout using stacked text fields for easier troubleshooting.
3. **Custom WAD Files**: Insert custom WAD files into the PDF for personalized gameplay. Upload your WAD files at [doompdf.pages.dev](https://doompdf.pages.dev/) to generate a new Doom PDF.
