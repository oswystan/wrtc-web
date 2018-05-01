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
    $("#control_bar").css("opacity", "0.97");
}).mouseout(function(){
    $("#control_bar").css("opacity", "0.0");
});

$("#subscribe_new").unbind('click').click(function () {
    $("#diag_mask").show();
    $("#diag_add_attender").show();
    $("#diag_add_attender input[name='appid']").focus();
});

$("#diag_mask").unbind('click').click(function(){
    $("#diag_mask").hide();
    $("#diag_add_attender").hide();
});

$("#diag_add_attender input[type='submit']").unbind('click').click(function(){
    $("#diag_mask").hide();
    $("#diag_add_attender").hide();
});

