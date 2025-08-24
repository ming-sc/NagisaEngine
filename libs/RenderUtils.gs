%if not NE_RENDER_UTILS
%define NE_RENDER_UTILS

# RenderInfo
%define NE_RENDER_INFO_STACK_TOP NE_RenderInfo_Stack[1]

struct NE_RenderInfo {
    x = 0, y = 0,
    x1 = 1, y1 = 0,
    x2 = 0, y2 = 1,
    alpha = 1,
    rotation = 0
}

# 复制
func NE_RenderInfo_copy(index) {
    local newIndex = NE_RenderInfo_new();
    NE_RenderInfo_list[newIndex] = NE_RenderInfo_list[$index];
    return newIndex;
}

list NE_RenderInfo NE_RenderInfo_list = [];
list NE_RenderInfo_list_free = [];

list NE_RenderInfo_Stack = [];

proc NE_RenderUtils_init {
    delete NE_RenderInfo_list;
    delete NE_RenderInfo_list_free;
    delete NE_RenderInfo_Stack;

    add NE_RenderInfo_new() to NE_RenderInfo_Stack;
}

func NE_RenderInfo_new() {
    local index = 0;
    if (length(NE_RenderInfo_list_free) > 0) {
        index = NE_RenderInfo_list_free[1];
        delete NE_RenderInfo_list_free[1];
    } else {
        add NE_RenderInfo{} to NE_RenderInfo_list;
        index = length(NE_RenderInfo_list);
    }
    return index;
}

proc NE_RenderInfo_free index {
    add $index to NE_RenderInfo_list_free;
}

proc NE_RenderInfo_setInfo
    index, 
    parentIndex, 
    x = 0, 
    y = 0, 
    rotation = 0, 
    alpha = 1
{
    local NE_RenderInfo parentInfo = NE_RenderInfo_list[$parentIndex];
    NE_RenderInfo_list[$index].x = $x * parentInfo.x1 + $y * parentInfo.x2 + parentInfo.x;
    NE_RenderInfo_list[$index].y = $x * parentInfo.y1 + $y * parentInfo.y2 + parentInfo.y;
    NE_RenderInfo_list[$index].rotation = $rotation + parentInfo.rotation;
    NE_RenderInfo_list[$index].alpha = $alpha * parentInfo.alpha;
    # 先位移后旋转
    NE_RenderInfo_list[$index].x1 = parentInfo.x1 * cos($rotation) - parentInfo.y1 * sin($rotation);
    NE_RenderInfo_list[$index].y1 = parentInfo.x1 * sin($rotation) + parentInfo.y1 * cos($rotation);
    NE_RenderInfo_list[$index].x2 = parentInfo.x2 * cos($rotation) - parentInfo.y2 * sin($rotation);
    NE_RenderInfo_list[$index].y2 = parentInfo.x2 * sin($rotation) + parentInfo.y2 * cos($rotation);
}

proc NE_RenderInfo_Stack_push {
    local newIndex = NE_RenderInfo_copy(NE_RenderInfo_Stack[1]);
    insert newIndex at NE_RenderInfo_Stack[1];
}

proc NE_RenderInfo_Stack_pop {
    NE_RenderInfo_free NE_RenderInfo_Stack[1];
    delete NE_RenderInfo_Stack[1];
}

%endif