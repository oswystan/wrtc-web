(function() {
    let jq_icon_exit = $("#exit_app");

    function do_exit() {
        window.top.close();
    }

    function header_bind_click() {
        jq_icon_exit.unbind('click').click(do_exit);
    }

    header_bind_click();
})();