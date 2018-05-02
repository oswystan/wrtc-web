class IdGroup {
    constructor(appId, confId, userId, liveId) {
        this.appId = appId;
        this.confId = confId;
        this.userId = userId;
        this.liveId = liveId;
    }

    clone() {
        return new IdGroup(this.appId, this.confId, this.userId, this.liveId);
    }

    toString() {
        return this.appId + ';' + this.confId + ';' + this.userId + ';' + this.liveId;
    }

    label() {
        return this.userId + '-' + this.liveId;
    }

    str() {
        return this.toString();
    }

    static parse(str) {
        let val = str.split(';');
        if (val.length != 4) {
            return null;
        }
        return new IdGroup(...val);
    }
};

