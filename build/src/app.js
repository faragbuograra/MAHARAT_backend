"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "app", {
    enumerable: !0,
    get: ()=>app
});
const _cors = _interopRequireDefault(require("cors")), _index = require("./Routes/index"), _express = _interopRequireDefault(require("express")), _config = require("./config"), _helmet = _interopRequireDefault(require("helmet"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
app.use((0, _cors.default)({
    origin: _config.CORS_ORIGIN,
    methods: [
        "GET",
        "POST",
        "PATCH",
        "DELETE"
    ],
    credentials: !0
})), app.use((0, _helmet.default)({
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    }
})), app.use(_express.default.json()), app.use(_express.default.static(_config.PUBLIC_PATH)), app.use(_express.default.urlencoded({
    extended: !0
})), app.use((0, _index.applyRoutes)());
