%if not NE_UTILS
%define NE_UTILS

func NE_Utils_getNowTime () {
    return days_since_2000() * 86400000;
}

proc NE_Utils_updateDeltaTime {
    local currentTime = NE_Utils_getNowTime();
    NE_UTILS_DELTA_TIME = currentTime - NE_UTILS_CURRENT_TIME;
    NE_UTILS_CURRENT_TIME = currentTime;
}

proc NE_UTILS_initTime {
    NE_UTILS_CURRENT_TIME = NE_Utils_getNowTime();
    NE_UTILS_DELTA_TIME = 0;
}

%endif