%if not NE_ACTION
%define NE_ACTION

struct NE_Action {
    easing = "const",
    startTime = 0,
    duration = 0,
    componentInfoIndex = 0,
    start = 0,
    diff = 0
}

list NE_Action NE_Action_list = [];
list NE_Action_list_free = [];
list NE_Action_needUpdate = [];

proc NE_Action_init {
    delete NE_Action_list;
    delete NE_Action_list_free;
    delete NE_Action_needUpdate;
}

func NE_Action_new (
    easing = "const",
    startTime,
    duration,
    componentInfoIndex,
    start,
    diff
) {
    local index = 0;
    if (length(NE_Action_list_free) > 0) {
        index = NE_Action_list_free[1];
        delete NE_Action_list_free[1];
        NE_Action_list[index] = NE_Action{
            easing: $easing,
            startTime: $startTime,
            duration: $duration,
            componentInfoIndex: $componentInfoIndex,
            start: $start,
            diff: $diff
        };
    } else {
        add NE_Action{
            easing: $easing,
            startTime: $startTime,
            duration: $duration,
            componentInfoIndex: $componentInfoIndex,
            start: $start,
            diff: $diff
        } to NE_Action_list;
        index = length(NE_Action_list);
    }
    # 马上启动动画
    add index to NE_Action_needUpdate;
    return index;
}

proc NE_Action_free index {
    add $index to NE_Action_list_free;
}

proc NE_Action_updateAll {
    local currentTime = NE_UTILS_CURRENT_TIME;
    local p = 1;
    until p > length(NE_Action_needUpdate) {
        local actionIndex = NE_Action_needUpdate[p];
        local NE_Action action = NE_Action_list[actionIndex];
        local t = (currentTime - action.startTime) / action.duration;
        if (t >= 0) {
            local newValue = 0;
            if (action.easing == "const") {
                newValue = NE_Action_constMove(action.start, action.diff, t);
            }
            NE_ComponentInfo_list[action.componentInfoIndex] = newValue;
            if (t >= 1) {
                NE_Action_free actionIndex;
                delete NE_Action_needUpdate[p];
            } else {
                p += 1;
            }
        }
    }
}

proc NE_Action_completeAll {
    repeat length(NE_Action_needUpdate) {
        local actionIndex = NE_Action_needUpdate[1];
        NE_ComponentInfo_list[NE_Action_list[actionIndex].componentInfoIndex] = 
            NE_Action_list[actionIndex].start 
            + NE_Action_list[actionIndex].diff;
        
        NE_Action_free actionIndex;
        delete NE_Action_needUpdate[1];
    }
}


# Action Functions
func NE_Action_constMove (start, diff, t) {
    if ($t > 1) {
        return $start + $diff;
    } else {
        return $start + $diff * $t;
    }
}

%endif