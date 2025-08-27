%if not NE_SOUND_CHANNEL
%define NE_SOUND_CHANNEL

%define NE_SOUND_CHANNEL_STATE_FREE 0
%define NE_SOUND_CHANNEL_STATE_PLAYING 1
%define NE_SOUND_CHANNEL_STATE_NEEDSTOP 2
%define NE_SOUND_CHANNEL_STATE_STOPPED 3

struct NE_SoundChannel {
    id = "",
    mainStorage = "",
    preStorage = "",
    volume = 1.0,
    loop = false,
    state = NE_SOUND_CHANNEL_STATE_FREE,
    mainLength = 0,
    preLength = 0,
    lastTime = 0
}


# 音频状态
# free: 空闲
# playing: 播放中
# needStop: 需要停止
# stopped: 已停止
# 
# 状态转移
# free -> playing -> needStop -> stopped -> free

%endif