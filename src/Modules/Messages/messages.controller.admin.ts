import { NextFunction, Request, Response } from 'express'
import Message from './messages.model'
import { UtilDatabase } from '../../Utils/finder'

export const AdminMessagesController = {

    index: async (req: Request, res: Response, next: NextFunction) => {
        let query = Message.query()
        return await UtilDatabase.finder(Message, req.query, query).then(results => res.json(results)).catch(err => next(err))
    },

    store: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        const trx = await Message.startTransaction()
        try {
            await Message.query(trx).insert(data).then(result => res.json(result))
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
            await Message.query().patchAndFetchById(id, data).throwIfNotFound({ message: 'Message not found!' })
                .then(result => res.json(result)).catch(err => next(err))
        } catch (err) { return next(err) }
    }

}

