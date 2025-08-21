%if not NAG
%define NAG

%include libs/Layer.gs

%include libs/ComponentInfo.gs

list NE_NAG_list = [];


# Common
%define NE_NAG_COMMON_TYPE(index) NE_NAG_list[index]
%define NE_NAG_COMMON_ID(index) NE_NAG_list[index + 1]
%define NE_NAG_COMMON_X(index) NE_NAG_list[index + 2]
%define NE_NAG_COMMON_Y(index) NE_NAG_list[index + 3]
%define NE_NAG_COMMON_WIDTH(index) NE_NAG_list[index + 4]
%define NE_NAG_COMMON_HEIGHT(index) NE_NAG_list[index + 5]
%define NE_NAG_COMMON_COLOR(index) NE_NAG_list[index + 6]
%define NE_NAG_COMMON_ALPHA(index) NE_NAG_list[index + 7]
%define NE_NAG_COMMON_ROTATION(index) NE_NAG_list[index + 8]
%define NE_NAG_COMMON_LAYER(index) NE_NAG_list[index + 9]
%define NE_NAG_COMMON_PAGE(index) NE_NAG_list[index + 10]
%define NE_NAG_COMMON_SIZE 11

# Image
%define NE_NAG_IMAGE_STORAGE(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE]
%define NE_NAG_IMAGE_ORIGIN_WIDTH(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 1]
%define NE_NAG_IMAGE_ORIGIN_HEIGHT(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 2]
%define NE_NAG_IMAGE_SIZE NE_NAG_COMMON_SIZE + 3

proc NE_NAG_Image
    id,
    layer, page,
    storage = "",
    originWidth = "",
    originHeight = "",
    x = "", y = "",
    width = "", height = "",
    color = "", alpha = "",
    rotation = ""
{
    local index = length(NE_NAG_list) + 1;
    repeat (NE_NAG_IMAGE_SIZE) {
        add 0 to NE_NAG_list;
    }
    NE_NAG_COMMON_TYPE(index) = "image";
    NE_NAG_COMMON_ID(index) = $id;
    NE_NAG_COMMON_X(index) = $x;
    NE_NAG_COMMON_Y(index) = $y;
    NE_NAG_COMMON_WIDTH(index) = $width;
    NE_NAG_COMMON_HEIGHT(index) = $height;
    NE_NAG_COMMON_COLOR(index) = $color;
    NE_NAG_COMMON_ALPHA(index) = $alpha;
    NE_NAG_COMMON_ROTATION(index) = $rotation;
    NE_NAG_COMMON_LAYER(index) = $layer;
    NE_NAG_COMMON_PAGE(index) = $page;

    NE_NAG_IMAGE_STORAGE(index) = $storage;
    NE_NAG_IMAGE_ORIGIN_WIDTH(index) = $originWidth;
    NE_NAG_IMAGE_ORIGIN_HEIGHT(index) = $originHeight;
}

func NE_NAG_Common_new (nagIndex, componentIndex) {
    local infoIndex = NE_ComponentInfo_new(
        NE_NAG_COMMON_ID($nagIndex),
        NE_NAG_COMMON_TYPE($nagIndex),
        $componentIndex
    );
    NE_COMPONENT_INFO_X(infoIndex) = NE_NAG_COMMON_X($nagIndex);
    NE_COMPONENT_INFO_Y(infoIndex) = NE_NAG_COMMON_Y($nagIndex);
    NE_COMPONENT_INFO_WIDTH(infoIndex) = NE_NAG_COMMON_WIDTH($nagIndex);
    NE_COMPONENT_INFO_HEIGHT(infoIndex) = NE_NAG_COMMON_HEIGHT($nagIndex);
    NE_COMPONENT_INFO_COLOR(infoIndex) = NE_NAG_COMMON_COLOR($nagIndex);
    NE_COMPONENT_INFO_ALPHA(infoIndex) = NE_NAG_COMMON_ALPHA($nagIndex);
    NE_COMPONENT_INFO_ROTATION(infoIndex) = NE_NAG_COMMON_ROTATION($nagIndex);
    NE_NAG_COMMON_LAYER(infoIndex) = NE_NAG_COMMON_LAYER($nagIndex);
    NE_NAG_COMMON_PAGE(infoIndex) = NE_NAG_COMMON_PAGE($nagIndex);
    return infoIndex;
}

