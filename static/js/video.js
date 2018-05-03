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

    let thumb_stream = [];
    let main_stream = null;

    function video_reset_main(data, url) {
            jq_main.prop("src", url);
            jq_main.attr("_video_data", data);
    }

    function video_add(idgroup, url) {
        url = "/video/" + url;
        let stream = new StreamInfo(idgroup, url);
        if (!main_stream) {
            main_stream = stream;
            video_reset_main(idgroup.str(), url);
        } else  {
            thumb_stream.push(stream);
            let html = template("template_thumb_video",
                    {url: url, video_data: idgroup.str()});
            jq_thumb.append(html);
        }
    }
    function video_del(idgroup) {
        if (main_stream && idgroup.str() == main_stream.idgroup.str()) {
            video_reset_main("", "");
            main_stream = null;
        } else {
            let idx = thumb_stream.findIndex( e => e.idgroup.str() == idgroup.str() );
            if (idx < 0) {
                console.error("NO stream found in video: ", idgroup);
                return;
            }
            thumb_stream.splice(idx, 1);
            let selector = "#thumb video[_video_data='" + idgroup.str() + "']";
            console.log(selector);
            $(selector).remove();
        }
    }
    function video_end_main() {
        if (!main_stream) {
            return;
        }

        let idg = IdGroup.parse(jq_main.attr("_video_data"));
        if (idg) {
            hq.emit("call:end", idg);
        } else {
            console.error("invalid video_data:", jq_main.attr("_video_data"));
        }
    }

    hq.on("video:add", video_add);
    hq.on("video:del", video_del);
    hq.on("video:main:end", video_end_main);
})();
