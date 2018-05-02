(function() {
    let hq = headquarter;

    function call_subscribe(idgroup) {
        hq.emit("log:info:add", "start subscribing " + idgroup);
        hq.emit("conf:attender:add", idgroup);
    }
    function call_publish(idgroup) {
        hq.emit("log:info:add", "start publishing " + idgroup);
        hq.emit("conf:attender:add", idgroup);
    }
    function call_unsubscribe(idgroup) {
        hq.emit("log:info:add", "start unsubscribing " + idgroup);
        hq.emit("conf:attender:del", idgroup);
    }
    function call_unpublish(idgroup) {
        hq.emit("log:info:add", "start unpublishing " + idgroup);
        hq.emit("conf:attender:del", idgroup);
    }
    function call_exit() {
        hq.emit("log:info:add", "start exiting...");
    }

    hq.on("call:subscribe", call_subscribe);
    hq.on("call:publish", call_publish);
    hq.on("call:unsubscribe", call_unsubscribe);
    hq.on("call:unpublish", call_unpublish);
    hq.on("app:exit", call_exit);
})();
