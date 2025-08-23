# author: obdopqo, yukitai
# description: font rendering, from VenUI

%if not VEN_FONT
%define VEN_FONT

%include libs/font/FontConst.gs

costumes "assets/null.svg" as "UNK",
         "assets/null.svg" as "A", 
         "assets/null.svg" as "B", 
         "assets/null.svg" as "C", 
         "assets/null.svg" as "D", 
         "assets/null.svg" as "E", 
         "assets/null.svg" as "F", 
         "assets/null.svg" as "G", 
         "assets/null.svg" as "H", 
         "assets/null.svg" as "I", 
         "assets/null.svg" as "J", 
         "assets/null.svg" as "K", 
         "assets/null.svg" as "L", 
         "assets/null.svg" as "M", 
         "assets/null.svg" as "N", 
         "assets/null.svg" as "O", 
         "assets/null.svg" as "P", 
         "assets/null.svg" as "Q", 
         "assets/null.svg" as "R", 
         "assets/null.svg" as "S", 
         "assets/null.svg" as "T", 
         "assets/null.svg" as "U", 
         "assets/null.svg" as "V", 
         "assets/null.svg" as "W", 
         "assets/null.svg" as "X", 
         "assets/null.svg" as "Y", 
         "assets/null.svg" as "Z", 
         "assets/null.svg" as "E21", 
         "assets/null.svg" as "E20", 
         "assets/null.svg" as "E19", 
         "assets/null.svg" as "E18", 
         "assets/null.svg" as "E17", 
         "assets/null.svg" as "E16", 
         "assets/null.svg" as "E15", 
         "assets/null.svg" as "E14", 
         "assets/null.svg" as "E13", 
         "assets/null.svg" as "E12", 
         "assets/null.svg" as "E11", 
         "assets/null.svg" as "E10", 
         "assets/null.svg" as "E9", 
         "assets/null.svg" as "E8", 
         "assets/null.svg" as "E7", 
         "assets/null.svg" as "E6", 
         "assets/null.svg" as "E5", 
         "assets/null.svg" as "E4", 
         "assets/null.svg" as "E3", 
         "assets/null.svg" as "E44", 
         "assets/null.svg" as "E43", 
         "assets/null.svg" as "E42",
         "assets/null.svg" as "E45";

func Ven_Font_getCharWidthByIndex (charIndex, size) {
    local c = Ven_Font_fontData[$charIndex];
    return $size * (("0x" & (c[2] & c[3])) / 64);
}

proc Ven_Font_relMoveToWhere x, y, size, italic, index, c {
    local ix = "0x" & $c[$index + 0] & ($c[$index + 1] & $c[$index + 2]);
    local iy = floor(ix / 64);
    ix %= 64;
    Ven_Utils_moveToWhere $x + (ix / 64 - (iy / 64 - 0.5) * $italic) * $size, $y - iy / 64 * $size;
}

proc Ven_Utils_moveToWhere x, y {
    goto $x, $y;
}

proc Ven_Font_drawCharByIndex index, x, y, size, italic {
    local charIndex = 4;
    local c = Ven_Font_fontData[$index];
    switch_costume "Full";
    until charIndex > length(c) {
        Ven_Font_relMoveToWhere $x, $y, $size, $italic, charIndex, c;
        charIndex += 3;
        pen_down;
        until charIndex > length(c) or c[charIndex] == "M" {
            Ven_Font_relMoveToWhere $x, $y, $size, $italic, charIndex, c;
            charIndex += 3;
        }
        charIndex += 1;
        pen_up;
    }
}

func Ven_Font_getCharWidth (char) {
    return Ven_Font_getCharWidthByIndex(Ven_Font_findChar($char), 1);
}

func Ven_Font_findChar (char) {
    local charIndex = 0;
    local e = 1;
    until e * 2 > length(Ven_Font_fontIndex) {
        e *= 2;
    }
    until e < 1 {
        if charIndex + e < length(Ven_Font_fontIndex) and Ven_Font_fontData[Ven_Font_fontIndex[charIndex + e]][1] < $char {
            charIndex += e;
        }
        e /= 2;
    }

    charIndex += 1;
    switch_costume "UNK";
    switch_costume $char;
    if costume_name() == "UNK" and Ven_Font_fontData[Ven_Font_fontIndex[charIndex + 1]][1] == $char {
        charIndex += 1;
    }
    return Ven_Font_fontIndex[charIndex];
}

proc Ven_Font_drawChar char, x, y, size, weight, italic {
    set_pen_size round(sqrt($size) / 2 * ($weight / 800));
    Ven_Font_drawCharByIndex Ven_Font_findChar($char), $x, $y, $size, $italic;
}

%endif