costumes "assets/null.svg";

sounds "assets/bgm/*.mp3";

%include libs/SoundClone.gs

on "SoundChannel::clone" {
    NE_SoundChannel_channelIndex = NE_SoundChannel_needUpdate["last"];
    clone;
}
