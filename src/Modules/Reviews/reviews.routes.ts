import { Router } from 'express'
import { AdminReviewsController } from './reviews.controller.admin'
import { ReviewsController } from './reviews.controller'

export const AdminReviewsRoutes = (router: Router, prefix: string) => {

    router.route(`${ prefix }/reviews`).get(AdminReviewsController.index).post(AdminReviewsController.store)

    router.route(`${ prefix }/reviews/:id`).get(AdminReviewsController.index).patch(AdminReviewsController.update)

}

export const ReviewsRoutes = (router: Router, prefix: string) => {
    router.route(`${prefix}/reviews`).get(ReviewsController.index);
    router.route(`${prefix}/reviews`).post(ReviewsController.store);
}