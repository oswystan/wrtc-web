(function() {
    let hq = headquarter;
    let log = $("#log");
    hq.on("log:info:add", function(msg) {
        console.log(msg);
    });
    hq.on("log:error:add", function(msg) {
        console.log("error", msg);
    });
    hq.on("log:warn:add", function(msg){
        console.log("warn", msg);
    });
    hq.on("log:clear", function(){
        console.log("clear log");
    })

    $("#log i").click(function(){
        if ($(this).html() == "keyboard_arrow_down") {
            $(this).html("keyboard_arrow_right");
            $("#log li").hide();
        } else {
            $(this).html("keyboard_arrow_down");
            $("#log li").show();
        }
    });
})();