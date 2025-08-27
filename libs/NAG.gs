%if not NAG
%define NAG

%include libs/Layer.gs

%include libs/ComponentInfo.gs

%include libs/Sound.gs

list NE_NAG_list = [];


# Common
%define NE_NAG_COMMON_TYPE(index) NE_NAG_list[index]
%define NE_NAG_COMMON_ID(index) NE_NAG_list[index + 1]
%define NE_NAG_COMMON_X(index) NE_NAG_list[index + 2]
%define NE_NAG_COMMON_Y(index) NE_NAG_list[index + 3]
%define NE_NAG_COMMON_WIDTH(index) NE_NAG_list[index + 4]
%define NE_NAG_COMMON_HEIGHT(index) NE_NAG_list[index + 5]
%define NE_NAG_COMMON_COLOR(index) NE_NAG_list[index + 6]
%define NE_NAG_COMMON_ALPHA(index) NE_NAG_list[index + 7]
%define NE_NAG_COMMON_ROTATION(index) NE_NAG_list[index + 8]
%define NE_NAG_COMMON_LAYER(index) NE_NAG_list[index + 9]
%define NE_NAG_COMMON_PAGE(index) NE_NAG_list[index + 10]
%define NE_NAG_COMMON_VALUE(index) NE_NAG_list[index + 11]
%define NE_NAG_COMMON_SIZE 12

# Image
%define NE_NAG_IMAGE_STORAGE(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE]
%define NE_NAG_IMAGE_ORIGIN_WIDTH(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 1]
%define NE_NAG_IMAGE_ORIGIN_HEIGHT(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 2]
%define NE_NAG_IMAGE_SIZE NE_NAG_COMMON_SIZE + 3

proc NE_NAG_Image
    id,
    layer, page,
    storage = "",
    originWidth = "",
    originHeight = "",
    x = "", y = "",
    width = "", height = "",
    color = "", alpha = "",
    rotation = ""
{
    local index = length(NE_NAG_list) + 1;
    repeat (NE_NAG_IMAGE_SIZE) {
        add 0 to NE_NAG_list;
    }
    NE_NAG_COMMON_TYPE(index) = "image";
    NE_NAG_COMMON_ID(index) = $id;
    NE_NAG_COMMON_X(index) = $x;
    NE_NAG_COMMON_Y(index) = $y;
    NE_NAG_COMMON_WIDTH(index) = $width;
    NE_NAG_COMMON_HEIGHT(index) = $height;
    NE_NAG_COMMON_COLOR(index) = $color;
    NE_NAG_COMMON_ALPHA(index) = $alpha;
    NE_NAG_COMMON_ROTATION(index) = $rotation;
    NE_NAG_COMMON_LAYER(index) = $layer;
    NE_NAG_COMMON_PAGE(index) = $page;

    NE_NAG_IMAGE_STORAGE(index) = $storage;
    NE_NAG_IMAGE_ORIGIN_WIDTH(index) = $originWidth;
    NE_NAG_IMAGE_ORIGIN_HEIGHT(index) = $originHeight;
}

func NE_NAG_Common_new (nagIndex, componentIndex) {
    local infoIndex = NE_ComponentInfo_new(
        NE_NAG_COMMON_ID($nagIndex),
        NE_NAG_COMMON_TYPE($nagIndex),
        $componentIndex
    );
    NE_COMPONENT_INFO_X(infoIndex) = NE_NAG_COMMON_X($nagIndex);
    NE_COMPONENT_INFO_Y(infoIndex) = NE_NAG_COMMON_Y($nagIndex);
    NE_COMPONENT_INFO_WIDTH(infoIndex) = NE_NAG_COMMON_WIDTH($nagIndex);
    NE_COMPONENT_INFO_HEIGHT(infoIndex) = NE_NAG_COMMON_HEIGHT($nagIndex);
    NE_COMPONENT_INFO_COLOR(infoIndex) = NE_NAG_COMMON_COLOR($nagIndex);
    NE_COMPONENT_INFO_ALPHA(infoIndex) = NE_NAG_COMMON_ALPHA($nagIndex);
    NE_COMPONENT_INFO_ROTATION(infoIndex) = NE_NAG_COMMON_ROTATION($nagIndex);
    NE_COMPONENT_INFO_VALUE(infoIndex) = NE_NAG_COMMON_VALUE($nagIndex);
    return infoIndex;
}

