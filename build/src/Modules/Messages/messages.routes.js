"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminMessagesRoutes", {
    enumerable: !0,
    get: ()=>AdminMessagesRoutes
});
const _messagesControllerAdmin = require("./messages.controller.admin"), AdminMessagesRoutes = (router, prefix)=>{
    router.route(`${prefix}/messages`).get(_messagesControllerAdmin.AdminMessagesController.index).post(_messagesControllerAdmin.AdminMessagesController.store), router.route(`${prefix}/messages/:id`).get(_messagesControllerAdmin.AdminMessagesController.index).patch(_messagesControllerAdmin.AdminMessagesController.update);
};
