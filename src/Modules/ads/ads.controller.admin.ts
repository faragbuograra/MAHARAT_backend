import { NextFunction, Request, Response } from 'express'
import path                                from 'path'
import { UPLOADS_PATH }                    from '../../config'
import Ads                               from './ads.model'
import { unlink }                          from 'node:fs/promises';
import { UtilDatabase }                    from '../../Utils/finder'

export const AdminAdsController = {

    //index
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Ads.query()

        return await UtilDatabase
            .finder(Ads, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))

    },
    store: async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body
        const img  = req.file
     
        const trx = await Ads.startTransaction()

        try {
            // store file

            if (img) {
                data.img = img.filename
            }
          data.status=true
            await Ads
                .query(trx)
                .insert(data)
                .then((result) => res.json(result))

            await trx.commit()
        } catch (err) {
            // Delete file
            if (img) {
                const img_path = path.resolve(UPLOADS_PATH, 'Ads', img.filename)
                await unlink(img_path);

                console.log(`successfully deleted ${ img_path }`);
            }

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
        const trx = await Ads.startTransaction()
        if(img){
            data.img = img.filename
        }
        try {
           //delete old file
            const oldAds = await Ads.query().findById(id)
            if (oldAds?.img) {
             //delete old file
             
             // get  oldAds.img filename 
             //http://192.168.31.22:8022/uploads/ads/ads_1680874688095_1776261.png get ads_1680874688095_1776261.png
                const oldImg = oldAds.img.split('/').pop()
              
              console.log(oldImg)
                const img_path = unlink(
                    path.resolve(UPLOADS_PATH, 'Ads', oldImg?oldImg:'')
                )
              

                // const img_path = unlink(
                //     path.resolve(UPLOADS_PATH, 'Ads',)
                // )
            




            }


            

        await Ads
            .query()
            .patchAndFetchById(id, data)
            .throwIfNotFound({ message: 'Ads not found!' })
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

    //     await Ads
    //         .query()
    //         .deleteById(id)
    //         .throwIfNotFound({ message: 'Ads not found!' })
    //         .returning('*')
    //         .then((result) => res.json(result))
    //         .catch(err => next(err))

    // }

}
