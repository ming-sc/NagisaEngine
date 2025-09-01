%if not SCRIPT_001
%define SCRIPT_001

costumes "assets/FG/*.png", 
         "assets/other/*.png",
         "assets/BG/*.png",
         "assets/SPSCKEY/*.png";

%include libs/Layer.gs

%include libs/NAG.gs

%define MESSAGE_WITH_QUOTE(text) "「" & text & "」"

# 显示对话框
proc showMsgAndWait {
    NE_NAG_Action
        layer: messageLayer,
        easing: "const",
        duration: 1000,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Text
        id: "msg_text",
        layer: messageLayer,
        page: "fore",
        alpha: 0;

    NE_NAG_Wait
        time: 1000;
}

# 隐藏对话框
proc hideMsgAndWait {
    NE_NAG_Action
        layer: messageLayer,
        easing: "const",
        duration: 1000,
        start: 1, target: 0,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 1000;
}

# 显示名字
proc showMsgName 
    name,
    x = 65
{
    NE_NAG_Image
        id: "msg_name_bg",
        layer: messageLayer,
        page: "fore",
        alpha: 0.4;

    NE_NAG_Text
        id: "msg_name_text",
        layer: messageLayer,
        page: "fore",
        x: $x,
        text: $name,
        alpha: 1,
        value: 1;
}

# 隐藏名字
proc hideMsgName {
    NE_NAG_Image
        id: "msg_name_bg",
        layer: messageLayer,
        page: "fore",
        alpha: 0;

    NE_NAG_Text
        id: "msg_name_text",
        layer: messageLayer,
        page: "fore",
        alpha: 0;
}

# 设置对话文字
proc setMsgTextAndWait text {
    NE_NAG_Text
        id: "msg_text",
        layer: messageLayer,
        page: "fore",
        text: $text,
        alpha: 1;

    NE_NAG_WaitForKey;

    NE_NAG_Sound
        id: "voice",
        state: NE_SOUND_CHANNEL_STATE_NEEDSTOP;
}

proc script_001_scene_001 {
    NE_NAG_Sound
        id: "bgm",
        mainStorage: "BGM26A1",
        preStorage: "BGM26A0",
        loop: true,
        mainLength: 163.6568480725624,
        preLength: 30.82,
        volume: 1;

    showMsgAndWait;

    setMsgTextAndWait "一望无际的白色世界…";

    setMsgTextAndWait "………";

    setMsgTextAndWait "雪…";
    
    # 对话框消失
    hideMsgAndWait;

    NE_NAG_Image
        id: "bg",
        layer: bgLayer,
        page: "fore",
        storage: "BG300";

    # 展示雪景
    NE_NAG_Action
        layer: overlayLayer,
        easing: "const",
        duration: 3000,
        start: 1, target: 0,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 3500;

    # 显示对话框
    showMsgAndWait;

    setMsgTextAndWait "对，是雪。";

    setMsgTextAndWait "不断飘落，渐渐盖住了我的身体。";

    setMsgTextAndWait "啊啊…";

    setMsgTextAndWait "我在这里是做什么的…。";

    setMsgTextAndWait "是从什么时候开始，独自一人在这里的呢…。";

    setMsgTextAndWait "………。";

    setMsgTextAndWait "我的手…已被雪埋没。";

    setMsgTextAndWait "但似乎还抓着什么。";

    setMsgTextAndWait "拉起来。";

    setMsgTextAndWait "雪白的手。";

    setMsgTextAndWait "是女孩子的手。";

    setMsgTextAndWait "啊，我想起来了…。";

    setMsgTextAndWait "我并不是孤身一人。";

    setMsgTextAndWait "拭去她脸上的雪。";

    setMsgTextAndWait "露出来一张安详的睡脸。";

    setMsgTextAndWait "对了…";
    
    setMsgTextAndWait "我和她…一直在一起。";

    setMsgTextAndWait "在这个世界。";

    setMsgTextAndWait "这个，没有任何人，异常悲伤的世界。";

    # 对话框消失
    hideMsgAndWait;

    NE_NAG_Wait
        time: 1000;
}

