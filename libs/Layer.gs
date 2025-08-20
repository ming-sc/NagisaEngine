%if not NE_LAYER
%define NE_LAYER

%include libs/ComponentInfo.gs

# LinkList

%define NE_LINKLIST_NULL 0

struct NE_LinkList {
    head = NE_LINKLIST_NULL,
    tail = NE_LINKLIST_NULL
}

struct NE_LinkListNode {
    data,
    prev = NE_LINKLIST_NULL,
    next = NE_LINKLIST_NULL
}

list NE_LinkList NE_LinkList_list = [];
list NE_LinkList_list_free = [];

list NE_LinkListNode NE_LinkListNode_list = [];
list NE_LinkListNode_list_free = [];

proc NE_LinkList_init {
    delete NE_LinkList_list_free;
    delete NE_LinkList_list;
    delete NE_LinkListNode_list_free;
    delete NE_LinkListNode_list;
}

func NE_LinkList_new () {
    local index = 0;
    if (length(NE_LinkList_list_free) > 0) {
        index = NE_LinkList_list_free[1];
        delete NE_LinkList_list_free[1];
        NE_LinkList_list[index] = NE_LinkList {
            head: NE_LINKLIST_NULL
        };
    } else {
        add NE_LinkList {
            head: NE_LINKLIST_NULL
        } to NE_LinkList_list;
        index = length(NE_LinkList_list);
    }
    return index;
}

func NE_LinkListNode_new (data) {
    local index = 0;
    if (length(NE_LinkListNode_list_free) > 0) {
        index = NE_LinkListNode_list_free[1];
        delete NE_LinkListNode_list_free[1];
        NE_LinkListNode_list[index] = NE_LinkListNode {
            data: $data,
            prev: NE_LINKLIST_NULL,
            next: NE_LINKLIST_NULL
        };
    } else {
        add NE_LinkListNode {
            data: $data,
            prev: NE_LINKLIST_NULL,
            next: NE_LINKLIST_NULL
        } to NE_LinkListNode_list;
        index = length(NE_LinkListNode_list);
    }
    return index;
}

proc NE_LinkList_add listIndex, nodeIndex {
    local NE_LinkList linkList = NE_LinkList_list[$listIndex];

    if (linkList.head == NE_LINKLIST_NULL) {
        NE_LinkList_list[$listIndex].head = $nodeIndex;
    } else {
        NE_LinkListNode_list[linkList.tail].next = $nodeIndex;
        NE_LinkListNode_list[$nodeIndex].prev = linkList.tail;
    }
    NE_LinkList_list[$listIndex].tail = $nodeIndex;
}

proc NE_LinkList_remove listIndex, nodeIndex {
    local NE_LinkList linkList = NE_LinkList_list[$listIndex];
    local NE_LinkListNode node = NE_LinkListNode_list[$nodeIndex];

    if (linkList.head == $nodeIndex) {
        NE_LinkList_list[$listIndex].head = node.next;
    }
    if (linkList.tail == $nodeIndex) {
        NE_LinkList_list[$listIndex].tail = node.prev;
    }

    if (node.prev != NE_LINKLIST_NULL) {
        NE_LinkListNode_list[node.prev].next = node.next;
    }
    if (node.next != NE_LINKLIST_NULL) {
        NE_LinkListNode_list[node.next].prev = node.prev;
    }

    add $nodeIndex to NE_LinkListNode_list_free;
}

proc NE_LinkList_clear listIndex {
    local head = NE_LinkList_list[$listIndex].head;

    local p = head;
    until (p == NE_LINKLIST_NULL) {
        local next = NE_LinkListNode_list[p].next;
        add p to NE_LinkListNode_list_free;
        p = next;
    }

    NE_LinkList_list[$listIndex].head = NE_LINKLIST_NULL;
    NE_LinkList_list[$listIndex].tail = NE_LINKLIST_NULL;
}

proc NE_LinkList_free listIndex {
    local head = NE_LinkList_list[$listIndex].head;

    local p = head;
    until (p == NE_LINKLIST_NULL) {
        local next = NE_LinkListNode_list[p].next;
        add p to NE_LinkListNode_list_free;
        p = next;
    }

    add $listIndex to NE_LinkList_list_free;
}

# Layer

struct NE_Layer {
    x = 0, y = 0,
    width = 0, height = 0,
    foreOpacity = 1.0,
    foreChildList = 0,
    backOpacity = 1.0,
    backChildList = 0
}

list NE_Layer NE_Layer_list = [];
list NE_Layer_list_free = [];

proc NE_Layer_init {
    delete NE_Layer_list_free;
    delete NE_Layer_list;
}

func NE_Layer_new () {
    local index = 0;
    if (length(NE_Layer_list_free) > 0) {
        index = NE_Layer_list_free[1];
        delete NE_Layer_list_free[1];
        NE_Layer_list[index] = NE_Layer {
            x: 0, y: 0,
            width: 0, height: 0,
            foreChildList: NE_LinkList_new(),
            backChildList: NE_LinkList_new()
        };
    } else {
        add NE_Layer {
            x: 0, y: 0,
            width: 0, height: 0,
            foreChildList: NE_LinkList_new(),
            backChildList: NE_LinkList_new()
        } to NE_Layer_list;
        index = length(NE_Layer_list);
    }
    return index;
}

proc NE_Layer_free index {
    NE_Layer_clearChildList NE_Layer_list[$index].foreChildList;
    NE_Layer_clearChildList NE_Layer_list[$index].backChildList;
    NE_LinkList_list_free NE_Layer_list[$index].foreChildList;
    NE_LinkList_list_free NE_Layer_list[$index].backChildList;

    add $index to NE_Layer_list_free;
}

# 清除一个链表的子组件
proc NE_Layer_clearChildList childListIndex {
    local p = NE_LinkList_list[$childListIndex].head;
    until (p == NE_LINKLIST_NULL) {
        local next = NE_LinkListNode_list[p].next;
        NE_Layer_removeChildComponent $childListIndex, p;
        p = next;
    }
}

# 移除一个子组件
proc NE_Layer_removeChildComponent childListIndex, childIndex {
    NE_Component_free NE_LinkListNode_list[$childIndex].data;

    NE_LinkList_remove $childListIndex, $childIndex;
}

proc NE_Layer_addForeChild layerIndex, childIndex {
    NE_LinkList_add NE_Layer_list[$layerIndex].foreChildList, childIndex;
}

proc NE_Layer_addBackChild layerIndex, childIndex {
    NE_LinkList_add NE_Layer_list[$layerIndex].backChildList, childIndex;
}

%endif