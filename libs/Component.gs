%if not NE_COMPONENT
%define NE_COMPONENT

%include libs/ComponentInfo.gs

%include libs/RenderUtils.gs

%include libs/GL.gs

%include libs/font/Font.gs

# Image

struct NE_Component_Image {
    storage = 0,
    originWidth = 0, originHeight = 0
}

list NE_Component_Image NE_Component_Image_list = [];
list NE_Component_Image_list_free = [];

func NE_Component_Image_new (storage, originWidth, originHeight) {
    local index = 0;
    if (length(NE_Component_Image_list_free) > 0) {
        index = NE_Component_Image_list_free[1];
        delete NE_Component_Image_list_free[1];
    } else {
        add NE_Component_Image {} to NE_Component_Image_list;
        index = length(NE_Component_Image_list);
    }
    NE_Component_Image_list[index] = NE_Component_Image {
        storage: $storage,
        originWidth: $originWidth,
        originHeight: $originHeight
    };
    return index;
}

proc NE_Component_Image_free index {
    add $index to NE_Component_Image_list_free;
}

proc NE_Component_Image_init {
    delete NE_Component_Image_list;
    delete NE_Component_Image_list_free;
}

func NE_Component_Image_copy(index) {
    return NE_Component_Image_new(
        NE_Component_Image_list[$index].storage,
        NE_Component_Image_list[$index].originWidth,
        NE_Component_Image_list[$index].originHeight
    );
}

proc NE_Component_Image_render infoIndex, componentIndexIndex {
    local alpha = NE_COMPONENT_INFO_ALPHA($infoIndex);
    if (alpha > 0) {
        local parentIndex = NE_RENDER_INFO_STACK_TOP;
        NE_RenderInfo_Stack_push;
        NE_RenderInfo_setInfo
            index: NE_RENDER_INFO_STACK_TOP,
            parentIndex: parentIndex,
            x: NE_COMPONENT_INFO_X($infoIndex),
            y: NE_COMPONENT_INFO_Y($infoIndex),
            alpha: alpha,
            rotation: NE_COMPONENT_INFO_ROTATION($infoIndex);

        GL_setShaderAlpha NE_RenderInfo_list[NE_RENDER_INFO_STACK_TOP].alpha;
        GL_setShaderColor NE_COMPONENT_INFO_COLOR($infoIndex);
        
        GL_bindTexture 
            NE_Component_Image_list[$componentIndexIndex].storage,
            NE_Component_Image_list[$componentIndexIndex].originWidth,
            NE_Component_Image_list[$componentIndexIndex].originHeight;

        GL_draw2dTextureToStage
            x: NE_RenderInfo_list[NE_RENDER_INFO_STACK_TOP].x,
            y: NE_RenderInfo_list[NE_RENDER_INFO_STACK_TOP].y,
            width: NE_COMPONENT_INFO_WIDTH($infoIndex),
            height: NE_COMPONENT_INFO_HEIGHT($infoIndex),
            rotation: NE_RenderInfo_list[NE_RENDER_INFO_STACK_TOP].rotation;

        NE_RenderInfo_Stack_pop;
    }
    
}

# Text

struct NE_Component_Text {
    text = "",
    size = 30,
    startTime = 0,
    totalTime = 0,
    lineHeight = 1,
    letterSpacing = 1,
    italic = 0,
    weight = 0
}

list NE_Component_Text NE_Component_Text_list = [];
list NE_Component_Text_list_free = [];

func NE_Component_Text_new (
    text,
    size,
    startTime,
    totalTime,
    lineHeight,
    letterSpacing,
    italic,
    weight
) {
    local index = 0;
    if (length(NE_Component_Text_list_free) > 0) {
        index = NE_Component_Text_list_free[1];
        delete NE_Component_Text_list_free[1];
    } else {
        add NE_Component_Text {} to NE_Component_Text_list;
        index = length(NE_Component_Text_list);
    }
    local letterSpacing = $letterSpacing;
    if (letterSpacing == "") {
        letterSpacing = 1;
    }
    
    local size = $size;
    if (size == "") {
        size = 30;
    }

    local lineHeight = $lineHeight;
    if (lineHeight == "") {
        lineHeight = 1;
    }

    NE_Component_Text_list[index] = NE_Component_Text {
        text: $text,
        size: size,
        startTime: $startTime,
        totalTime: $totalTime,
        lineHeight: lineHeight,
        letterSpacing: letterSpacing,
        italic: $italic,
        weight: $weight
    };
    return index;
}