proc NE_NAG_Common_mod infoIndex, nagIndex {
    local x = NE_NAG_COMMON_X($nagIndex);
    local y = NE_NAG_COMMON_Y($nagIndex);
    local width = NE_NAG_COMMON_WIDTH($nagIndex);
    local height = NE_NAG_COMMON_HEIGHT($nagIndex);
    local color = NE_NAG_COMMON_COLOR($nagIndex);
    local alpha = NE_NAG_COMMON_ALPHA($nagIndex);
    local rotation = NE_NAG_COMMON_ROTATION($nagIndex);
    local value = NE_NAG_COMMON_VALUE($nagIndex);
    if (x != "") {
        NE_COMPONENT_INFO_X($infoIndex) = x;
    }
    if (y != "") {
        NE_COMPONENT_INFO_Y($infoIndex) = y;
    }
    if (width != "") {
        NE_COMPONENT_INFO_WIDTH($infoIndex) = width;
    }
    if (height != "") {
        NE_COMPONENT_INFO_HEIGHT($infoIndex) = height;
    }
    if (color != "") {
        NE_COMPONENT_INFO_COLOR($infoIndex) = color;
    }
    if (alpha != "") {
        NE_COMPONENT_INFO_ALPHA($infoIndex) = alpha;
    }
    if (rotation != "") {
        NE_COMPONENT_INFO_ROTATION($infoIndex) = rotation;
    }
    if (value != "") {
        NE_COMPONENT_INFO_VALUE($infoIndex) = value;
    }
}

func NE_NAG_Image_modOrNew(nagIndex) {
    local id = NE_NAG_COMMON_ID($nagIndex);
    local layer = NE_NAG_COMMON_LAYER($nagIndex);
    local page = NE_NAG_COMMON_PAGE($nagIndex);
    
    # 用 id 查找组件
    local nodeIndex = NE_Layer_findComponentInfo(layer, page, id);
    local imageIndex = 0;

    local storage = NE_NAG_IMAGE_STORAGE($nagIndex);
    local originWidth = NE_NAG_IMAGE_ORIGIN_WIDTH($nagIndex);
    local originHeight = NE_NAG_IMAGE_ORIGIN_HEIGHT($nagIndex);
    if (nodeIndex == NE_LINKLIST_NULL) {
        # 没有就创建一个
        imageIndex = NE_Component_Image_new(
            storage, originWidth, originHeight
        );
        local infoIndex = NE_NAG_Common_new($nagIndex, imageIndex);
        # 添加到 Layer
        NE_Layer_addChild layer, page, infoIndex;
    } else {
        # 有就修改
        local infoIndex = NE_LinkListNode_list[nodeIndex].data;
        imageIndex = NE_COMPONENT_INFO_INDEX(infoIndex);
        if (storage != "") {
            NE_Component_Image_list[imageIndex].storage = storage;
        }
        if (originWidth != "") {
            NE_Component_Image_list[imageIndex].originWidth = originWidth;
        }
        if (originHeight != "") {
            NE_Component_Image_list[imageIndex].originHeight = originHeight;
        }
        NE_NAG_Common_mod infoIndex, $nagIndex;
    }
    return 0;
}

# PageTransform

%define NE_NAG_TRANSFORM_LAYER_INDEX(index) NE_NAG_list[index + 1]
%define NE_NAG_TRANSFORM_OFFSET(index) NE_NAG_list[index + 2]
%define NE_NAG_TRANSFORM_TIME(index) NE_NAG_list[index + 3]
%define NE_NAG_TRANSFORM_SIZE 4

proc NE_NAG_PageTransform
    layerIndex, offset = 0, time
{
    local index = length(NE_NAG_list) + 1;
    repeat (NE_NAG_TRANSFORM_SIZE) {
        add 0 to NE_NAG_list;
    }
    NE_NAG_COMMON_TYPE(index) = "trans";
    NE_NAG_TRANSFORM_LAYER_INDEX(index) = $layerIndex;
    NE_NAG_TRANSFORM_OFFSET(index) = $offset;
    NE_NAG_TRANSFORM_TIME(index) = $time;
}

func NE_NAG_PageTransform_new(nagIndex) {
    local empty = NE_Layer_PageTransform_new(
        layerIndex: NE_NAG_TRANSFORM_LAYER_INDEX($nagIndex),
        time: NE_NAG_TRANSFORM_TIME($nagIndex),
        offset: NE_NAG_TRANSFORM_OFFSET($nagIndex)
    );
    return 0;
}

