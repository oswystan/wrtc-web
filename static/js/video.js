(function() {
    let hq = headquarter;
    let jq_main = $("#main_video video");

    function video_add(idgroup, url) {
        jq_main[0].src = "/video/" + url;
    }
    function video_del(idgroup) {
        jq_main[0].src = "";
    }
    function video_del_main() {
    }
    function video_switch(main, thumb) {
    }

    hq.on("video:add", video_add);
    hq.on("video:del", video_del);
})();
