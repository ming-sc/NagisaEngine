costumes "assets/FG/*.png";


%define NE_STAGE_WIDTH 480
%define NE_STAGE_HEIGHT 360

%define GL_SCREEN_WIDTH NE_STAGE_WIDTH
%define GL_SCREEN_HEIGHT NE_STAGE_HEIGHT

%include libs/GL.gs

%include libs/Utils.gs

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

    NE_UTILS_initTime;
    
    layer = NE_Layer_new();
    
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

    NE_NAG_Wait
        time: 1000;

    NE_NAG_PageTransform
        layerIndex: layer,
        time: 1000;

    forever {
        NE_Utils_updateDeltaTime;
        NE_NAG_update;
        NE_Layer_PageTransform_updateAll;
        
        GL_clearStage;
        NE_Layer_renderLayer layer;
    }
}
