(function(){
    let hq = headquarter;
    let jq_conf = $("#conf");
    let attenders = [];

    function conf_add_attender(idgroup) {
        attenders.push(idgroup.clone());
        conf_render();
    }
    function conf_del_attender(idgroup) {
        for (let i=0; i<attenders.length; i++) {
            if (idgroup.str() === attenders[i].str()) {
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

    hq.on("conf:attender:add", conf_add_attender);
    hq.on("conf:attender:del", conf_del_attender);
    hq.on("conf:attender:clear", conf_clear_attender);
    conf_render();
})();
