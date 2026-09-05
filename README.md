![](https://i.imgur.com/L7moBQT.png)

# Part Designer

This is a free online CAD tool to create custom LEGO® Technic compatible construction parts for 3D printing.

Erweiterter Fork des [Part Designer](https://github.com/marian42/partdesigner) von Marian Kleineberg (MIT-lizenziert).

## Version 2 (v2.02.00)

New version of the Part Designer with the following new features:
- Save Part: Save your part design to a local file
- Load Part: Load a previously saved part design from a local file
- Schmelzloch: A simple cylindrical hole block, positioned like a Pin Hole, with an adjustable diameter (default 2.9mm)
- Rampe (Wedge): A block whose own volume is cut diagonally by a plane, with a selectable corner/direction for the cut ("Rampenrichtung"). Connects seamlessly to neighboring blocks and to other Rampe blocks continuing the same ramp
- Resizable sidebar: Drag the handle at the sidebar's edge to adjust its width
- Background grid: A reference grid is drawn behind the model to help gauge the raster; choose which plane (X/Y/Z) it's shown in via "Grid Plane"
- Keyboard shortcuts (type, orientation, cursor movement) now work regardless of which UI element has focus, as long as no text field is being edited
- Cursor Keys option ("Screen-relative" / "Fixed Axes"): in Screen-relative mode (default), arrow/PageUp/PageDown keys move the cursor along whichever grid axis currently matches the on-screen direction, so "right" always moves right regardless of how the view is rotated; Fixed Axes restores the original behavior of always moving along the same world axes

## Features
- Assemble a custom part from basic blocks: Pin Hole, Axle Hole, Pin, Axle, Solid, Ball Joint, Schmelzloch, Rampe
- Save your model as an STL file
- Catalog of existing LEGO® parts
- Customize measurements to get a perfect fit
- Create a sharable link of your part

# Local setup and development

Der Code liegt lokal unter `E:\Data\Dropbox\WRO_Dev\partdesignerV2\partdesignerV2`.

You need to have [TypeScript](https://www.typescriptlang.org/) installed.
In the project root, run `tsc`.
This should run without errors and create the file `app.js`.

You need a webserver that locally serves the files from the project directory.
If you have python installed, you can call `python3 -m http.server`.
It will tell you the port, for example 8000, and you can visit http://localhost:8000 in your browser.
Alternatively, you can install [http-server](https://www.npmjs.com/package/http-server), which will also create a server in port 8000.

If you work on the code, run `tsc --watch`, which will recompile everytime you change a source file.