# Wait

%define NE_NAG_WAIT_TIME(index) NE_NAG_list[index + 1]
%define NE_NAG_WAIT_SIZE 2

var NE_WAIT_TIME = -1;

proc NE_Wait_init {
    NE_WAIT_TIME = -1;
}

proc NE_NAG_Wait
    time
{
    local index = length(NE_NAG_list) + 1;
    repeat (NE_NAG_WAIT_SIZE) {
        add 0 to NE_NAG_list;
    }
    NE_NAG_COMMON_TYPE(index) = "wait";
    NE_NAG_WAIT_TIME(index) = $time;
}

func NE_NAG_Wait_newOrCheck(nagIndex) {
    if (NE_WAIT_TIME < 0) {
        NE_WAIT_TIME = NE_UTILS_CURRENT_TIME + NE_NAG_WAIT_TIME($nagIndex);
        return 1;
    } elif (NE_UTILS_CURRENT_TIME >= NE_WAIT_TIME) {
        NE_WAIT_TIME = -1;
        return 0;
    } else {
        return 1;
    }
}

# Text
%define NE_NAG_TEXT_TEXT(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE]
%define NE_NAG_TEXT_FONTSIZE(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 1]
%define NE_NAG_TEXT_SPEED(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 2]
%define NE_NAG_TEXT_TIME(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 3]
%define NE_NAG_TEXT_LINEHEIGHT(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 4]
%define NE_NAG_TEXT_LETTERSPACING(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 5]
%define NE_NAG_TEXT_ITALIC(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 6]
%define NE_NAG_TEXT_WEIGHT(index) NE_NAG_list[index + NE_NAG_COMMON_SIZE + 7]

%define NE_NAG_TEXT_SIZE NE_NAG_COMMON_SIZE + 8

proc NE_NAG_Text 
    id, layer, page,
    x = "", y = "",
    width = "", height = "",
    alpha = "", rotation = "",
    color = "",
    value = "",
    text = "",
    fontSize = "",
    speed = 35,
    time = "",
    lineHeight = "",
    letterSpacing = "",
    italic = "",
    weight = ""
{
    local index = length(NE_NAG_list) + 1;
    repeat (NE_NAG_TEXT_SIZE) {
        add 0 to NE_NAG_list;
    }
    NE_NAG_COMMON_TYPE(index) = "text";
    NE_NAG_COMMON_ID(index) = $id;
    NE_NAG_COMMON_X(index) = $x;
    NE_NAG_COMMON_Y(index) = $y;
    NE_NAG_COMMON_WIDTH(index) = $width;
    NE_NAG_COMMON_HEIGHT(index) = $height;
    NE_NAG_COMMON_COLOR(index) = $color;
    NE_NAG_COMMON_ALPHA(index) = $alpha;
    NE_NAG_COMMON_ROTATION(index) = $rotation;
    NE_NAG_COMMON_LAYER(index) = $layer;
    NE_NAG_COMMON_PAGE(index) = $page;
    NE_NAG_COMMON_VALUE(index) = $value;

    NE_NAG_TEXT_TEXT(index) = $text;
    NE_NAG_TEXT_FONTSIZE(index) = $fontSize;
    NE_NAG_TEXT_SPEED(index) = $speed;
    NE_NAG_TEXT_TIME(index) = $time;
    NE_NAG_TEXT_LINEHEIGHT(index) = $lineHeight;
    NE_NAG_TEXT_LETTERSPACING(index) = $letterSpacing;
    NE_NAG_TEXT_ITALIC(index) = $italic;
    NE_NAG_TEXT_WEIGHT(index) = $weight;
}