proc script_001_scene_002 {
    # 显示黑幕
    NE_NAG_Image
        id: "over",
        layer: overlayLayer,
        page: "fore",
        storage: "KURO";

    NE_NAG_Action
        layer: overlayLayer,
        easing: "const",
        duration: 3000,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    # 音乐缓出
    NE_NAG_SoundAction
        id: "bgm",
        duration: 3000,
        fromVolume: 1,
        toVolume: 0;

    NE_NAG_Wait
        time: 6000;

    # 背景音乐
    NE_NAG_Sound
        id: "bgm",
        mainStorage: "BGM01A1",
        preStorage: "BGM01A0",
        loop: true,
        mainLength: 240,
        preLength: 5.461,
        volume: 1;

    NE_NAG_Wait
        time: 700;

    # 显示对话框
    showMsgAndWait;

    setMsgTextAndWait "我讨厌这座小镇。";

    setMsgTextAndWait "因为这里充满了我想要遗忘的回忆。";

    # 对话框隐藏
    hideMsgAndWait;

    # 显示坡道背景
    NE_NAG_Image
        id: "bg",
        layer: bgLayer,
        page: "fore",
        storage: "BG031";

    NE_NAG_Action
        layer: overlayLayer,
        easing: "const",
        duration: 3000,
        start: 1, target: 0,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 3000;

    # 显示对话框
    showMsgAndWait;

    setMsgTextAndWait "每天去学校听听课，和朋友聊聊天，然后回到根本不想回的家。";

    setMsgTextAndWait "周而复始一成不变。";

    # 显示名字
    showMsgName 
        name: "朋也";

    setMsgTextAndWait "（这样下去，会有什么改变吗…）";

    setMsgTextAndWait "（我的生活，什么时候才会有改变…）";

    # 名字隐藏
    hideMsgName;

    setMsgTextAndWait "小镇保留了很多自然风貌。";
    
    setMsgTextAndWait "上学路沿山蜿蜒而上。";

    setMsgTextAndWait "如果没有这些山，上起学来肯定会轻松很多。";

    setMsgTextAndWait "走直线的话，至少能缩短20分钟的时间。";

    # 显示名字
    showMsgName
        name: "朋也";

    setMsgTextAndWait "（一天，20分钟…）";

    setMsgTextAndWait "（这样算来，一年我能省下不知多少时间…）";

    hideMsgName;

    setMsgTextAndWait "一边算着，一边走着。";

    showMsgName "朋也";
    
    setMsgTextAndWait "（啊，还是不算了…）";

    hideMsgAndWait;
}

proc script_001_scene_003 {
    # 切换背景
    NE_NAG_Image
        id: "bg",
        layer: bgLayer,
        page: "back",
        storage: "BG033";

    NE_NAG_PageTransform
        layerIndex: bgLayer,
        time: 2300;

    NE_NAG_Wait
        time: 2300;

    hideMsgName;
    showMsgAndWait;

    setMsgTextAndWait "四周已经没了同校的学生。";

    setMsgTextAndWait "这条通向学校的主路，按说会有很多学生。";

    setMsgTextAndWait "何况今天并不是什么休息天。";

    setMsgTextAndWait "也就是说…现在不是学生上学的时间。";

    setMsgTextAndWait "不过，就算是看到了这冷清的情景我也毫不着急，依然悠闲地迈着步子。";

    setMsgTextAndWait "………。";

    hideMsgAndWait;

    # 显示黑幕
    NE_NAG_Action
        layer: overlayLayer,
        easing: "const",
        duration: 1500,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 1500;

    showMsgAndWait;

    setMsgTextAndWait "距离校门还有200米。";

    setMsgTextAndWait "停下脚步。";

    showMsgName "朋也";

    setMsgTextAndWait MESSAGE_WITH_QUOTE("唉…");

    hideMsgName;

    setMsgTextAndWait "抬头望天，一声叹息悄然而出。";

    hideMsgAndWait;
}

