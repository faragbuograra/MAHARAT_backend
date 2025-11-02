import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminAdsController } from './ads.controller.admin'

import { PublicAdsController } from './ads.controller.public'


export const PublicAdsRoutes = (router: Router, prefix: string) => {
    router.get(`${ prefix }/ads`, PublicAdsController.index)
    router.get(`${ prefix }/ads/:id`, PublicAdsController.show)
}

export const AdminAdsRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/ads`)  // domain:8000/api/v1/admin/ads
        .get(
            AdminAdsController.index
        )
        .post(
            Multer.simple('ads'),
            AdminAdsController.store
        )

    router
        .route(`${ prefix }/ads/:id`) // domain:8000/api/v1/admin/ads/1
        .get(
            //to do 
            AdminAdsController.index
        )
        .patch(
            Multer.simple('ads'),
            AdminAdsController.update
        )
        // .delete(
        //     AdminAdsController.destroy
        // )
}
