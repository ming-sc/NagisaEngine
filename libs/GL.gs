costumes "assets/full.svg" as "Full";

%if not GL
%define GL


%if not GL_SCREEN_WIDTH
%define GL_SCREEN_WIDTH 480
%endif

%if not GL_SCREEN_HEIGHT
%define GL_SCREEN_HEIGHT 360
%endif

%define GL_POS_TRANSFORM_X(x) ((x) - GL_SCREEN_WIDTH / 2)
%define GL_POS_TRANSFORM_Y(y) (GL_SCREEN_HEIGHT / 2 - (y))
%define GL_ALPHA_TRANSFORM(a) ((1 - a) * 100)
%define GL_ROTATION_TRANSFORM(r) (r + 90)

var GL_BIND_TEXTURE = 0;
var GL_BIND_TEXTURE_WIDTH = 0;
var GL_BIND_TEXTURE_HEIGHT = 0;
var GL_SHADER_ALPHA = 1.0;
var GL_SHADER_COLOR = 0;

proc GL_bindTexture textureName, width, height {
    GL_BIND_TEXTURE = $textureName;
    GL_BIND_TEXTURE_WIDTH = $width;
    GL_BIND_TEXTURE_HEIGHT = $height;
}

proc GL_setShaderAlpha alpha {
    GL_SHADER_ALPHA = $alpha;
}

proc GL_setShaderColor color {
    GL_SHADER_COLOR = $color;
}

proc GL_draw2dTextureToStage x, y, width, height, rotation {
    local k = $width / GL_BIND_TEXTURE_WIDTH;
    local scale = k * 100;

    local w = k * GL_BIND_TEXTURE_WIDTH;
    local h = k * GL_BIND_TEXTURE_HEIGHT;

    local dx = w  * cos($rotation) - h * sin($rotation);
    local dy = w  * sin($rotation) + h * cos($rotation);

    set_color_effect GL_SHADER_COLOR;
    # 防止上一个 Full 造成问题
    switch_costume GL_BIND_TEXTURE;
    set_size scale;
    switch_costume "Full";
    goto GL_POS_TRANSFORM_X($x + dx / 2), GL_POS_TRANSFORM_Y($y + dy / 2);
    switch_costume GL_BIND_TEXTURE;
    point_in_direction GL_ROTATION_TRANSFORM($rotation);

    set_ghost_effect GL_ALPHA_TRANSFORM(GL_SHADER_ALPHA);
    stamp;
}

proc GL_drawMultiLineTextToStage 
    x, 
    y, 
    width, 
    height, 
    rotation,
    text, 
    size, 
    lineHeight,
    letterSpacing,
    italic,
    weight,
    value = 1
{
    local currentX = GL_POS_TRANSFORM_X($x);
    local currentY = GL_POS_TRANSFORM_Y($y);
    local currentSize = $size;
    local currentWeight = $weight;
    local currentItalic = $italic;

    local textLength = floor(length($text) * $value);
    local i = 1;
    local currentWidth = 0;
    set_pen_size round(sqrt($size) / 2 * ($weight / 800));
    set_pen_color GL_SHADER_COLOR;
    set_pen_transparency GL_SHADER_ALPHA;
    until i > textLength {
        local char = $text[i];
        local charIndex = Ven_Font_findChar(char);
        local charWidth = Ven_Font_getCharWidthByIndex(charIndex, currentSize) + $letterSpacing;
        if $width >= 0 and currentWidth + charWidth > $width {
            currentWidth = 0;
            currentY -= $lineHeight * currentSize;
        }
        Ven_Font_drawCharByIndex charIndex, currentX + currentWidth, currentY, currentSize, currentItalic;
        currentWidth += charWidth;
        i += 1;
    }
}

proc GL_clearStage {
    erase_all;
}

%endif