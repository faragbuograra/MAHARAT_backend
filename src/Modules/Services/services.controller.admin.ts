import { NextFunction, Request, Response } from 'express'
import Service from './services.model'
import { UtilDatabase } from '../../Utils/finder'

export const AdminServicesController = {

    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Service.query()

        return await UtilDatabase
            .finder(Service, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body
        const img = req.file

        const trx = await Service.startTransaction()

        try {
            if (img) {
                data.images = img.filename
            }
            data.status = 'active'
            data.provider_id= req.user.id
            await Service
                .query(trx)
                .insert(data)
                .then((result) => res.json(result))

            await trx.commit()
        } catch (err) {
            await trx.rollback()
            return next(err)
        }

    },

    update: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body;
        const img = req.file;
        const { id } = req.params;
        const trx = await Service.startTransaction();

        try {
            if (img) {
                data.images = img.filename;
            }
            await Service
                .query()
                .patchAndFetchById(id, data)
                .throwIfNotFound({ message: 'Service not found!' })
                .then((result) => res.json(result))
                .catch(err => next(err));
        } catch (err) {
            // Optionally handle error
        }
    }

}

