import { NextFunction, Request, Response } from 'express'
import { SavedList } from './saved_list.model'
import { User } from '../Users/user.model'

export const SavedListController = {
    index: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as User
            const saved_list = await SavedList.query().where('seeker_id', user.id).withGraphFetched('provider')
            res.json({
                data: saved_list
            })
        } catch (error) {
            next(error)
        }
    },
    store: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as User
            const { provider_id } = req.body

            const already_saved = await SavedList.query().where('seeker_id', user.id).where('provider_id', provider_id).first()

            if (already_saved) {
                return res.status(400).json({
                    message: 'Provider already saved'
                })
            }

            const saved_item = await SavedList.query().insert({
                seeker_id: user.id,
                provider_id: provider_id
            })

            res.json({
                data: saved_item
            })
        } catch (error) {
            next(error)
        }
    },
    destroy: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as User
            const { id } = req.params

            const saved_item = await SavedList.query().where('seeker_id', user.id).where('id', id).first()

            if (!saved_item) {
                return res.status(404).json({
                    message: 'Saved item not found'
                })
            }

            await SavedList.query().deleteById(id)

            res.json({
                message: 'Saved item deleted'
            })
        } catch (error) {
            next(error)
        }
    },
    show: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        await SavedList.query().findById(id).then(result => res.json(result)).catch(err => next(err))
    }
}

