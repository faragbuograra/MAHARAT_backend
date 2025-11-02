import { NextFunction, Request, Response } from 'express'
import Category from './categories.model'
import { UtilDatabase } from '../../Utils/finder'

export const AdminCategoriesController = {

    index: async (req: Request, res: Response, next: NextFunction) => {
        let query = Category.query()
        return await UtilDatabase.finder(Category, req.query, query)
            .then(results => res.json(results))
            .catch(err => next(err))
    },

    store: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        const trx = await Category.startTransaction()
        try {
            await Category.query(trx).insert(data).then(result => res.json(result))
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
            await Category.query().patchAndFetchById(id, data)
                .throwIfNotFound({ message: 'Category not found!' })
                .then(result => res.json(result))
                .catch(err => next(err))
        } catch (err) {
            return next(err)
        }
    }

}

