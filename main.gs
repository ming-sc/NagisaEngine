costumes "assets/FG/*.png", "assets/other/*.png";


%define NE_STAGE_WIDTH 480
%define NE_STAGE_HEIGHT 360

%define GL_SCREEN_WIDTH NE_STAGE_WIDTH
%define GL_SCREEN_HEIGHT NE_STAGE_HEIGHT

%include libs/GL.gs

%include libs/Utils.gs

%include libs/Action.gs

%include libs/NAG.gs

hide;

onflag {
    # GL_clearStage;
    # GL_bindTexture "FGNG01A", 1280, 960;

    # GL_draw2dTextureToStage 0, 0, NE_STAGE_WIDTH, NE_STAGE_HEIGHT, 0;

    NE_Layer_init;
    NE_LinkList_init;

    NE_ComponentInfo_init;
    NE_Component_init;

    NE_NAG_init;

    NE_RenderUtils_init;

    NE_Action_init;

    NE_UTILS_initTime;

    NE_SoundChannel_init;
    NE_SoundAction_init;

    NE_KeyDetect_init;
    
    layer = NE_Layer_new();

    NE_NAG_Sound
        id: "bgm",
        mainStorage: "BGM02A1",
        preStorage: "BGM02A0",
        loop: true,
        mainLength: 115.211,
        preLength: 6.19,
        volume: 1;
    
    NE_NAG_Image 
        id: "bg",
        layer: layer,
        page: "fore",
        storage: "FGNG01A",
        originWidth: 1280,
        originHeight: 960,
        alpha: 1.0,
        width: 480,
        height: 360;

    NE_NAG_Image 
        id: "bg",
        layer: layer,
        page: "back",
        storage: "FGNG01B",
        originWidth: 1280,
        originHeight: 960,
        alpha: 1.0,
        width: 480,
        height: 360;
    
    NE_NAG_PageTransform
        layerIndex: layer,
        time: 1000;

    NE_NAG_WaitForKey;

    NE_NAG_Image
        id: "bg",
        layer: layer,
        page: "back",
        storage: "FGNG01C";

    NE_NAG_PageTransform
        layerIndex: layer,
        time: 1000;

    NE_NAG_WaitForKey;

    NE_NAG_Image
        id: "bg",
        layer: layer,
        page: "back",
        storage: "FGNG01D";

    NE_NAG_PageTransform
        layerIndex: layer,
        time: 1000;

    messageLayer = NE_Layer_new();

    NE_NAG_Image
        id: "message_bg",
        layer: messageLayer,
        page: "fore",
        storage: "SMW00B3",
        originWidth: 1280,
        originHeight: 200,
        alpha: 0,
        width: 480,
        height: 75,
        x: 0,
        y: 280;

    NE_NAG_Action
        id: "message_bg",
        layer: messageLayer,
        page: "fore",
        easing: "const",
        duration: 700,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX,
        start: 0,
        target: 0.4;

    NE_NAG_Text
        id: "message",
        layer: messageLayer,
        page: "fore",
        text: "「Hello, World! こんにちは、世界！你好，世界！」",
        x: 40,
        y: 290,
        width: 400,
        fontSize: 25,
        color: "#FFFFFF",
        alpha: 1.0;

    NE_NAG_WaitForKey;

    NE_NAG_Text
        id: "message",
        layer: messageLayer,
        page: "fore",
        text: "「如果您愿意的话，让我带您去吧，这座小镇，愿望实现的地方……」";

    NE_NAG_WaitForKey;

    NE_NAG_Action
        layer: layer,
        easing: "const",
        duration: 1000,
        start: 1,
        target: 0,
        relativeIndex: NE_COMPONENT_INFO_ALPHA_INDEX;

    NE_NAG_SoundAction
        id: "bgm",
        duration: 1000,
        fromVolume: 1,
        toVolume: 0;

    forever {
        NE_Utils_updateDeltaTime;
        NE_KeyDetect_updateAll;
        NE_NAG_update;
        NE_Layer_PageTransform_updateAll;
        NE_Action_updateAll;
        NE_SoundChannel_updateAll;
        NE_SoundAction_updateAll;

        GL_clearStage;
        NE_Layer_renderLayer layer;
        NE_Layer_renderLayer messageLayer;
    }
}