proc NE_NAG_Common_mod infoIndex, nagIndex {
    local x = NE_NAG_COMMON_X($nagIndex);
    local y = NE_NAG_COMMON_Y($nagIndex);
    local width = NE_NAG_COMMON_WIDTH($nagIndex);
    local height = NE_NAG_COMMON_HEIGHT($nagIndex);
    local color = NE_NAG_COMMON_COLOR($nagIndex);
    local alpha = NE_NAG_COMMON_ALPHA($nagIndex);
    local rotation = NE_NAG_COMMON_ROTATION($nagIndex);
    if (x != "") {
        NE_COMPONENT_INFO_X($infoIndex) = x;
    }
    if (y != "") {
        NE_COMPONENT_INFO_Y($infoIndex) = y;
    }
    if (width != "") {
        NE_COMPONENT_INFO_WIDTH($infoIndex) = width;
    }
    if (height != "") {
        NE_COMPONENT_INFO_HEIGHT($infoIndex) = height;
    }
    if (color != "") {
        NE_COMPONENT_INFO_COLOR($infoIndex) = color;
    }
    if (alpha != "") {
        NE_COMPONENT_INFO_ALPHA($infoIndex) = alpha;
    }
    if (rotation != "") {
        NE_COMPONENT_INFO_ROTATION($infoIndex) = rotation;
    }
}

proc NE_NAG_Image_modOrNew nagIndex {
    local id = NE_NAG_COMMON_ID($nagIndex);
    local layer = NE_NAG_COMMON_LAYER($nagIndex);
    local page = NE_NAG_COMMON_PAGE($nagIndex);
    
    # 用 id 查找组件
    local nodeIndex = NE_Layer_findComponentInfo(layer, page, id);
    local imageIndex = 0;

    local storage = NE_NAG_IMAGE_STORAGE($nagIndex);
    local originWidth = NE_NAG_IMAGE_ORIGIN_WIDTH($nagIndex);
    local originHeight = NE_NAG_IMAGE_ORIGIN_HEIGHT($nagIndex);
    if (nodeIndex == NE_LINKLIST_NULL) {
        # 没有就创建一个
        imageIndex = NE_Component_Image_new(
            storage, originWidth, originHeight
        );
        local infoIndex = NE_NAG_Common_new($nagIndex, imageIndex);
        # 添加到 Layer
        NE_Layer_addChild layer, page, infoIndex;
    } else {
        # 有就修改
        local infoIndex = NE_LinkListNode_list[nodeIndex].data;
        imageIndex = NE_COMPONENT_INFO_INDEX(infoIndex);
        if (storage != "") {
            NE_Component_Image_list[imageIndex].storage = storage;
        }
        if (originWidth != "") {
            NE_Component_Image_list[imageIndex].originWidth = originWidth;
        }
        if (originHeight != "") {
            NE_Component_Image_list[imageIndex].originHeight = originHeight;
        }
        NE_NAG_Common_mod infoIndex, $nagIndex;
    }
}

var NE_NAG_pointer = 0;

proc NE_NAG_init {
    delete NE_NAG_list;
    NE_NAG_pointer = 1;
}

proc NE_NAG_update {
    local type = NE_NAG_COMMON_TYPE(NE_NAG_pointer);
    if (type == "image") {
        NE_NAG_Image_modOrNew(NE_NAG_pointer);
        NE_NAG_pointer += NE_NAG_IMAGE_SIZE;
    }
}

%endif