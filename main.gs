costumes "assets/FG/FGNG01A.png";


%define NE_STAGE_WIDTH 480
%define NE_STAGE_HEIGHT 360

%define GL_SCREEN_WIDTH NE_STAGE_WIDTH
%define GL_SCREEN_HEIGHT NE_STAGE_HEIGHT

%include libs/GL.gs

%include libs/Utils.gs

%include libs/Layer.gs

hide;

onflag {
    # GL_clearStage;
    # GL_bindTexture "FGNG01A", 1280, 960;

    # GL_draw2dTextureToStage 0, 0, NE_STAGE_WIDTH, NE_STAGE_HEIGHT, 0;

    NE_Layer_init;
    NE_LinkList_init;

    NE_ComponentInfo_init;
    NE_Component_init;
}
