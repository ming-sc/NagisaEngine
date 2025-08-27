%if not NE_SOUND_CLONE
%define NE_SOUND_CLONE

%include libs/SoundChannel.gs

var NE_SoundChannel_channelIndex;
var NE_SoundChannel_isFirst;

onclone {
    set_volume NE_SoundChannel_list[NE_SoundChannel_channelIndex].volume;
    NE_SoundChannel_list[NE_SoundChannel_channelIndex].lastTime = NE_UTILS_CURRENT_TIME;
    NE_SoundChannel staticChannel = NE_SoundChannel_list[NE_SoundChannel_channelIndex];

    if (NE_SoundChannel_list[NE_SoundChannel_channelIndex].preStorage != "") {
        start_sound staticChannel.preStorage;
        NE_SoundChannel_isFirst = true;
    } else {
        start_sound staticChannel.mainStorage;
        NE_SoundChannel_isFirst = false;
    }
    until NE_SoundChannel_list[NE_SoundChannel_channelIndex].state == NE_SOUND_CHANNEL_STATE_NEEDSTOP {
        if (NE_SoundChannel_isFirst) {
            if ((NE_UTILS_CURRENT_TIME - NE_SoundChannel_list[NE_SoundChannel_channelIndex].lastTime > staticChannel.preLength)) {
                start_sound staticChannel.mainStorage;
                NE_SoundChannel_list[NE_SoundChannel_channelIndex].lastTime = NE_UTILS_CURRENT_TIME;
                NE_SoundChannel_isFirst = false;
            }
        } elif (NE_UTILS_CURRENT_TIME - NE_SoundChannel_list[NE_SoundChannel_channelIndex].lastTime > staticChannel.mainLength) {
            if (staticChannel.loop) {
                start_sound staticChannel.mainStorage;
                NE_SoundChannel_list[NE_SoundChannel_channelIndex].lastTime = NE_UTILS_CURRENT_TIME;
            } else {
                # 播放完毕且不需要循环, 直接停止
                NE_SoundChannel_list[NE_SoundChannel_channelIndex].state = NE_SOUND_CHANNEL_STATE_NEEDSTOP;
            }
        }
        set_volume NE_SoundChannel_list[NE_SoundChannel_channelIndex].volume * 100;
    }
    stop_all_sounds;
    NE_SoundChannel_list[NE_SoundChannel_channelIndex].state = NE_SOUND_CHANNEL_STATE_STOPPED;
    delete_this_clone;
}

%endif