func NE_NAG_Text_modOrNew(nagIndex) {
    local id = NE_NAG_COMMON_ID($nagIndex);
    local layer = NE_NAG_COMMON_LAYER($nagIndex);
    local page = NE_NAG_COMMON_PAGE($nagIndex);
    
    # 用 id 查找组件
    local nodeIndex = NE_Layer_findComponentInfo(layer, page, id);
    local imageIndex = 0;

    local totalTime = 0;
    local text = NE_NAG_TEXT_TEXT($nagIndex);
    local fontSize = NE_NAG_TEXT_FONTSIZE($nagIndex);
    local speed = NE_NAG_TEXT_SPEED($nagIndex);
    if (speed != "") {
        totalTime = length(text) * speed;        
    }
    local time = NE_NAG_TEXT_TIME($nagIndex);
    if (time != "") {
        totalTime = time;
    }
    local lineHeight = NE_NAG_TEXT_LINEHEIGHT($nagIndex);
    local letterSpacing = NE_NAG_TEXT_LETTERSPACING($nagIndex);
    local italic = NE_NAG_TEXT_ITALIC($nagIndex);
    local weight = NE_NAG_TEXT_WEIGHT($nagIndex);
    local textIndex = 0;
    if (nodeIndex == NE_LINKLIST_NULL) {
        textIndex = NE_Component_Text_new(
            text: text,
            size: fontSize,
            startTime: NE_UTILS_CURRENT_TIME,
            totalTime: totalTime,
            lineHeight: lineHeight,
            letterSpacing: letterSpacing,
            italic: italic,
            weight: weight
        );
        local infoIndex = NE_NAG_Common_new($nagIndex, textIndex);
        # 添加到 Layer
        NE_Layer_addChild layer, page, infoIndex;

        # 文字显示动画 action
        local action = NE_Action_new(
            easing: "const",
            startTime: NE_UTILS_CURRENT_TIME,
            duration: totalTime,
            componentInfoIndex: infoIndex + NE_COMPONENT_INFO_VALUE_INDEX,
            start: 0,
            diff: 1
        );
    } else {
        local infoIndex = NE_LinkListNode_list[nodeIndex].data;
        textIndex = NE_COMPONENT_INFO_INDEX(infoIndex);
        # 有就修改
        if (text != "") {
            NE_Component_Text_list[textIndex].text = text;
            # 修改文字触发动画 action
            local action = NE_Action_new(
                easing: "const",
                startTime: NE_UTILS_CURRENT_TIME,
                duration: totalTime,
                componentInfoIndex: infoIndex + NE_COMPONENT_INFO_VALUE_INDEX,
                start: 0,
                diff: 1
            );
        }
        if (fontSize != "") {
            NE_Component_Text_list[textIndex].size = fontSize;
        }
        NE_Component_Text_list[textIndex].startTime = NE_UTILS_CURRENT_TIME;
        NE_Component_Text_list[textIndex].totalTime = totalTime;
        if (lineHeight != "") {
            NE_Component_Text_list[textIndex].lineHeight = lineHeight;
        }
        if (letterSpacing != "") {
            NE_Component_Text_list[textIndex].letterSpacing = letterSpacing;
        }
        if (italic != "") {
            NE_Component_Text_list[textIndex].italic = italic;
        }
        if (weight != "") {
            NE_Component_Text_list[textIndex].weight = weight;
        }
        NE_NAG_Common_mod infoIndex, $nagIndex;
    }
    return 0;
}

# Action
# 取 Common 中的 type
%define NE_NAG_ACTION_COMPONENT_ID(index) NE_NAG_list[index + 1]
%define NE_NAG_ACTION_LAYER(index) NE_NAG_list[index + 2]
%define NE_NAG_ACTION_PAGE(index) NE_NAG_list[index + 3]

%define NE_NAG_ACTION_EASING(index) NE_NAG_list[index + 4]
%define NE_NAG_ACTION_OFFSET(index) NE_NAG_list[index + 5]
%define NE_NAG_ACTION_DURATION(index) NE_NAG_list[index + 6]
%define NE_NAG_ACTION_RELATIVE_INDEX(index) NE_NAG_list[index + 7]
%define NE_NAG_ACTION_START(index) NE_NAG_list[index + 8]
%define NE_NAG_ACTION_DIFF(index) NE_NAG_list[index + 9]

%define NE_NAG_ACTION_SIZE 10

