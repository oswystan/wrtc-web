(function(){
    let hq           = headquarter;
    let bar_mic_on   = $("#control_bar i[id='mic_on']");
    let bar_mic_off  = $("#control_bar i[id='mic_off']");
    let bar_call_end = $("#control_bar i[id='call_end']");
    let bar_cam_on   = $("#control_bar i[id='cam_on']");
    let bar_cam_off  = $("#control_bar i[id='cam_off']");
    let bar_full_screen  = $("#control_bar i[id='full_screen']");
    let video_main = document.getElementById("video_main");

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
        if(video_main.requestFullscreen){
            video_main.requestFullscreen();
        }
        else if (video_main.webkitRequestFullscreen){
            video_main.webkitRequestFullscreen();
        }
        else if (video_main.mozRequestFullScreen){
            video_main.mozRequestFullScreen();
        }
        else if (video_main.msRequestFullscreen){
            video_main.msRequestFullscreen();
        }
    });
})();