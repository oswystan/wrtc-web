class IdGroup {
    //NOTICE: keep the parameters order the same as property of IdGroup
    constructor(appId, confId, userId, liveId, type="local") {
        this.appId  = appId;
        this.confId = confId;
        this.userId = userId;
        this.liveId = liveId;
        this.type   = type;
    }

    clone() {
        return new IdGroup(...Object.values(this));
    }

    toString() {
        return Object.values(this).reduce((str, val) => str + '@' + val);
    }

    label() {
        return this.userId + '-' + this.liveId;
    }

    str() {
        return this.toString();
    }

    static parse(str) {
        let val = str.split('@');
        if (val.length < 5) {
            return null;
        }
        return new IdGroup(...val);
    }
};

