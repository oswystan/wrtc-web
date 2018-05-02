(function() {
    let hq = headquarter;
    let jq_main = $("#main_video video");
    let jq_thumb = $("#thumb");
    class StreamInfo {
        constructor(idg, url) {
            this.idgroup = idg.clone();
            this.url = url;
        }
    };

    let stream_list = [];

    function video_add(idgroup, url, is_local) {
        url = "/video/" + url;
        stream_list.push(new StreamInfo(idgroup, url));
        if (stream_list.length == 1) {
            jq_main.prop("src", url);
            jq_main.attr("_video_data", idgroup.str());
            jq_main.attr("local", is_local);
        } else {
            let html = template("template_thumb_video",
                    {url: url, video_data: idgroup.str(), local: is_local});
            jq_thumb.append(html);
        }
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