proc NE_NAG_Action
    id = "",
    layer, page = "",
    easing,
    offset = 0,
    duration,
    relativeIndex,
    start,
    diff = "",
    target = ""
{
    local index = length(NE_NAG_list) + 1;
    repeat (NE_NAG_ACTION_SIZE) {
        add 0 to NE_NAG_list;
    }
    local diff = 0;
    if ($diff != "") {
        diff = $diff;
    }
    # 如果有 target 则使用 target, target 优先级高于 diff
    if ($target != "") {
        diff = $target - $start;
    }

    NE_NAG_COMMON_TYPE(index) = "action";

    NE_NAG_ACTION_COMPONENT_ID(index) = $id;
    NE_NAG_ACTION_LAYER(index) = $layer;
    NE_NAG_ACTION_PAGE(index) = $page;
    NE_NAG_ACTION_EASING(index) = $easing;
    NE_NAG_ACTION_OFFSET(index) = $offset;
    NE_NAG_ACTION_DURATION(index) = $duration;
    NE_NAG_ACTION_RELATIVE_INDEX(index) = $relativeIndex;
    NE_NAG_ACTION_START(index) = $start;
    NE_NAG_ACTION_DIFF(index) = diff;
}

func NE_NAG_Action_new(nagIndex){
    local id = NE_NAG_ACTION_COMPONENT_ID($nagIndex);
    local layer = NE_NAG_ACTION_LAYER($nagIndex);
    local page = NE_NAG_ACTION_PAGE($nagIndex);

    if (id != "" and page != "") {
        # 用 id 查找组件
        local nodeIndex = NE_Layer_findComponentInfo(layer, page, id);
        if (nodeIndex != NE_LINKLIST_NULL) {
            local infoIndex = NE_LinkListNode_list[nodeIndex].data;
            local action = NE_Action_new(
                easing: NE_NAG_ACTION_EASING($nagIndex),
                startTime: NE_UTILS_CURRENT_TIME + NE_NAG_ACTION_OFFSET($nagIndex),
                start: NE_NAG_ACTION_START($nagIndex),
                duration: NE_NAG_ACTION_DURATION($nagIndex),
                componentInfoIndex: infoIndex + NE_NAG_ACTION_RELATIVE_INDEX($nagIndex),
                diff: NE_NAG_ACTION_DIFF($nagIndex)
            );
        }
    } elif (id == "" and page == "" and layer != "") {
        # 如果id 和 page 都为空, 则控制整个 Layer
        local infoIndex = NE_Layer_list[layer].componentInfoId;
        local action = NE_Action_new(
            easing: NE_NAG_ACTION_EASING($nagIndex),
            startTime: NE_UTILS_CURRENT_TIME + NE_NAG_ACTION_OFFSET($nagIndex),
            start: NE_NAG_ACTION_START($nagIndex),
            duration: NE_NAG_ACTION_DURATION($nagIndex),
            componentInfoIndex: infoIndex + NE_NAG_ACTION_RELATIVE_INDEX($nagIndex),
            diff: NE_NAG_ACTION_DIFF($nagIndex)
        );
    }
    

    return 0;
}

# Layer
# 取 Common 中的 type
%define NE_NAG_LAYER_INDEX(index) NE_NAG_list[index + 1]
%define NE_NAG_LAYER_X(index) NE_NAG_list[index + 2]
%define NE_NAG_LAYER_Y(index) NE_NAG_list[index + 3]
%define NE_NAG_LAYER_ALPHA(index) NE_NAG_list[index + 4]
%define NE_NAG_LAYER_ROTATION(index) NE_NAG_list[index + 5]

%define NE_NAG_LAYER_SIZE 6

proc NE_NAG_Layer
    layerIndex,
    x = "", y = "",
    alpha = "",
    rotation = ""
{
    local index = length(NE_NAG_list) + 1;
    repeat (NE_NAG_LAYER_SIZE) {
        add 0 to NE_NAG_list;
    }
    NE_NAG_COMMON_TYPE(index) = "layer";

    NE_NAG_LAYER_INDEX(index) = $layerIndex;
    NE_NAG_LAYER_X(index) = $x;
    NE_NAG_LAYER_Y(index) = $y;
    NE_NAG_LAYER_ALPHA(index) = $alpha;
    NE_NAG_LAYER_ROTATION(index) = $rotation;
}

func NE_NAG_Layer_mod(nagIndex) {
    local layerIndex = NE_NAG_LAYER_INDEX($nagIndex);
    local x = NE_NAG_LAYER_X($nagIndex);
    local y = NE_NAG_LAYER_Y($nagIndex);
    local alpha = NE_NAG_LAYER_ALPHA($nagIndex);
    local rotation = NE_NAG_LAYER_ROTATION($nagIndex);
    local infoIndex = NE_Layer_list[layerIndex].componentInfoId;

    if (x != "") {
        NE_COMPONENT_INFO_X(infoIndex) = x;
    }
    if (y != "") {
        NE_COMPONENT_INFO_Y(infoIndex) = y;
    }
    if (alpha != "") {
        NE_COMPONENT_INFO_ALPHA(infoIndex) = alpha;
    }
    if (rotation != "") {
        NE_COMPONENT_INFO_ROTATION(infoIndex) = rotation;
    }

    return 0;
}

