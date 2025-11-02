import { NextFunction, Request, Response } from 'express'
import Category from './categories.model'
import { UtilDatabase } from '../../Utils/finder'

export const CategoriesController = {
    index: async (req: Request, res: Response, next: NextFunction) => {
        const query = Category.query()
        return await UtilDatabase.finder(Category, req.query, query).then(results => res.json(results)).catch(err => next(err))
    },
    show: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        await Category.query().findById(id).then(result => res.json(result)).catch(err => next(err))
    }
}

