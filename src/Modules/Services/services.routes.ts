import { Router } from 'express'
import { Multer } from '../../Middlewares/multer'
import { AdminServicesController } from './services.controller.admin'
import { ServicesController } from './services.controller'

export const ServicesRoutes = (router: Router, prefix: string) => {

    router
        .route(`${ prefix }/services`)
        .get(
            ServicesController.index
        )
        .post(
            Multer.simple('attachment'),
            ServicesController.store
        )

    router
        .route(`${ prefix }/services/:id`)
        .get(
            ServicesController.show
        )
        .patch(
            Multer.simple('attachment'),
            ServicesController.update
        )
}
export const AdminServicesRoutes = (router: Router, prefix: string) => {

    router
        .route(`${ prefix }/services`)
        .get(
            AdminServicesController.index
        )
        .post(
            Multer.simple('attachment'),
            AdminServicesController.store
        )

    router
        .route(`${ prefix }/services/:id`)
        .get(
            AdminServicesController.index
        )
        .patch(
            Multer.simple('attachment'),
            AdminServicesController.update
        )
}

