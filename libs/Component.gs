%if not NE_COMPONENT
%define NE_COMPONENT

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

proc NEComponent_Image_free index {
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

# Text

# Common
proc NE_Component_init {
    NE_Component_Image_init;
}

proc NE_Component_free type, index {
    if ($type == "image") {
        NEComponent_Image_free $index;
    }
}

func NE_Component_copy (type, index) {
    if ($type == "image") {
        return NE_Component_Image_copy($index);
    }
}

%endif