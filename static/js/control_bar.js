(function(){

    const ICONS = {
        mic_on      : "mic",
        mic_off     : "mic_off",
        cam_on      : "videocam",
        cam_off     : "videocam_off",
        call_end    : "call_end",
        full_screen : "fullscreen",
    };

    let hq           = headquarter;
    let bar_mic   = $("#control_bar i[id='bar_mic']");
    let bar_call = $("#control_bar i[id='bar_call']");
    let bar_cam   = $("#control_bar i[id='bar_cam']");
    let bar_full  = $("#control_bar i[id='bar_full']");
    let ele_main_video = document.getElementById("video_main");
    let main_video = $("#main_video video");

    function bar_mic_switch() {
        if (bar_mic.text() == ICONS.mic_on) {
            bar_mic.text(ICONS.mic_off);
            hq.aemit("log:info:add", "mic off");
        } else {
            bar_mic.text(ICONS.mic_on);
            hq.aemit("log:info:add", "mic on");
        }
    }
    function bar_cam_switch() {
        if (bar_cam.text() == ICONS.cam_on) {
            bar_cam.text(ICONS.cam_off);
            hq.aemit("log:info:add", "cam off");
        } else {
            bar_cam.text(ICONS.cam_on);
            hq.aemit("log:info:add", "cam on");
        }
    }
    function bar_full_screen() {
        if(ele_main_video.requestFullscreen){
            ele_main_video.requestFullscreen();
        }
        else if (ele_main_video.webkitRequestFullscreen){
            ele_main_video.webkitRequestFullscreen();
        }
        else if (ele_main_video.mozRequestFullScreen){
            ele_main_video.mozRequestFullScreen();
        }
        else if (ele_main_video.msRequestFullscreen){
            ele_main_video.msRequestFullscreen();
        }
        hq.aemit("log:info:add", "full screen");
    }
    function bar_call_end() {
        hq.emit("video:main:end");
    }

    function bar_set_opacity(val) {
        $("#control_bar").css("opacity", val);
    }

    function bar_reset_pos() {
        let offset = main_video.offset();
        offset.top = offset.top + main_video.height()-$("#control_bar").height()-8;
        offset.left = (main_video.width() - $("#control_bar").width())/2 + offset.left;
        $("#control_bar").offset(offset);
    }


    $("#control_bar").unbind('mouseover').mouseover(function(){
        bar_reset_pos();
        bar_set_opacity(0.97);
    }).unbind('mouseout').mouseout(function(){
        bar_set_opacity(0.0);
    });

    $("#main_video video").unbind('mouseover').mouseover(function(){
        bar_reset_pos();
        bar_set_opacity(0.4);
    }).unbind('mouseout').mouseout(function(){
        bar_set_opacity(0.0);
    });

    bar_mic.unbind('click').click(bar_mic_switch);
    bar_cam.unbind('click').click(bar_cam_switch);
    bar_call.unbind('click').click(bar_call_end);
    bar_full.unbind('click').click(bar_full_screen);

})();





