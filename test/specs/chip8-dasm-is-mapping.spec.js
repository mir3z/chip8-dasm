(function () {
    'use strict';

    describe('CHIP-8 Disassembler', function () {
        var dasm;
        var IS = Chip8Dasm.IS;

        function test(opCode, expectedResult) {
            expect(dasm.decode(opCode)).toEqual(expectedResult);
        }

        beforeEach(function () {
            dasm = new Chip8Dasm();
        });

        it('NOOP', function () {
            test(0x0000, [
                { type: IS.TOKEN.NOOP }
            ]);
        });

        it('0x00E0: CLS', function() {
            test(0x00E0, [
                { type: IS.TOKEN.MNEM, value: 'CLS' }
            ]);
        });

        it('0x00EE: RET', function() {
            test(0x00EE, [
                { type: IS.TOKEN.MNEM, value: 'RET' }
            ]);
        });

        it('0x0nnn: SYS 0xnnn', function() {
            test(0x0999, [
                { type: IS.TOKEN.MNEM, value: 'SYS' },
                { type: IS.TOKEN.ADDR, value: 0x999 }
            ]);
        });

        it('0x1xxx: JP nnn', function() {
            test(0x1666, [
                { type: IS.TOKEN.MNEM, value: 'JP' },
                { type: IS.TOKEN.ADDR, value: 0x666 }
            ]);
        });

        it('0x2nnn: CALL nnn', function() {
            test(0x2555, [
                { type: IS.TOKEN.MNEM, value: 'CALL' },
                { type: IS.TOKEN.ADDR, value: 0x555 }
            ]);
        });

        it('0x3xkk: SE Vx, kk', function() {
            test(0x3244, [
                { type: IS.TOKEN.MNEM, value: 'SE' },
                { type: IS.TOKEN.REG, value: 0x2 },
                { type: IS.TOKEN.BYTE, value: 0x44 }
            ]);
        });

        it('0x4xkk: SNE Vx, kk', function() {
            test(0x4567, [
                { type: IS.TOKEN.MNEM, value: 'SNE' },
                { type: IS.TOKEN.REG, value: 0x5 },
                { type: IS.TOKEN.BYTE, value: 0x67 }
            ]);
        });

        it('0x5xy0: SE Vx, Vy', function() {
            test(0x5890, [
                { type: IS.TOKEN.MNEM, value: 'SE' },
                { type: IS.TOKEN.REG, value: 0x8 },
                { type: IS.TOKEN.REG, value: 0x9 }
            ]);
        });

        it('0x6xkk: LD Vx, kk', function() {
            test(0x6123, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.REG, value: 0x1 },
                { type: IS.TOKEN.BYTE, value: 0x23 }
            ]);
        });

        it('0x7xkk: ADD Vx, kk', function() {
            test(0x7123, [
                { type: IS.TOKEN.MNEM, value: 'ADD' },
                { type: IS.TOKEN.REG, value: 0x1 },
                { type: IS.TOKEN.BYTE, value: 0x23 }
            ]);
        });

        it('0x8xy0: LD Vx, Vy', function() {
            test(0x8AB0, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0x8xy1: OR Vx, Vy', function() {
            test(0x8AB1, [
                { type: IS.TOKEN.MNEM, value: 'OR' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0x8xy2: AND Vx, Vy', function() {
            test(0x8AB2, [
                { type: IS.TOKEN.MNEM, value: 'AND' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0x8xy3: XOR Vx, Vy', function() {
            test(0x8AB3, [
                { type: IS.TOKEN.MNEM, value: 'XOR' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0x8xy4: ADD Vx, Vy', function() {
            test(0x8AB4, [
                { type: IS.TOKEN.MNEM, value: 'ADD' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0x8xy5: SUB Vx, Vy', function() {
            test(0x8AB5, [
                { type: IS.TOKEN.MNEM, value: 'SUB' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0x8xy6: SHR Vx, Vy', function() {
            test(0x8AB6, [
                { type: IS.TOKEN.MNEM, value: 'SHR' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0x8xy5: SUB Vx, Vy', function() {
            test(0x8AB5, [
                { type: IS.TOKEN.MNEM, value: 'SUB' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0x8xyE: SHL Vx, Vy', function() {
            test(0x8ABE, [
                { type: IS.TOKEN.MNEM, value: 'SHL' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0x9xy0: SNE Vx, Vy', function() {
            test(0x9AB0, [
                { type: IS.TOKEN.MNEM, value: 'SNE' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0xAnnn: LD I, nnn', function() {
            test(0xA567, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.REG_I },
                { type: IS.TOKEN.ADDR, value: 0x567 }
            ]);
        });

        it('0xBnnn: JP V0, nnn', function() {
            test(0xB567, [
                { type: IS.TOKEN.MNEM, value: 'JP' },
                { type: IS.TOKEN.REG, value: 0x0 },
                { type: IS.TOKEN.ADDR, value: 0x567 }
            ]);
        });

        it('0xCxkk: RND Vx, kk', function() {
            test(0xC4AB, [
                { type: IS.TOKEN.MNEM, value: 'RND' },
                { type: IS.TOKEN.REG, value: 0x4 },
                { type: IS.TOKEN.BYTE, value: 0xAB }
            ]);
        });

        it('0xDxyn: DRW Vx, Vy, n', function() {
            test(0xD26A, [
                { type: IS.TOKEN.MNEM, value: 'DRW' },
                { type: IS.TOKEN.REG, value: 0x2 },
                { type: IS.TOKEN.REG, value: 0x6 },
                { type: IS.TOKEN.NIBBLE, value: 0xA }
            ]);
        });

        it('0xEx9E: SKP Vx', function() {
            test(0xEA9E, [
                { type: IS.TOKEN.MNEM, value: 'SKP' },
                { type: IS.TOKEN.REG, value: 0xA }
            ]);
        });

        it('0xExA1: SKNP Vx', function() {
            test(0xEAA1, [
                { type: IS.TOKEN.MNEM, value: 'SKNP' },
                { type: IS.TOKEN.REG, value: 0xA }
            ]);
        });

        it('0xFx07: LD Vx, DT', function() {
            test(0xFB07, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.REG, value: 0xB },
                { type: IS.TOKEN.REG_DT }
            ]);
        });

        it('0xFx0A: LD Vx, k', function() {
            test(0xFB0A, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.REG, value: 0xB },
                { type: IS.TOKEN.KEY }
            ]);
        });

        it('0xFx15: LD DT, Vx', function() {
            test(0xFB15, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.REG_DT },
                { type: IS.TOKEN.REG, value: 0xB }
            ]);
        });

        it('0xFx18: LD ST, Vx', function() {
            test(0xFA18, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.REG_ST },
                { type: IS.TOKEN.REG, value: 0xA }
            ]);
        });

        it('0xFx1E: ADD I, Vx', function() {
            test(0xFA1E, [
                { type: IS.TOKEN.MNEM, value: 'ADD' },
                { type: IS.TOKEN.REG_I },
                { type: IS.TOKEN.REG, value: 0xA }
            ]);
        });

        it('0xFx29: LD F, Vx', function() {
            test(0xFA29, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.FONT },
                { type: IS.TOKEN.REG, value: 0xA }
            ]);
        });

        it('0xFx33: LD B, Vx', function() {
            test(0xFC33, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.BCD },
                { type: IS.TOKEN.REG, value: 0xC }
            ]);
        });

        it('0xFx55: LD [I], Vx', function() {
            test(0xFC55, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.ADDR_AT_I },
                { type: IS.TOKEN.REG, value: 0xC }
            ]);
        });

        it('0xFx65: LD Vx, [I]', function() {
            test(0xFA65, [
                { type: IS.TOKEN.MNEM, value: 'LD' },
                { type: IS.TOKEN.REG, value: 0xA },
                { type: IS.TOKEN.ADDR_AT_I }
            ]);
        });
    });
})();