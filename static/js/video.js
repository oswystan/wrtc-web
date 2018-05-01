var main_video=$("#main_video video");

$("#thumb video").click(function(){
    let main_src = main_video[0].src;
    let cur_video = $(this)[0];
    main_video[0].src = cur_video.src;
    cur_video.src = main_src;
});

$("#main_video video").mouseover(function(){
    let offset = $(this).offset();
    offset.top = offset.top + $(this).height()-$("#control_bar").height()-8;
    offset.left = ($(this).width() - $("#control_bar").width())/2 + offset.left;
    $("#control_bar").offset(offset);
    $("#control_bar").css("opacity", ".4");
}).mouseout(function(){
    $("#control_bar").css("opacity", "0.0");
});
$("#control_bar").mouseover(function(){
    let offset = main_video.offset();
    offset.top = offset.top + main_video.height()-$("#control_bar").height()-8;
    offset.left = (main_video.width() - $("#control_bar").width())/2 + offset.left;
    $("#control_bar").offset(offset);
    $("#control_bar").css("opacity", ".9");
}).mouseout(function(){
    $("#control_bar").css("opacity", "0.0");
});

$("#log i").click(function(){
    if ($(this).html() == "keyboard_arrow_down") {
        $(this).html("keyboard_arrow_right");
    } else {
        $(this).html("keyboard_arrow_down");
    }
});