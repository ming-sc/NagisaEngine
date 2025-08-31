costumes "assets/null.svg";

sounds "assets/bgm/*.mp3",
       "assets/voice/*.mp3";

%include libs/SoundClone.gs

hide;

on "SoundManager::init" {
    NE_SoundChannel_channelIndex = 0;
}

on "SoundChannel::clone" {
    if (NE_SoundChannel_channelIndex == 0) {
        NE_SoundChannel_channelIndex = NE_SoundChannel_needUpdate["last"];
        clone;
        NE_SoundChannel_channelIndex = 0;
    }
}