proc script_001_scene_004 {
    # 天空底图
    NE_NAG_Image
        id: "sky",
        layer: fgLayer,
        page: "fore",
        storage: "SPSCKEY00",
        originWidth: 1280,
        originHeight: 1440,
        alpha: 1.0,
        width: 480,
        height: 540;

    NE_NAG_Action
        id: "sky",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 8500,
        start: -180, target: 0,
        relativeIndex: NE_COMPONENT_INFO_Y_INDEX;

    # 太阳
    NE_NAG_Image
        id: "sun",
        layer: fgLayer,
        page: "fore",
        storage: "SPSCKEY20_N",
        originWidth: 850,
        originHeight: 856,
        y: -30,
        alpha: 1,
        width: 318,
        height: 321;

    NE_NAG_Action
        id: "sun",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 2000,
        start: 0.1, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    # 太阳光
    NE_NAG_Image
        id: "sun_light",
        layer: fgLayer,
        page: "fore",
        storage: "SPSCKEY30_N",
        originWidth: 837,
        originHeight: 421,
        x: 200,
        y: 150,
        alpha: 0.5,
        width: 313.875,
        height: 157.875;

    NE_NAG_Action
        id: "sun_light",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 8500,
        start: 200, target: 260,
        relativeIndex: NE_COMPONENT_INFO_X_INDEX;

    # 黑幕消失
    NE_NAG_Action
        layer: overlayLayer,
        easing: "const",
        duration: 1500,
        start: 1, target: 0,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 1000;

    # Key 社 logo
    NE_NAG_Image
        id: "key_logo",
        layer: fgLayer,
        page: "fore",
        storage: "SPSCKEY10",
        originWidth: 480,
        originHeight: 141,
        alpha: 0,
        x: 150,
        y: 153.5625,
        width: 180,
        height: 52.875;

    # logo 出现
    NE_NAG_Action
        id: "key_logo",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 1500,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 5000;

    # logo 消失
    NE_NAG_Action
        id: "key_logo",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 1000,
        start: 1, target: 0,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 1500;

    showMsgAndWait;

    # 到此全部动画结束

    setMsgTextAndWait "到底是谁把校门建在这种鬼地方的。";

    setMsgTextAndWait "那长长的坡道，宛如噩梦一般蜿蜒着。";

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00000",
        volume: 1.0,
        mainLength: 1.367,
        loop: false;

    showMsgName 
        name: "声",
        x: 75;
    
    setMsgTextAndWait MESSAGE_WITH_QUOTE("唉…");

    hideMsgName;

    setMsgTextAndWait "另一声叹息。比我的更短，更浅。";

    setMsgTextAndWait "看了看旁边。";
}