proc NE_Component_Text_free index {
    add $index to NE_Component_Text_list_free;
}


proc NE_Component_Text_init {
    delete NE_Component_Text_list;
    delete NE_Component_Text_list_free;
}

func NE_Component_Text_copy(index) {
    local newIndex = NE_Component_Text_new(
        text: NE_Component_Text_list[$index].text,
        size: NE_Component_Text_list[$index].size,
        startTime: NE_Component_Text_list[$index].startTime,
        totalTime: NE_Component_Text_list[$index].totalTime,
        lineHeight: NE_Component_Text_list[$index].lineHeight,
        letterSpacing: NE_Component_Text_list[$index].letterSpacing,
        italic: NE_Component_Text_list[$index].italic,
        weight: NE_Component_Text_list[$index].weight
    );
    return newIndex;
}

proc NE_Component_Text_render infoIndex, componentIndexIndex {
    local alpha = NE_COMPONENT_INFO_ALPHA($infoIndex);
    if (alpha > 0) {
        local parentIndex = NE_RENDER_INFO_STACK_TOP;
        NE_RenderInfo_Stack_push;
        NE_RenderInfo_setInfo
            index: NE_RENDER_INFO_STACK_TOP,
            parentIndex: parentIndex,
            x: NE_COMPONENT_INFO_X($infoIndex),
            y: NE_COMPONENT_INFO_Y($infoIndex),
            alpha: alpha,
            rotation: NE_COMPONENT_INFO_ROTATION($infoIndex);

        local x = NE_RenderInfo_list[NE_RENDER_INFO_STACK_TOP].x;
        local y = NE_RenderInfo_list[NE_RENDER_INFO_STACK_TOP].y;
        local rotation = NE_RenderInfo_list[NE_RENDER_INFO_STACK_TOP].rotation;
        GL_setShaderAlpha NE_RenderInfo_list[NE_RENDER_INFO_STACK_TOP].alpha;

        # 绘制阴影
        GL_setShaderColor 0;
        GL_drawMultiLineTextToStage
            x + 1,
            y + 1,
            NE_COMPONENT_INFO_WIDTH($infoIndex),
            NE_COMPONENT_INFO_HEIGHT($infoIndex),
            rotation,
            NE_Component_Text_list[$componentIndexIndex].text,
            NE_Component_Text_list[$componentIndexIndex].size,
            NE_Component_Text_list[$componentIndexIndex].lineHeight,
            NE_Component_Text_list[$componentIndexIndex].letterSpacing,
            NE_Component_Text_list[$componentIndexIndex].italic,
            NE_Component_Text_list[$componentIndexIndex].weight,
            NE_COMPONENT_INFO_VALUE($infoIndex);

        GL_setShaderColor NE_COMPONENT_INFO_COLOR($infoIndex);

        GL_drawMultiLineTextToStage
            x,
            y,
            NE_COMPONENT_INFO_WIDTH($infoIndex),
            NE_COMPONENT_INFO_HEIGHT($infoIndex),
            rotation,
            NE_Component_Text_list[$componentIndexIndex].text,
            NE_Component_Text_list[$componentIndexIndex].size,
            NE_Component_Text_list[$componentIndexIndex].lineHeight,
            NE_Component_Text_list[$componentIndexIndex].letterSpacing,
            NE_Component_Text_list[$componentIndexIndex].italic,
            NE_Component_Text_list[$componentIndexIndex].weight,
            NE_COMPONENT_INFO_VALUE($infoIndex);

        NE_RenderInfo_Stack_pop;
    }
}


# Common
proc NE_Component_init {
    NE_Component_Image_init;
    NE_Component_Text_init;
}

proc NE_Component_free type, index {
    if ($type == "image") {
        NE_Component_Image_free $index;
    }
    elif ($type == "text") {
        NE_Component_Text_free $index;
    }
}

func NE_Component_copy (type, index) {
    if ($type == "image") {
        return NE_Component_Image_copy($index);
    }
    elif ($type == "text") {
        return NE_Component_Text_copy($index);
    }
}

proc NE_Component_render type, infoIndex, componentIndex {
    if ($type == "image") {
        NE_Component_Image_render $infoIndex, $componentIndex;
    }
    elif ($type == "text") {
        NE_Component_Text_render $infoIndex, $componentIndex;
    }
}

%endif