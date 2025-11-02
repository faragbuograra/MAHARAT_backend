import { NextFunction, Request, Response } from 'express'
import { Review } from './reviews.model'
import { User } from '../Users/user.model'

export const ReviewsController = {
    index: async (req: Request, res: Response, next: NextFunction) => {
        await Review.query().then(results => res.json(results)).catch(err => next(err))
    },
    show: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        await Review.query().findById(id).then(result => res.json(result)).catch(err => next(err))
    },
    store: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as User
            const { service_id, rating, comment } = req.body

            const review = await Review.query().insert({
                seeker_id: user.id,
                service_id,
                rating,
                comment
            })

            res.status(201).json({
                data: review
            })

        } catch (error) {
            next(error)
        }
    }
}

