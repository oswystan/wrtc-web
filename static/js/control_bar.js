(function(){
    let hq           = headquarter;
    let bar_mic_on   = $("#control_bar i[id='mic_on']");
    let bar_mic_off  = $("#control_bar i[id='mic_off']");
    let bar_call_end = $("#control_bar i[id='call_end']");
    let bar_cam_on   = $("#control_bar i[id='cam_on']");
    let bar_cam_off  = $("#control_bar i[id='cam_off']");
    let bar_full_screen  = $("#control_bar i[id='full_screen']");
    let ele_main_video = document.getElementById("video_main");
    let main_video = $("#main_video video");

    bar_mic_on.unbind('click').click(function(){
        hq.emit("log:info:add", "mic on");
    });
    bar_mic_off.unbind('click').click(function(){
        hq.emit("log:warn:add", "mic off");
    });
    bar_call_end.unbind('click').click(function(){
        hq.emit("log:error:add", "call end");
    });
    bar_cam_on.unbind('click').click(function(){
        hq.emit("log:info:add", "camera on");
    });
    bar_cam_off.unbind('click').click(function(){
        hq.emit("log:info:add", "camera off");
    });
    bar_full_screen.unbind('click').click(function(){
        hq.emit("log:info:add", "full screen");
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
    });

    $("#control_bar").unbind('mouseover').mouseover(function(){
        let offset = main_video.offset();
        offset.top = offset.top + main_video.height()-$("#control_bar").height()-8;
        offset.left = (main_video.width() - $("#control_bar").width())/2 + offset.left;
        $("#control_bar").offset(offset);
        $("#control_bar").css("opacity", "0.97");
    }).unbind('mouseout').mouseout(function(){
        $("#control_bar").css("opacity", "0.0");
    });

    $("#main_video video").unbind('mouseover').mouseover(function(){
        let offset = $(this).offset();
        offset.top = offset.top + $(this).height()-$("#control_bar").height()-8;
        offset.left = ($(this).width() - $("#control_bar").width())/2 + offset.left;
        $("#control_bar").offset(offset);
        $("#control_bar").css("opacity", ".4");
    }).unbind('mouseout').mouseout(function(){
        $("#control_bar").css("opacity", "0.0");
    });
})();





