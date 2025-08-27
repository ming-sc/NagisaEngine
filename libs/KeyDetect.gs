%if not NE_KEY_DETECT
%define NE_KEY_DETECT

%define NE_KEY_DETECT_MOUSECLICK 1
%define NE_KEY_DETECT_SPACE 2
%define NE_KEY_DETECT_ENTER 3
%define NE_KEY_DETECT_UP_ARROW 4
%define NE_KEY_DETECT_DOWN_ARROW 5
%define NE_KEY_DETECT_LEFT_ARROW 6
%define NE_KEY_DETECT_RIGHT_ARROW 7

%define NE_KEY_DETECT_MOUSECLICK_TEXT "mouseClick"
%define NE_KEY_DETECT_SPACE_TEXT "space"
%define NE_KEY_DETECT_ENTER_TEXT "enter"
%define NE_KEY_DETECT_UP_ARROW_TEXT "up arrow"
%define NE_KEY_DETECT_DOWN_ARROW_TEXT "down arrow"
%define NE_KEY_DETECT_LEFT_ARROW_TEXT "left arrow"
%define NE_KEY_DETECT_RIGHT_ARROW_TEXT "right arrow"

struct NE_KeyDetect {
    key,
    click = 0,
    hold = 0,
    release = 0
}

list NE_KeyDetect NE_KeyDetect_list = [];

proc NE_KeyDetect_init {
    delete NE_KeyDetect_list;
    NE_KeyDetect_register;
}

proc NE_KeyDetect_register {
    add NE_KeyDetect {key: NE_KEY_DETECT_MOUSECLICK_TEXT} to NE_KeyDetect_list;
    add NE_KeyDetect {key: NE_KEY_DETECT_SPACE_TEXT} to NE_KeyDetect_list;
    add NE_KeyDetect {key: NE_KEY_DETECT_ENTER_TEXT} to NE_KeyDetect_list;
    add NE_KeyDetect {key: NE_KEY_DETECT_UP_ARROW_TEXT} to NE_KeyDetect_list;
    add NE_KeyDetect {key: NE_KEY_DETECT_DOWN_ARROW_TEXT} to NE_KeyDetect_list;
    add NE_KeyDetect {key: NE_KEY_DETECT_LEFT_ARROW_TEXT} to NE_KeyDetect_list;
    add NE_KeyDetect {key: NE_KEY_DETECT_RIGHT_ARROW_TEXT} to NE_KeyDetect_list;
}

proc NE_KeyDetect_updateAll {
    local i = 1;
    repeat (length(NE_KeyDetect_list)) {
        local NE_KeyDetect kd = NE_KeyDetect_list[i];
        local isClick = false;

        if (kd.key == NE_KEY_DETECT_MOUSECLICK_TEXT) {
            isClick = mouse_down();
        } else {
            isClick = key_pressed(kd.key);
        }

        if (isClick) {
            if (not(kd.click > 0)) {
                if (not(kd.hold > 0)) {
                    NE_KeyDetect_list[i].click = 1;
                    NE_KeyDetect_list[i].hold = 0;
                    NE_KeyDetect_list[i].release = 0;
                } else {
                    NE_KeyDetect_list[i].click = 0;
                    NE_KeyDetect_list[i].hold = 1;
                    NE_KeyDetect_list[i].release = 0;
                }
            } else {
                NE_KeyDetect_list[i].click = 0;
                NE_KeyDetect_list[i].hold = 1;
                NE_KeyDetect_list[i].release = 0;
            }
        } else {
            if (kd.click > 0 or kd.hold > 0) {
                NE_KeyDetect_list[i].release = 1;
            } else {
                NE_KeyDetect_list[i].release = 0;
            }
            NE_KeyDetect_list[i].click = 0;
            NE_KeyDetect_list[i].hold = 0;
        }
        i += 1;
    }
}

func NE_KeyDetect_consumeKeyClick(keyIndex) {
    local isClick = NE_KeyDetect_list[$keyIndex].click;
    if (isClick == 1) {
        NE_KeyDetect_list[$keyIndex].click = 2;
        return 1;
    }
    return 0;
}

%endif