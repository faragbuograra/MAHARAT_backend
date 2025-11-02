import { Router } from 'express'
import { AdminMessagesController } from './messages.controller.admin'
import exp from 'node:constants'
import { MessagesController } from './messages.controller'

export const AdminMessagesRoutes = (router: Router, prefix: string) => {

    router.route(`${ prefix }/messages`).get(AdminMessagesController.index).post(AdminMessagesController.store)

    router.route(`${ prefix }/messages/:id`).get(AdminMessagesController.index).patch(AdminMessagesController.update)

}
export const MessagesRoutes = (router: Router, prefix: string) => {

    router.route(`${ prefix }/messages`).get(MessagesController.index).post(MessagesController.store)

    router.route(`${ prefix }/messages/:id`).get(MessagesController.index).patch(MessagesController.update)
}