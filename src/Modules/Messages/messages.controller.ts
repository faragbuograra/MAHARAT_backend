import { NextFunction, Request, Response } from 'express'
import Message from './messages.model'

export const MessagesController = {
    index: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            let results;
            console.log(req.user.id);
            console.log(id);

            if (req.user.role === 'seeker') {
                // Seeker: show messages where I am sender
                results = await Message.query()
                    .where('sender_id', req.user.id )
                    .orWhere('receiver_id', id ? id : id);
            } else if (req.user.role === 'provider' && id) {
                // Provider: show messages where I am receiver
                results = await Message.query()
                    .where('receiver_id', req.user.id)
                    .orWhere('sender_id', id ? id : id);
            } else {
                // Default: show all messages where I am sender or receiver
                results = await Message.query()
                    .where('sender_id', req.user.id)
                    .orWhere('receiver_id', req.user.id);
            }
            res.json(results);
        } catch (err) {
            next(err);
        }
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