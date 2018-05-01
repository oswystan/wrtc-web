(function(){
    let hq = headquarter;
    let video_main=$("#main_video video");

    $("#thumb video").unbind('click').click(function(){
        let main_src = video_main[0].src;
        let cur_video = $(this)[0];
        video_main[0].src = cur_video.src;
        cur_video.src = main_src;
        headquarter.emit("log:info:add", "click thumb video: "+main_src);
    });

})();