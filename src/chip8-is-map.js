var Chip8Dasm;

(function () {
    "use strict";

    function MNEM_Vx_kk(mnem, x, kk) {
        return MNEM_Vx(mnem, x).concat(BYTE(kk));
    }

    function MNEM_nnn(mnem, nnn) {
        return MNEM(mnem).concat(ADDR(nnn));
    }

    function MNEM_I(mnem) {
        return MNEM(mnem).concat(REG_I());
    }

    function MNEM_I_nnn(mnem, nnn) {
        return  MNEM_I(mnem).concat(ADDR(nnn));
    }

    function MNEM_I_Vx(mnem, x) {
        return MNEM_I(mnem).concat(REG(x));
    }

    function MNEM_Vx(mnem, x) {
        return MNEM(mnem).concat(REG(x));
    }

    function MNEM_Vx_nnn(mnem, x, nnn) {
        return MNEM_Vx(mnem, x).concat(ADDR(nnn));
    }

    function MNEM_Vx_Vy(mnem, x, y) {
        return MNEM_Vx(mnem, x).concat(REG(y));
    }

    function MNEM_Vx_Vy_n(mnem, x, y, n) {
        return MNEM_Vx_Vy(mnem, x, y).concat(NIBBLE(n));
    }

    function MNEM_Vx_DT(mnem, x) {
        return MNEM_Vx(mnem, x).concat(DT());
    }

    function MNEM_Vx_K(mnem, x) {
        return MNEM_Vx(mnem, x).concat(KEY());
    }

    function MNEM_ST_Vx(mnem, x) {
        return MNEM(mnem).concat(ST(), REG(x));
    }

    function MNEM_DT_Vx(mnem, x) {
        return MNEM(mnem).concat(DT(), REG(x));
    }

    function MNEM_F_Vx(mnem, x) {
        return MNEM(mnem).concat(FONT(), REG(x));
    }

    function MNEM_B_Vx(mnem, x) {
        return MNEM(mnem).concat(BCD(), REG(x));
    }

    function MNEM_ADDR_I_Vx(mnem, x) {
        return MNEM(mnem).concat(ADDR_I(), REG(x));
    }

    function MNEM_Vx_ADDR_I(mnem, x) {
        return MNEM(mnem).concat(REG(x), ADDR_I());
    }

    function MNEM(mnem) {
        return [{ type: TOKEN.MNEM, value: mnem }];
    }

    function REG(r) {
        return [{ type: TOKEN.REG, value: r }];
    }

    function ADDR(nnn) {
        return [{ type: TOKEN.ADDR, value: nnn }];
    }

    function ADDR_I() {
        return [{ type: TOKEN.ADDR_AT_I }];
    }

    function BYTE(kk) {
        return [{ type: TOKEN.BYTE, value: kk }];
    }

    function NIBBLE(n) {
        return [{ type: TOKEN.NIBBLE, value: n }];
    }

    function REG_I() {
        return [{ type: TOKEN.REG_I }];
    }

    function DT() {
        return [{ type: TOKEN.REG_DT }];
    }

    function ST() {
        return [{ type: TOKEN.REG_ST }];
    }

    function KEY() {
        return [{ type: TOKEN.KEY }];
    }

    function FONT() {
        return [{ type: TOKEN.FONT }];
    }

    function BCD() {
        return [{ type: TOKEN.BCD }];
    }

    function NOOP() {
        return [{ type: TOKEN.NOOP }];
    }

    var TOKEN = {
        MNEM: 'tkn-mnem',
        NOOP: 'tkn-noop',
        BYTE: 'tkn-byte',
        REG:  'tkn-reg',
        REG_I: 'tkn-reg-i',
        REG_DT: 'tkn-reg-dt',
        REG_ST: 'tkn-reg-st',
        KEY:  'tkn-key',
        FONT: 'tkn-font',
        BCD: 'tkn-bcd',
        ADDR: 'tkn-addr',
        NIBBLE: 'tkn-nbl',
        ADDR_AT_I: 'tkn-addr-at-i'
    };

    Chip8Dasm.IS = {
        TOKEN:       TOKEN,
        NOOP:        NOOP,
        CLS:         MNEM.bind(this, 'CLS'),
        RET:         MNEM.bind(this, 'RET'),
        SYS_nnn:     MNEM_nnn.bind(this, 'SYS'),
        JP_nnn:      MNEM_nnn.bind(this, 'JP'),
        CALL_nnn:    MNEM_nnn.bind(this, 'CALL'),
        SE_Vx_kk:    MNEM_Vx_kk.bind(this, 'SE'),
        SNE_Vx_kk:   MNEM_Vx_kk.bind(this, 'SNE'),
        SE_Vx_Vy:    MNEM_Vx_Vy.bind(this, 'SE'),
        LD_Vx_kk:    MNEM_Vx_kk.bind(this, 'LD'),
        ADD_Vx_kk:   MNEM_Vx_kk.bind(this, 'ADD'),
        LD_Vx_Vy:    MNEM_Vx_Vy.bind(this, 'LD'),
        OR_Vx_Vy:    MNEM_Vx_Vy.bind(this, 'OR'),
        AND_Vx_Vy:   MNEM_Vx_Vy.bind(this, 'AND'),
        XOR_Vx_Vy:   MNEM_Vx_Vy.bind(this, 'XOR'),
        ADD_Vx_Vy:   MNEM_Vx_Vy.bind(this, 'ADD'),
        SUB_Vx_Vy:   MNEM_Vx_Vy.bind(this, 'SUB'),
        SHR_Vx_Vy:   MNEM_Vx_Vy.bind(this, 'SHR'),
        SUBN_Vx_Vy:  MNEM_Vx_Vy.bind(this, 'SUBN'),
        SHL_Vx_Vy:   MNEM_Vx_Vy.bind(this, 'SHL'),
        SNE_Vx_Vy:   MNEM_Vx_Vy.bind(this, 'SNE'),
        LD_I_nnn:    MNEM_I_nnn.bind(this, 'LD'),
        JP_V0_nnn:   MNEM_Vx_nnn.bind(this, 'JP', 0),
        RND_Vx_kk:   MNEM_Vx_kk.bind(this, 'RND'),
        DRW_Vx_Vy_n: MNEM_Vx_Vy_n.bind(this, 'DRW'),
        SKP_Vx:      MNEM_Vx.bind(this, 'SKP'),
        SKNP_Vx:     MNEM_Vx.bind(this, 'SKNP'),
        LD_Vx_DT:    MNEM_Vx_DT.bind(this, 'LD'),
        LD_Vx_K:     MNEM_Vx_K.bind(this, 'LD'),
        LD_DT_Vx:    MNEM_DT_Vx.bind(this, 'LD'),
        LD_ST_Vx:    MNEM_ST_Vx.bind(this, 'LD'),
        ADD_I_Vx:    MNEM_I_Vx.bind(this, 'ADD'),
        LD_F_Vx:     MNEM_F_Vx.bind(this, 'LD'),
        LD_B_Vx:     MNEM_B_Vx.bind(this, 'LD'),
        LD_I_Vx:     MNEM_ADDR_I_Vx.bind(this, 'LD'),
        LD_Vx_I:     MNEM_Vx_ADDR_I.bind(this, 'LD')
    };
})();