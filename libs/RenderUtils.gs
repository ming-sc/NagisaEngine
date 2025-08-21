%if not NE_RENDER_UTILS
%define NE_RENDER_UTILS

%define NE_RENDER_INFO_STACK_TOP NE_RenderInfo_Stack[1]

struct NE_RenderInfo {
    x = 0, y = 0,
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

proc NE_RenderInfo_Stack_push {
    local newIndex = NE_RenderInfo_copy(NE_RenderInfo_Stack[1]);
    insert newIndex at NE_RenderInfo_Stack[1];
}

proc NE_RenderInfo_Stack_pop {
    NE_RenderInfo_free NE_RenderInfo_Stack[1];
    delete NE_RenderInfo_Stack[1];
}

%endif