# Sound
# 取 Common 中的 type
%define NE_NAG_SOUND_ID(index) NE_NAG_list[index + 1]
%define NE_NAG_SOUND_MAINSTORAGE(index) NE_NAG_list[index + 2]
%define NE_NAG_SOUND_PRESTORAGE(index) NE_NAG_list[index + 3]
%define NE_NAG_SOUND_VOLUME(index) NE_NAG_list[index + 4]
%define NE_NAG_SOUND_LOOP(index) NE_NAG_list[index + 5]
%define NE_NAG_SOUND_STATE(index) NE_NAG_list[index + 6]
%define NE_NAG_SOUND_MAINLENGTH(index) NE_NAG_list[index + 7]
%define NE_NAG_SOUND_PRELENGTH(index) NE_NAG_list[index + 8]

%define NE_NAG_SOUND_SIZE 9

proc NE_NAG_Sound
    id,
    mainStorage,
    preStorage = "",
    volume = "",
    loop = false,
    mainLength,
    preLength = "",
    state = NE_SOUND_CHANNEL_STATE_PLAYING
{
    local index = length(NE_NAG_list) + 1;
    repeat (NE_NAG_SOUND_SIZE) {
        add 0 to NE_NAG_list;
    }
    NE_NAG_COMMON_TYPE(index) = "sound";

    NE_NAG_SOUND_ID(index) = $id;
    NE_NAG_SOUND_MAINSTORAGE(index) = $mainStorage;
    NE_NAG_SOUND_PRESTORAGE(index) = $preStorage;
    NE_NAG_SOUND_VOLUME(index) = $volume;
    NE_NAG_SOUND_LOOP(index) = $loop;
    NE_NAG_SOUND_MAINLENGTH(index) = $mainLength;
    NE_NAG_SOUND_PRELENGTH(index) = $preLength;
    NE_NAG_SOUND_STATE(index) = $state;
}

func NE_NAG_Sound_modOrNew(nagIndex) {
    local id = NE_NAG_SOUND_ID($nagIndex);

    local channelIndex = NE_SoundChannel_findById(id);

    if (channelIndex != NE_SOUND_CHANNEL_NULL) {
        local volume = NE_NAG_SOUND_VOLUME($nagIndex);
        local state = NE_NAG_SOUND_STATE($nagIndex);

        if (volume != "") {
            NE_SoundChannel_list[channelIndex].volume = volume;
        }

        if (state != "") {
            NE_SoundChannel_list[channelIndex].state = state;
        }
    } else {
        local empty = NE_SoundChannel_new(
            id: NE_NAG_SOUND_ID($nagIndex),
            mainStorage: NE_NAG_SOUND_MAINSTORAGE($nagIndex),
            preStorage: NE_NAG_SOUND_PRESTORAGE($nagIndex),
            volume: NE_NAG_SOUND_VOLUME($nagIndex),
            loop: NE_NAG_SOUND_LOOP($nagIndex),
            mainLength: NE_NAG_SOUND_MAINLENGTH($nagIndex),
            preLength: NE_NAG_SOUND_PRELENGTH($nagIndex),
            state: NE_NAG_SOUND_STATE($nagIndex)
        );
        add empty to NE_SoundChannel_needUpdate;
        broadcast_and_wait "SoundChannel::clone";
    }

    return 0;
}

# SoundAction
# 取 Common 中的 type
%define NE_NAG_SOUND_ACTION_ID(index) NE_NAG_list[index + 1]
%define NE_NAG_SOUND_ACTION_OFFSET(index) NE_NAG_list[index + 2]
%define NE_NAG_SOUND_ACTION_DURATION(index) NE_NAG_list[index + 3]
%define NE_NAG_SOUND_ACTION_FROM_VOLUME(index) NE_NAG_list[index + 4]
%define NE_NAG_SOUND_ACTION_DIFF_VOLUME(index) NE_NAG_list[index + 5]
%define NE_NAG_SOUND_ACTION_IS_STOP(index) NE_NAG_list[index + 6]

