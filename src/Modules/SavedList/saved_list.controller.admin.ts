import { NextFunction, Request, Response } from 'express'

import { UtilDatabase } from '../../Utils/finder'
import { SavedList } from './saved_list.model'

export const AdminSavedListController = {

    index: async (req: Request, res: Response, next: NextFunction) => {
        let query = SavedList.query()
        return await UtilDatabase.finder(SavedList, req.query, query).then(results => res.json(results)).catch(err => next(err))
    },

    store: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        const trx = await SavedList.startTransaction()
        try {
            await SavedList.query(trx).insert(data).then(result => res.json(result))
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
            await SavedList.query().patchAndFetchById(id, data).throwIfNotFound({ message: 'Saved item not found!' })
                .then(result => res.json(result)).catch(err => next(err))
        } catch (err) { return next(err) }
    }

}

