CHIP-8 Disassembler
==================

This is a [CHIP-8](http://en.wikipedia.org/wiki/CHIP-8) disassembler written in JavaScript.

It is supposed to work with my [CHIP-8 emulator](https://github.com/mir3z/chip8-emu).

Usage
-----

1. Initialize my CHIP-8 emulator instance

```
chip8.initialize({
    ctx: document.querySelector('canvas').getContext('2d')
});
```

2. Load ROM into the memory

```
chip8.loadROM('roms/Puzzle.ch8', onROMLoaded);
```

3. Attach disassembler to emulator instance and decode

```
function onROMLoaded() {
    var dasm = new Chip8Dasm(chip8);
    var result = dasm.disassemble(0x0200);
    // ...or decode single instruction:
    // dasm.decode(0x2666)
}
```

License
-------
The MIT License (MIT). Copyright (c) 2015 mirz (mirz.hq@gmail.com)

Resources
---------
* http://mattmik.com/chip8.html
* http://devernay.free.fr/hacks/chip8/C8TECH10.HTM
* http://chip8.com
* http://en.wikipedia.org/wiki/CHIP-8