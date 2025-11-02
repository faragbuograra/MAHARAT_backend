import { Router }                from 'express'
import { Multer }                from '../../Middlewares/multer'
import { AdminAgreementController } from './agreementcontroller.admin'


export const AdminAgreementRoutes = (router: Router, prefix: string) => {

    // TODO: add insert, update and delete to admin

    router
        .route(`${ prefix }/Agreement`)  // domain:8000/api/v1/admin/Agreement
        .get(
            AdminAgreementController.index
        )
        .post(
            Multer.simple('Agreement'),
            AdminAgreementController.store
        )

    router
        .route(`${ prefix }/Agreement/:id`) // domain:8000/api/v1/admin/Agreement/1
        .get(
            //to do 
            AdminAgreementController.index
        )
        .patch(
            Multer.simple('Agreement'),
            AdminAgreementController.update
        )
        // .delete(
        //     AdminAgreementController.destroy
        // )
}
