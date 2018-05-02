(function() {

    let jq_mask          = $("#diag_mask");
    let jq_diag          = $("#diag_add_attender");
    let jq_btn_publish   = $("#diag_add_attender input[name='publish']");
    let jq_btn_subscribe = $("#diag_add_attender input[name='subscribe']");
    let jq_all_text      = $("#diag_add_attender input[type='text']");
    let jq_text_focused  = $("#diag_add_attender input[autofocus='autofocus']");
    let jq_icon_new      = $("#subscribe_new");
    let jq_hint          = $("#diag_hint");

    let jq_appid         = $("#diag_add_attender input[name='appid']");
    let jq_confid        = $("#diag_add_attender input[name='confid']");
    let jq_userid        = $("#diag_add_attender input[name='userid']");
    let jq_liveid        = $("#diag_add_attender input[name='liveid']");

    let IdGroup = {};

    function checkValue(idgroup) {
        for(let prop in idgroup) {
            if (idgroup[prop].length == 0) {
                jq_hint.text("> " + prop + " is empty");
                return false;
            }
        }
        return true;
    }

    function diag_show() {
        diag_reset_content();
        jq_mask.show();
        jq_diag.show();
        jq_text_focused.focus().select();
    }
    function diag_hide() {
        jq_mask.hide();
        jq_diag.hide();
    }
    function diag_reset_content() {
        jq_all_text.val("");
        jq_hint.text("");
    }
    function diag_get_content() {
        IdGroup.appId  = jq_appid.val().trim();
        IdGroup.confId = jq_confid.val().trim();
        IdGroup.userId = jq_userid.val().trim();
        IdGroup.liveId = jq_liveid.val().trim();
        return checkValue(IdGroup);
    }
    function diag_do_publish() {
        if (!diag_get_content()) {
            return;
        }
        diag_hide();
    }
    function diag_do_subscribe() {
        if (!diag_get_content()) {
            return;
        }
        diag_hide();
    }
    function diag_bind_click() {
        jq_btn_publish.unbind('click').click(diag_do_publish);
        jq_btn_subscribe.unbind('click').click(diag_do_subscribe);
        jq_icon_new.unbind('click').click(diag_show);
        jq_mask.unbind('click').click(diag_hide);
    }

    diag_bind_click();
})();
