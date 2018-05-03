(function() {
    let hq = headquarter;
    let jq_main = $("#main_video video");
    let jq_thumb = $("#thumb");
    class StreamInfo {
        constructor(idg, url) {
            this.idgroup = idg.clone();
            this.url = url;
        }
        static clone (b) {
            return new StreamInfo(b.idgroup, b.url);
        }
    };

    let thumb_stream = [];
    let main_stream = null;

    function video_reset_main(data, url) {
            jq_main.prop("src", url);
            jq_main.attr("_video_data", data);
    }

    function video_reset(jq, stream) {
        jq.prop("src", stream.url);
        jq.attr("_video_data", stream.idgroup.str());
    }

    function find_thumb(idg) {
        return thumb_stream.findIndex( e => e.idgroup.str() === idg.str() );
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
            jq_thumb.find("video").contextmenu(function(e){
                let idg = IdGroup.parse($(e.currentTarget).attr("_video_data"));
                if (idg) {
                    hq.emit("call:end", idg);
                }
                return false;
            }).unbind('click').click(function(){
                let idg = IdGroup.parse($(this).attr("_video_data"));
                if (idg) {
                    video_exchange_with_main(idg);
                }
            });
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
    function video_exchange_with_main(idg) {
        if (main_stream && idg.str() === main_stream.idgroup.str()) {
            return;
        }
        let idx = find_thumb(idg);
        if (idx < 0) {
            return;
        }
        let selector = "#thumb video[_video_data='" + idg.str() + "']";
        let jqobj = $(selector);

        let old = thumb_stream[idx];
        if (main_stream) {
            thumb_stream[idx] = main_stream;
            main_stream = old;
            video_reset(jq_main, main_stream);
            video_reset(jqobj, thumb_stream[idx]);
        } else {
            main_stream = old;
            video_reset(jq_main, main_stream);
            thumb_stream.splice(idx, 1);
            jqobj.remove();
        }
    }

    hq.on("video:add", video_add);
    hq.on("video:del", video_del);
    hq.on("video:main:end", video_end_main);
})();
