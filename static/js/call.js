(function() {
    let hq = headquarter;
    class VideoStream {
        constructor(idg, islocal) {
            this.idgroup = idg.clone();
            this.local = islocal;
        }
    }
    let exit = 0;
    let active_streams = [];

    function checkStream(idg) {
        for (let i=0; i<active_streams.length; i++) {
            if (active_streams[i].idgroup.str() == idg.str()) {
                return true;
            }
        }
        return false;
    }
    function removeStream(idg) {
        for (let i=0; i<active_streams.length; i++) {
            if (active_streams[i].idgroup.str() == idg.str()) {
                active_streams.splice(i, 1);
                return;
            }
        }
    }

    function call_subscribe(idgroup) {
        if (checkStream(idgroup)) {
            hq.emit("log:error:add", "stream already exist " + idgroup);
            return;
        }
        let stream = new VideoStream(idgroup, false);
        active_streams.push(stream);
        hq.emit("log:info:add", "start subscribing " + idgroup);
        hq.emit("conf:attender:add", idgroup);
    }
    function call_publish(idgroup) {
        if (checkStream(idgroup)) {
            hq.emit("log:error:add", "stream already exist " + idgroup);
            return;
        }
        let stream = new VideoStream(idgroup, true);
        active_streams.push(stream);
        hq.emit("log:info:add", "start publishing " + idgroup);
        hq.emit("conf:attender:add", idgroup);
    }
    function call_unsubscribe(idgroup) {
        if (!checkStream(idgroup)) {
            return;
        }
        removeStream(idgroup);
        hq.emit("log:info:add", "start unsubscribing " + idgroup);
        hq.emit("conf:attender:del", idgroup);
        if (exit) {
            call_exit();
        }
    }
    function call_unpublish(idgroup) {
        if (!checkStream(idgroup)) {
            return;
        }
        removeStream(idgroup);
        hq.emit("log:info:add", "start unpublishing " + idgroup);
        hq.emit("conf:attender:del", idgroup);
        if (exit) {
            call_exit();
        }
    }
    function call_exit() {
        if (!exit) {
            hq.emit("log:info:add", "start exiting...");
        }
        exit = 1;
        if (active_streams.length == 0) {
            exit = 0;
            return;
        }
        let stream = active_streams[0];
        if (stream.local) {
            hq.emit("call:unpublish", stream.idgroup);
        } else {
            hq.emit("call:unsubscribe", stream.idgroup);
        }
    }

    hq.on("call:subscribe", call_subscribe);
    hq.on("call:publish", call_publish);
    hq.on("call:unsubscribe", call_unsubscribe);
    hq.on("call:unpublish", call_unpublish);
    hq.on("app:exit", call_exit);
})();
