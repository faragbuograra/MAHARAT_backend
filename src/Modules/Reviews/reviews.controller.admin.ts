import { NextFunction, Request, Response } from 'express'

import { UtilDatabase } from '../../Utils/finder'
import { Review } from './reviews.model'

export const AdminReviewsController = {

    index: async (req: Request, res: Response, next: NextFunction) => {
        let query = Review.query()
        return await UtilDatabase.finder(Review, req.query, query).then(results => res.json(results)).catch(err => next(err))
    },

    store: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        const trx = await Review.startTransaction()
        try {
            await Review.query(trx).insert(data).then(result => res.json(result))
            await trx.commit()
        } catch (err) {
            await trx.rollback()
            return next(err)
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        const { id } = req.params
        try {
            await Review.query().patchAndFetchById(id, data).throwIfNotFound({ message: 'Review not found!' })
                .then(result => res.json(result)).catch(err => next(err))
        } catch (err) { return next(err) }
    }

}