%define NE_NAG_SOUND_ACTION_SIZE 7

proc NE_NAG_SoundAction
    id,
    offset = 0,
    duration,
    fromVolume = 1,
    toVolume = "",
    diffVolume = "",
    isStop = true
{
    local index = length(NE_NAG_list) + 1;
    repeat (NE_NAG_SOUND_ACTION_SIZE) {
        add 0 to NE_NAG_list;
    }

    local diffVolume = 0;
    if ($diffVolume != "") {
        diffVolume = $diffVolume;
    }
    # 如果有 target 则使用 target, target 优先级高于 diff
    if ($toVolume != "") {
        diffVolume = $toVolume - $fromVolume;
    }

    NE_NAG_COMMON_TYPE(index) = "sound_action";

    NE_NAG_SOUND_ACTION_ID(index) = $id;
    NE_NAG_SOUND_ACTION_OFFSET(index) = $offset;
    NE_NAG_SOUND_ACTION_DURATION(index) = $duration;
    NE_NAG_SOUND_ACTION_FROM_VOLUME(index) = $fromVolume;
    NE_NAG_SOUND_ACTION_DIFF_VOLUME(index) = diffVolume;
    NE_NAG_SOUND_ACTION_IS_STOP(index) = $isStop;
}

func NE_NAG_SoundAction_new(nagIndex) {
    local id = NE_NAG_SOUND_ACTION_ID($nagIndex);

    local channelIndex = NE_SoundChannel_findById(id);
    if (channelIndex != NE_SOUND_CHANNEL_NULL) {
        local soundAction = NE_SoundAction_new(
            channelIndex: channelIndex,
            startTime: NE_UTILS_CURRENT_TIME + NE_NAG_SOUND_ACTION_OFFSET($nagIndex),
            duration: NE_NAG_SOUND_ACTION_DURATION($nagIndex),
            fromVolume: NE_NAG_SOUND_ACTION_FROM_VOLUME($nagIndex),
            diffVolume: NE_NAG_SOUND_ACTION_DIFF_VOLUME($nagIndex),
            isStop: NE_NAG_SOUND_ACTION_IS_STOP($nagIndex)
        );
        add soundAction to NE_SoundAction_needUpdate;
    }

    return 0;
}

# NAG
var NE_NAG_pointer = 0;

proc NE_NAG_init {
    delete NE_NAG_list;
    NE_NAG_pointer = 1;
    NE_Wait_init;
}

proc NE_NAG_update {
    local block = 0;
    until (NE_NAG_pointer > length(NE_NAG_list) or block != 0) {
        local type = NE_NAG_COMMON_TYPE(NE_NAG_pointer);
        
        if (type == "text") {
            block = NE_NAG_Text_modOrNew(NE_NAG_pointer);
            NE_NAG_pointer += NE_NAG_TEXT_SIZE;
        } elif (type == "image") {
            block = NE_NAG_Image_modOrNew(NE_NAG_pointer);
            NE_NAG_pointer += NE_NAG_IMAGE_SIZE;
        } elif (type == "layer") {
            block = NE_NAG_Layer_mod(NE_NAG_pointer);
            NE_NAG_pointer += NE_NAG_LAYER_SIZE;
        } elif (type == "sound") {
            block = NE_NAG_Sound_modOrNew(NE_NAG_pointer);
            NE_NAG_pointer += NE_NAG_SOUND_SIZE;
        } elif (type == "trans") {
            block = NE_NAG_PageTransform_new(NE_NAG_pointer);
            NE_NAG_pointer += NE_NAG_TRANSFORM_SIZE;
        } elif(type == "action") {
            block = NE_NAG_Action_new(NE_NAG_pointer);
            NE_NAG_pointer += NE_NAG_ACTION_SIZE;
        } elif (type == "sound_action") {
            block = NE_NAG_SoundAction_new(NE_NAG_pointer);
            NE_NAG_pointer += NE_NAG_SOUND_ACTION_SIZE;
        } elif (type == "wait") {
            block = NE_NAG_Wait_newOrCheck(NE_NAG_pointer);
            if (block == 0) {
                NE_NAG_pointer += NE_NAG_WAIT_SIZE;
            }
        }
    }
}

%endif