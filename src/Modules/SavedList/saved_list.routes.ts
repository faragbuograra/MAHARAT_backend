import { Router } from 'express'
import { AdminSavedListController } from './saved_list.controller.admin'
import { SavedListController } from './saved_list.controller'

export const AdminSavedListRoutes = (router: Router, prefix: string) => {

    router.route(`${ prefix }/saved_list`).get(AdminSavedListController.index).post(AdminSavedListController.store)

    router.route(`${ prefix }/saved_list/:id`).get(AdminSavedListController.index).patch(AdminSavedListController.update)

}
export const SavedListRoutes = (router: Router, prefix: string) => {
    router.route(`${prefix}/saved_list`).get(SavedListController.index).post(SavedListController.store)
   
    router.route(`${prefix}/saved_list/:id`).get(SavedListController.show).delete(SavedListController.destroy)

}