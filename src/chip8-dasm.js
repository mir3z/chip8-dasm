var Chip8Dasm;

(function () {
   'use strict';

    /**
     * Creates disassembler instance
     * @param chip8 - chip8 emulator instance
     * @constructor Chip8Dasm
     */
    Chip8Dasm = function (chip8) {
        this.chip8 = chip8;
    };

    /**
     * Disassembles machine code stored in chip8 memory starting at address given in offset param.
     * @param {number} offset - starting offset
     * @returns {Object[]} Array of decoded instructions and their address
     * @memberof Chip8Dasm
     */
    Chip8Dasm.prototype.disassemble = function (offset) {
        var mem = this.chip8 && this.chip8.cpu && this.chip8.cpu.mem;
        var result = [];

        if (!mem) {
            throw "Can't find memory space";
        }

        for (var i = 0 + (offset || 0), memlen = mem.length; i < memlen; i += 2) {
            var opcode = mem[i] << 8 | mem[i + 1];

            result.push({
                addr: i,
                opcode: opcode,
                instr: this.decode(opcode)
            });
        }

        return result;
    };

    /**
     * Decodes 2-byte instruction
     * @param {number} instr - instruction to decode
     * @returns {Object}
     * @memberof Chip8Dasm
     */
    Chip8Dasm.prototype.decode = function (instr) {
        var x   = (instr & 0x0F00) >> 8,
            y   = (instr & 0x00F0) >> 4,
            kk  = instr & 0x00FF,
            nnn = instr & 0x0FFF,
            n   = instr & 0x000F;

        var IS = Chip8Dasm.IS;

        switch (instr & 0xF000) {

            case 0x0000:
                switch (instr) {
                    case 0x00E0: return IS.CLS();        // 0x00E0: CLS
                    case 0x00EE: return IS.RET();        // 0x00EE: RET
                    case 0x0000: return IS.NOOP();
                    default:     return IS.SYS_nnn(nnn); // 0x0nnn: SYS
                }
                break;

            case 0x1000:
                return IS.JP_nnn(nnn); // 0x1xxx: JP nnn

            case 0x2000:
                return IS.CALL_nnn(nnn); // 0x2nnn: CALL nnn

            case 0x3000:
                return IS.SE_Vx_kk(x, kk); // 0x3xkk: SE Vx, kk

            case 0x4000:
                return IS.SNE_Vx_kk(x, kk); // 0x4xkk: SNE Vx, kk

            case 0x5000:
                return IS.SE_Vx_Vy(x, y); // 0x5xy0: SE Vx, Vy

            case 0x6000:
                return IS.LD_Vx_kk(x, kk); // 0x6xkk: LD Vx, kk

            case 0x7000:
                return IS.ADD_Vx_kk(x, kk); // 0x7xkk: ADD Vx, kk

            case 0x8000:
                switch (instr & 0x000F) {
                    case 0x0000: return IS.LD_Vx_Vy(x, y);   // 0x8xy0:  LD Vx, Vy
                    case 0x0001: return IS.OR_Vx_Vy(x, y);   // 0x8xy1:  OR Vx, Vy
                    case 0x0002: return IS.AND_Vx_Vy(x, y);  // 0x8xy2: AND Vx, Vy
                    case 0x0003: return IS.XOR_Vx_Vy(x, y);  // 0x8xy3: XOR Vx, Vy
                    case 0x0004: return IS.ADD_Vx_Vy(x, y);  // 0x8xy4: ADD Vx, Vy
                    case 0x0005: return IS.SUB_Vx_Vy(x, y);  // 0x8xy5: SUB Vx, Vy
                    case 0x0006: return IS.SHR_Vx_Vy(x, y);  // 0x8xy6: SHR Vx, Vy
                    case 0x0007: return IS.SUBN_Vx_Vy(x, y); // 0x8xy5: SUB Vx, Vy
                    case 0x000E: return IS.SHL_Vx_Vy(x,y);   // 0x8xyE: SHL Vx, Vy
                }
                break;

            case 0x9000:
                return IS.SNE_Vx_Vy(x, y); // 0x9xy0: SNE Vx, Vy

            case 0xA000:
                return IS.LD_I_nnn(nnn); // 0xAnnn: LD I, nnn

            case 0xB000:
                return IS.JP_V0_nnn(nnn); // 0xBnnn: JP V0, nnn

            case 0xC000:
                return IS.RND_Vx_kk(x, kk); // 0xCxkk: RND Vx, kk

            case 0xD000:
                return IS.DRW_Vx_Vy_n(x, y, n); // 0xDxyn: DRW Vx, Vy, n

            case 0xE000:
                switch (instr & 0x00FF) {
                    case 0x009E: return IS.SKP_Vx(x);  // 0xEx9E: SKP Vx
                    case 0x00A1: return IS.SKNP_Vx(x); // 0xExA1: SKNP Vx
                }
                break;

            case 0xF000:
                switch (instr & 0x00FF) {
                    case 0x0007: return IS.LD_Vx_DT(x); // 0xFx07: LD Vx, DT
                    case 0x000A: return IS.LD_Vx_K(x);  // 0xFx0A: LD Vx, k
                    case 0x0015: return IS.LD_DT_Vx(x); // 0xFx15: LD DT, Vx
                    case 0x0018: return IS.LD_ST_Vx(x); // 0xFx18: LD ST, Vx
                    case 0x001E: return IS.ADD_I_Vx(x); // 0xFx1E: ADD I, Vx
                    case 0x0029: return IS.LD_F_Vx(x);  // 0xFx29: LD F, Vx
                    case 0x0033: return IS.LD_B_Vx(x);  // 0xFx33: LD B, Vx
                    case 0x0055: return IS.LD_I_Vx(x);  // 0xFx55: LD [I], Vx
                    case 0x0065: return IS.LD_Vx_I(x);  // 0xFx65: LD Vx, [I]
                }
                break;
        }
    };

})();