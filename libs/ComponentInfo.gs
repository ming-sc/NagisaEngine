%if not NE_COMPONENT_INFO
%define NE_COMPONENT_INFO

%include libs/Component.gs

list NE_ComponentInfo_list = [];
list NE_ComponentInfo_list_free = [];

%define NE_COMPONENT_INFO_LIST NE_ComponentInfo_list

%define NE_COMPONENT_INFO_ID(index) NE_ComponentInfo_list[index]
%define NE_COMPONENT_INFO_TYPE(index) NE_ComponentInfo_list[index + 1]
%define NE_COMPONENT_INFO_INDEX(index) NE_ComponentInfo_list[index + 2]
%define NE_COMPONENT_INFO_X(index) NE_ComponentInfo_list[index + 3]
%define NE_COMPONENT_INFO_Y(index) NE_ComponentInfo_list[index + 4]
%define NE_COMPONENT_INFO_WIDTH(index) NE_ComponentInfo_list[index + 5]
%define NE_COMPONENT_INFO_HEIGHT(index) NE_ComponentInfo_list[index + 6]
%define NE_COMPONENT_INFO_COLOR(index) NE_ComponentInfo_list[index + 7]
%define NE_COMPONENT_INFO_ALPHA(index) NE_ComponentInfo_list[index + 8]
%define NE_COMPONENT_INFO_ROTATION(index) NE_ComponentInfo_list[index + 9]

%define NE_COMPONENT_INFO_SIZE 10

proc NE_ComponentInfo_init {
    delete NE_ComponentInfo_list;
    delete NE_ComponentInfo_list_free;
}

func NE_ComponentInfo_new (id, type, componentIndex) {
    local index = 0;
    if (length(NE_ComponentInfo_list_free) > 0) {
        index = NE_ComponentInfo_list_free[1];
        delete NE_ComponentInfo_list_free[1];
    } else {
        index = length(NE_ComponentInfo_list) + 1;
        repeat NE_COMPONENT_INFO_SIZE {
            add 0 to NE_ComponentInfo_list;
        }
    }
    NE_COMPONENT_INFO_ID(index) = $id;
    NE_COMPONENT_INFO_TYPE(index) = $type;
    NE_COMPONENT_INFO_INDEX(index) = $componentIndex;
    NE_COMPONENT_INFO_ALPHA(index) = 1.0;
    return index;
}

proc NE_ComponentInfo_free index {
    add $index to NE_ComponentInfo_list_free;
    NE_Component_free NE_COMPONENT_INFO_TYPE($index), NE_COMPONENT_INFO_INDEX($index);
}

func NE_ComponentInfo_copy(index) {
    local type = NE_COMPONENT_INFO_TYPE($index);
    return NE_ComponentInfo_new(
        NE_COMPONENT_INFO_ID($index),
        type,
        NE_Component_copy(
            type,
            NE_COMPONENT_INFO_INDEX($index)
        )
    );
}

%endif