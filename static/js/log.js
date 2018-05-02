(function() {
    let hq = headquarter;
    let log = $("#log");
    let logs = [];
    const MAX_LOGS = 100;
    let show = false;

    function refresh_log() {
        var html = template("template_log", {logs: logs, show: show});
        $("#log").html(html);
        if (show) {
            $("#log li").show();
        }

        $("#log i").click(function(){
            if ($(this).html() == "keyboard_arrow_down") {
                $(this).html("keyboard_arrow_right");
                $("#log li").hide();
                show = false;
            } else {
                $(this).html("keyboard_arrow_down");
                $("#log li").show();
                show = true;
            }
        });
    }

    hq.on("log:info:add", function(msg) {
        msg = new Date().toISOString() + " - " + msg;
        logs.splice(0, 0, {type: "info", content: msg});
        if (logs.length > MAX_LOGS) {
            logs.pop();
        }
        refresh_log();
    });
    hq.on("log:error:add", function(msg) {
        msg = new Date().toISOString() + " - " + msg;
        logs.splice(0, 0, {type: "error", content: msg});
        if (logs.length > MAX_LOGS) {
            logs.pop();
        }
        refresh_log();
    });
    hq.on("log:warn:add", function(msg){
        msg = new Date().toISOString() + " - " + msg;
        logs.splice(0, 0, {type: "warn", content: msg});
        if (logs.length > MAX_LOGS) {
            logs.pop();
        }
        refresh_log();
    });
    hq.on("log:clear", function(){
        logs = [];
        refresh_log();
    });
    hq.on("app:exit", function() {
        hq.emit("log:clear");
    });

    refresh_log();
})();