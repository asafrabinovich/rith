import Raven from "raven-js";

function init() {
    Raven.config("https://90196893537843a8a07baf2b2a31cc14@sentry.io/5187267",{
        release: "1.0.0",
        environment: "dev-test",
    }).install();
}

function log(error) {
    Raven.captureException(error)
    console.log(error);
}
export default {
    init,
    log
};