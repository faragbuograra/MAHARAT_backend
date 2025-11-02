import { NextFunction, Request, Response } from 'express'
import path                                from 'path'

import Agreement                               from './agreement.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'

export const AdminAgreementController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Agreement.query()

        return await UtilDatabase
            .finder(Agreement, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body
        const img  = req.file
     
        const trx = await Agreement.startTransaction()

        try {
            // store file

            if (img) {
                data.img = img.filename
            }
          data.status=true
            await Agreement
                .query(trx)
                .insert(data)
                .then((result) => res.json(result))

            await trx.commit()
        } catch (err) {
          

            await trx.rollback()
            return next(err)
        }

    },

    /**
     * ---------------------------------------------------------------------
     * Update an existing instance of a model
     * ---------------------------------------------------------------------
     */
    update: async (req: Request, res: Response, next: NextFunction) => {

        const data   = req.body
        const { id } = req.params
        //check if file is uploaded
        const img = req.file
        const trx = await Agreement.startTransaction()
      
        try {
         

        await Agreement
            .query()
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'Agreement not found!' })
            .then((result) => res.json(result))
            .catch(err => next(err))
        } catch (err) {
            // Delete file
         

        }
    },


    // /**
    //  * ---------------------------------------------------------------------
    //  * Destroy an instance of a model
    //  * ---------------------------------------------------------------------
    //  */
    // destroy: async (req: Request, res: Response, next: NextFunction) => {

    //     const { id } = req.params

    //     await Agreement
    //         .query()
    //         .deleteById(id)
    //         .throwIfNotFound({ message: 'Agreement not found!' })
    //         .returning('*')
    //         .then((result) => res.json(result))
    //         .catch(err => next(err))

    // }

}