proc script_001_scene_005 {
    # bgm淡出
    NE_NAG_SoundAction
        id: "bgm",
        duration: 3000,
        fromVolume: 1,
        toVolume: 0;

    NE_NAG_Wait
        time: 3000;

    hideMsgAndWait;

    # bgm 渚开始播放
    NE_NAG_Sound
        id: "bgm",
        mainStorage: "BGM02A1",
        preStorage: "BGM02A0",
        loop: true,
        mainLength: 115.211,
        preLength: 6.19,
        volume: 1;

    # fg 切换
    NE_NAG_Image
        id: "fg",
        layer: fgLayer,
        page: "back",
        storage: "FGNG01A",
        originWidth: 1280,
        originHeight: 960,
        alpha: 1.0,
        width: 480,
        height: 360;

    NE_NAG_PageTransform
        layerIndex: fgLayer,
        time: 2000;

    NE_NAG_Wait
        time: 2000;

    showMsgAndWait;

    setMsgTextAndWait "是个和我一样站在这里的女学生。";

    setMsgTextAndWait "从校章的颜色来看，应该和我一样是三年级学生。";

    setMsgTextAndWait "不过，是生面孔啊。";

    setMsgTextAndWait "及肩的短发，任由风轻轻吹拂着。";

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00020",
        mainLength: 0.568,
        loop: false,
        volume: 1;

    showMsgName "女孩";

    setMsgTextAndWait MESSAGE_WITH_QUOTE("………");

    hideMsgName;

    setMsgTextAndWait "脸上噙着泪水，仿佛随时会决堤。";

    setMsgTextAndWait "我这样的惯犯倒是无所谓，但对于她这种认真的女孩子来说…";

    setMsgTextAndWait "在这种时间单独走进教室是有抵触的吧。";

    hideMsgAndWait;

    NE_NAG_LayerClear
       layerIndex: fgLayer,
       page: "back";

    NE_NAG_Image
        id: "fg",
        layer: fgLayer,
        page: "back",
        storage: "FGNG01B",
        originWidth: 1280,
        originHeight: 960,
        alpha: 1.0,
        width: 480,
        height: 360;

    NE_NAG_PageTransform
        layerIndex: fgLayer,
        time: 1500;

    NE_NAG_Wait
        time: 1500;

    showMsgName "女孩";

    showMsgAndWait;

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00040",
        mainLength: 0.832,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("嗯嗯…");

    hideMsgName;

    setMsgTextAndWait "仿佛是在为自己打气，她闭上眼睛，点了点头。";

    showMsgName "女孩";

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00060",
        mainLength: 1.365,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("………");

    hideMsgName;

    setMsgTextAndWait "然后少女睁开了眼睛。";

    setMsgTextAndWait "一直盯着矗立在高处的校门。";

    hideMsgAndWait;

    NE_NAG_Image
        id: "fg",
        layer: fgLayer,
        page: "back",
        storage: "FGNG01C";

    NE_NAG_PageTransform
        layerIndex: fgLayer,
        time: 1500;

    NE_NAG_Wait
        time: 1500;

    showMsgName "女孩";

    showMsgAndWait;

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00080",
        mainLength: 2.857,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("你喜欢这所学校吗？");

    showMsgName "朋也";

    setMsgTextAndWait MESSAGE_WITH_QUOTE("啊…？");

    hideMsgName;

    setMsgTextAndWait "不，她应该不是在问我。";

    setMsgTextAndWait "而是在问心中的某个人。";

    setMsgTextAndWait "他（或是她），会怎么回答呢。";

    showMsgName "女孩";

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00100",
        mainLength: 3.253,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("我非常非常喜欢。");

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00120",
        mainLength: 4.545,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("但是，所有的这一切…都在不断改变着。");

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00140",
        mainLength: 5.007,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("无论是多么快乐的事，多么开心的事，一切…");

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00160",
        mainLength: 3.130,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("一切，都在不断改变着。");

    hideMsgName;

    setMsgTextAndWait "她自顾自地在说。";

    showMsgName "女孩";

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00180",
        mainLength: 4.128,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("即使如此，依旧会喜欢上这个地方吗？");

    hideMsgName;

    setMsgTextAndWait "………。";

    showMsgName "女孩";

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00200",
        mainLength: 0.858,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("我…");

    showMsgName "朋也";

    setMsgTextAndWait MESSAGE_WITH_QUOTE("去找一个不就好了。");

    hideMsgAndWait;

    NE_NAG_Image
        id: "fg",
        layer: fgLayer,
        page: "back",
        storage: "FGNG01D";

    NE_NAG_PageTransform
        layerIndex: fgLayer,
        time: 1000;

    NE_NAG_Wait
        time: 1000;

    showMsgName "女孩";

    showMsgAndWait;

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00220",
        mainLength: 0.475,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("哎…？");

    hideMsgName;

    setMsgTextAndWait "少女吃了一惊，望向我。";

    setMsgTextAndWait "似乎是没料到身旁会有人。";

    showMsgName "朋也";

    setMsgTextAndWait MESSAGE_WITH_QUOTE("去重新找一个快乐和开心的事不就行了。");

    setMsgTextAndWait MESSAGE_WITH_QUOTE("能让你觉得快乐和开心的事难道就一个？不可能吧。");

    showMsgName "女孩";

    NE_NAG_Sound
        id: "voice",
        mainStorage: "z0414#00240",
        mainLength: 1.082,
        loop: false,
        volume: 1;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("………");

    hideMsgAndWait;

    NE_NAG_Image
        id: "fg",
        layer: fgLayer,
        page: "back",
        storage: "FGNG01E";

    NE_NAG_PageTransform
        layerIndex: fgLayer,
        time: 1500;

    NE_NAG_Wait
        time: 1500;

    hideMsgName;
    
    showMsgAndWait;

    setMsgTextAndWait "没错。";

    setMsgTextAndWait "对世间一无所知的懵懂时光。";

    setMsgTextAndWait "谁都有过。";

    hideMsgAndWait;

    # 背景坡道
    NE_NAG_Image
        id: "bg",
        layer: bgLayer,
        page: "fore",
        storage: "BG011";

    NE_NAG_Action
        layer: fgLayer,
        easing: "const",
        duration: 2300,
        start: 1, target: 0,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 2300;

    showMsgName "朋也";

    showMsgAndWait;

    setMsgTextAndWait MESSAGE_WITH_QUOTE("好了，该走了。");

    hideMsgAndWait;

    # 两个白底
    NE_NAG_Image
        id: "fg",
        layer: fgLayer,
        page: "fore",
        storage: "SIRO";

    NE_NAG_Image
        id: "fg",
        layer: fgLayer,
        page: "back",
        storage: "SIRO",
        alpha: 1;

    NE_NAG_Action
        layer: fgLayer,
        easing: "const",
        duration: 2500,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 3000;

    # 文字图片
    NE_NAG_Image
        id: "fg_text_image",
        layer: fgLayer,
        page: "fore",
        storage: "FGMS32_ZH",
        originWidth: 1280,
        originHeight: 960,
        alpha: 0,
        width: 480,
        height: 360;

    NE_NAG_Action
        id: "fg_text_image",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 1500,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 1500 + 2500;

    NE_NAG_Action
        id: "fg_text_image",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 1500,
        start: 1, target: 0,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 3000;

    NE_NAG_Image
        id: "fg_text_image",
        layer: fgLayer,
        page: "fore",
        storage: "FGMS33_ZH",
        alpha: 0;
    
    NE_NAG_Action
        id: "fg_text_image",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 1500,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 1500 + 1500;

    NE_NAG_Image
        id: "fg_text_image1",
        layer: fgLayer,
        page: "fore",
        storage: "FGMS34_ZH",
        originWidth: 1280,
        originHeight: 960,
        alpha: 0,
        width: 480,
        height: 360;

    NE_NAG_Action
        id: "fg_text_image1",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 1500,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 1500 + 3000;

    NE_NAG_PageTransform
        layerIndex: fgLayer,
        time: 2000;

    NE_NAG_Wait
        time: 3500;

    # 标题
    NE_NAG_Image
        id: "fg_text_image",
        layer: fgLayer,
        page: "fore",
        storage: "STT_LB00",
        originWidth: 480,
        originHeight: 110,
        x: 90, y: 120,
        alpha: 0,
        width: 300,
        height: 68.75;

    NE_NAG_Action
        id: "fg_text_image",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 3000,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_Wait
        time: 3000;

    NE_NAG_Image
        id: "fg_text_image1",
        layer: fgLayer,
        page: "fore",
        storage: "STT_LB10",
        originWidth: 288,
        originHeight: 56,
        x: 150, y: 190,
        alpha: 0,
        width: 180,
        height: 35;

    NE_NAG_Action
        id: "fg_text_image1",
        layer: fgLayer,
        page: "fore",
        easing: "const",
        duration: 2000,
        start: 0, target: 1,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

}

