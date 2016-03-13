CHIP-8 Disassembler
==================

This is a [CHIP-8](http://en.wikipedia.org/wiki/CHIP-8) linear disassembler written in JavaScript.

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

Details
-------

Each disassembled instruction has a following form:

```
{
    addr: 514,
    instr: [
        { type: "tkn-mnem", value:"LD" },
        { type: "tkn-reg", value: 3 },
        { type: "tkn-byte", value: 128 } 
    ],
    opcode: 25472
}
```

and this was `LD V3, 0x80` (0x6380).

Token types
-----------

Exposed in `Chip8Dasm.IS.TOKEN`:

* `tkn-mnem` - mnemonic, eg LD, DRW, ADD
* `tkn-noop` - NOOP instruction
* `tkn-byte` - denotes a byte, like in `SE Vx, byte` (0x00 - 0xFF)
* `tkn-reg` - register, from 0 to 15, where 0 denotes `V0` and 15 denotes `VF`
* `tkn-reg-i` - I register
* `tkn-reg-dt` - DT register
* `tkn-reg-st` - ST register
* `tkn-key` - denotes key in `LD Vx, key`, 0x0 - 0xF
* `tkn-font` - denotes font in `LD F, Vx`
* `tkn-bcd` - denotes BCD representation in `LD B, Vx`
* `tkn-addr` - denotes address, like in `LD I, addr`, 0x0 - 0xFFF
* `tkn-nbl` - nibble, like in `DRW Vx, Vy, nibble` 0x0 - 0xF
* `tkn-addr-at-i` - denotes address stored in I register, like in `LD [I], Vx`

License
-------
The MIT License (MIT). Copyright (c) 2015 mirz (mirz.hq@gmail.com)

Resources
---------
* http://mattmik.com/chip8.html
* http://devernay.free.fr/hacks/chip8/C8TECH10.HTM
* http://chip8.com
* http://en.wikipedia.org/wiki/CHIP-8