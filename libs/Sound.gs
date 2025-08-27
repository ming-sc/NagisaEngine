%if not NE_SOUND
%define NE_SOUND

%include libs/SoundChannel.gs

%include libs/Utils.gs

%define NE_SOUND_CHANNEL_NULL 0

func NE_SoundChannel_new(
    id,
    mainStorage,
    preStorage = "",
    volume = 1.0,
    loop = false,
    state = NE_SOUND_CHANNEL_STATE_PLAYING,
    mainLength,
    preLength = 0
) {
    local index = 0;
    if (length(NE_SoundChannel_list_free) > 0) {
        index = NE_SoundChannel_list_free[1];
        delete NE_SoundChannel_list_free[1];
    } else {
        add NE_SoundChannel {} to NE_SoundChannel_list;
        index = length(NE_SoundChannel_list);
    }
    NE_SoundChannel_list[index] = NE_SoundChannel {
        id: $id,
        mainStorage: $mainStorage,
        preStorage: $preStorage,
        volume: $volume,
        loop: $loop,
        state: $state,
        mainLength: $mainLength * 1000,
        preLength: $preLength * 1000,
        lastTime: 0
    };
    return index;
}

proc NE_SoundChannel_free index {
    NE_SoundChannel_list[$index].state = NE_SOUND_CHANNEL_STATE_FREE;
    add $index to NE_SoundChannel_list_free;
}

proc NE_SoundChannel_init {
    delete NE_SoundChannel_list;
    delete NE_SoundChannel_list_free;
    delete NE_SoundChannel_needUpdate;
}

proc NE_SoundChannel_updateAll {
    local i = 1;
    # 回收播放完的 SoundChannel
    until i > length(NE_SoundChannel_needUpdate) {
        local channelIndex = NE_SoundChannel_needUpdate[i];
        if (NE_SoundChannel_list[channelIndex].state == NE_SOUND_CHANNEL_STATE_STOPPED) {
            NE_SoundChannel_free channelIndex ;
            delete NE_SoundChannel_needUpdate[i];
        }
        i += 1;
    }
}

func NE_SoundChannel_findById(id) {
    local i = 1;
    repeat length(NE_SoundChannel_list) {
        if (NE_SoundChannel_list[i].id == $id) {
            return i;
        }
        i += 1;
    }
    return NE_SOUND_CHANNEL_NULL;
}

# SoundAction

struct NE_SoundAction {
    channelIndex = "",
    startTime = "",
    duration = "",
    fromVolume = 1,
    diffVolume = 0,
    isStop = false
}

list NE_SoundAction NE_SoundAction_list = [];
list NE_SoundAction_list_free = [];
list NE_SoundAction_needUpdate = [];

proc NE_SoundAction_init {
    delete NE_SoundAction_list;
    delete NE_SoundAction_list_free;
    delete NE_SoundAction_needUpdate;
}

func NE_SoundAction_new (
    channelIndex = "",
    startTime = 0,
    duration = 0,
    fromVolume = 1,
    diffVolume = 0,
    isStop = false
) {
    local index = 0;
    if (length(NE_SoundAction_list_free) > 0) {
        index = NE_SoundAction_list_free[1];
        delete NE_SoundAction_list_free[1];
    } else {
        add NE_SoundAction {} to NE_SoundAction_list;
        index = length(NE_SoundAction_list);
    }
    NE_SoundAction_list[index] = NE_SoundAction {
        channelIndex: $channelIndex,
        startTime: $startTime,
        duration: $duration,
        fromVolume: $fromVolume,
        diffVolume: $diffVolume,
        isStop: $isStop
    };
    return index;
}

proc NE_SoundAction_free index {
    add $index to NE_SoundAction_list_free;
}

proc NE_SoundAction_updateAll {
    local currentTime = NE_UTILS_CURRENT_TIME;
    local i = 1;
    until i > length(NE_SoundAction_needUpdate) {
        local actionIndex = NE_SoundAction_needUpdate[i];
        local NE_SoundAction action = NE_SoundAction_list[actionIndex];
        local channelIndex = action.channelIndex;

        local t = (currentTime - action.startTime) / action.duration;
        if (t >= 0) {
            local newVolume = 0;

            if (t >= 1) {
                newVolume = action.fromVolume + action.diffVolume;
                delete NE_SoundAction_needUpdate[i];
                NE_SoundAction_free actionIndex;
                if (action.isStop and NE_SoundChannel_list[channelIndex].volume == 0) {
                    NE_SoundChannel_list[channelIndex].state = NE_SOUND_CHANNEL_STATE_NEEDSTOP;
                }
            } else {
                newVolume = action.fromVolume + action.diffVolume * t;
                i += 1;
            }
            NE_SoundChannel_list[channelIndex].volume = newVolume;
        }
    }
}

%endif