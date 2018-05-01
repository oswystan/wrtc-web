

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

