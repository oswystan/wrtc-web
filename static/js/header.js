(function() {
    let hq = headquarter;
    let jq_icon_exit = $("#exit_app");

    function do_exit() {
        hq.emit("app:exit");
    }

    function header_bind_click() {
        jq_icon_exit.unbind('click').click(do_exit);
    }

    header_bind_click();
})();