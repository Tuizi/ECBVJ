import * as _ from '../libs/lodash/lodash.min';

export default class Registry {

    triggers;

    constructor() {
        this.triggers = [];
    }

    init() {
        return new Promise((resolve)=> {
            console.log("Registry ready...");
            resolve();
        });
    }

    start() {

    }

    process(data) {
        _.each(this.triggers, (trigger) => {
            trigger.process(data);
        });
    }

    add(trigger) {
        this.triggers.push(trigger);
    }
}