proc script_001 {
    bgLayer = NE_Layer_new();
    fgLayer = NE_Layer_new();
    overlayLayer = NE_Layer_new();
    messageLayer = NE_Layer_new();

    NE_NAG_Image
        id: "over",
        layer: overlayLayer,
        page: "fore",
        storage: "SIRO",
        originWidth: 1280,
        originHeight: 960,
        alpha: 1.0,
        width: 480,
        height: 360;

    NE_NAG_Image
        id: "bg",
        layer: bgLayer,
        page: "fore",
        storage: "BG300",
        originWidth: 1280,
        originHeight: 960,
        alpha: 1.0,
        width: 480,
        height: 360;

    NE_NAG_Image
        id: "bg",
        layer: bgLayer,
        page: "back",
        storage: "BG300",
        originWidth: 1280,
        originHeight: 960,
        alpha: 1.0,
        width: 480,
        height: 360;

    # 对话框
    NE_NAG_Layer
        layerIndex: messageLayer,
        alpha: 0;

    NE_NAG_Image
        id: "msg_bg",
        layer: messageLayer,
        page: "fore",
        storage: "SMW00B3",
        originWidth: 1280,
        originHeight: 200,
        alpha: 0,
        x: 0, y: 280,
        width: 480, height: 75,
        alpha: 0.4;

    NE_NAG_Text
        id: "msg_text",
        layer: messageLayer,
        page: "fore",
        x: 65, y: 290,
        width: 400,
        fontSize: 25,
        color: "#FFFFFF",
        alpha: 1.0;

    # 名字背景
    NE_NAG_Image
        id: "msg_name_bg",
        layer: messageLayer,
        page: "fore",
        storage: "_SNW00B",
        originWidth: 332,
        originHeight: 93,
        alpha: 0,
        x: 20, y: 260,
        width: 124.5, height: 34.875;

    # 名字
    NE_NAG_Text
        id: "msg_name_text",
        layer: messageLayer,
        page: "fore",
        x: 65, y: 263,
        width: 400,
        fontSize: 25,
        color: "#FFFFFF",
        alpha: 0;

    script_001_scene_001;
    script_001_scene_002;
    script_001_scene_003;
    script_001_scene_004;
    script_001_scene_005;
}

%endif