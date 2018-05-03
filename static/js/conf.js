(function(){
    class AttenderInfo {
        constructor(idg) {
            this.idgroup = idg.clone();
            this.active = 0;
        }
    };
    let hq = headquarter;
    let jq_conf = $("#conf");
    let attenders = [];

    function conf_add_attender(idgroup) {
        attenders.push(new AttenderInfo(idgroup));
        conf_render();
    }
    function conf_del_attender(idgroup) {
        for (let i=0; i<attenders.length; i++) {
            if (idgroup.str() === attenders[i].idgroup.str()) {
                attenders.splice(i, 1);
                break;
            }
        }
        conf_render();
    }
    function conf_clear_attender(idgroup) {
        attenders = [];
        conf_render();
    }
    function conf_render() {
        let html = template("template_attenders", {attenders: attenders});
        jq_conf.html(html);
        jq_conf.find("#icon_new_stream").unbind('click').click(function(){
            hq.emit("diag:show");
        });
    }
    function conf_active(idg) {
        let idx = -1;
        if (idg) {
            attenders.forEach(e => e.active = 0);
            idx = attenders.findIndex( e => e.idgroup.str() == idg.str() );
        }
        if (idx >= 0) {
            attenders[idx].active = 1;
        }
        conf_render();
    }

    hq.on("conf:attender:add", conf_add_attender);
    hq.on("conf:attender:del", conf_del_attender);
    hq.on("conf:attender:clear", conf_clear_attender);
    hq.on("conf:attender:active", conf_active);
    conf_render();
})();
