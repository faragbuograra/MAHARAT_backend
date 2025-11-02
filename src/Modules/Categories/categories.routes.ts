import { Router } from 'express'
import { Multer } from '../../Middlewares/multer'
import { AdminCategoriesController } from './categories.controller.admin'
import { CategoriesController } from './categories.controller'

export const AdminCategoriesRoutes = (router: Router, prefix: string) => {

    router
        .route(`${ prefix }/categories`)
        .get(AdminCategoriesController.index)
        .post(Multer.simple('categories'), AdminCategoriesController.store)

    router
        .route(`${ prefix }/categories/:id`)
        .get(AdminCategoriesController.index)
        .patch(Multer.simple('categories'), AdminCategoriesController.update)
}
export const CategoriesRoutes = (router: Router, prefix: string) => {

    router
        .route(`${ prefix }/categories`)
        .get(CategoriesController.index)
       

    
}
