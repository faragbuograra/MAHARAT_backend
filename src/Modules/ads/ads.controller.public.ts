import { NextFunction, Request, Response } from "express"
import { UtilDatabase }                    from '../../Utils/finder'
import Ads                               from './ads.model'

export const PublicAdsController = {

    /**
     * ---------------------------------------------------------------------
     * View index of a model
     * ---------------------------------------------------------------------
     */
    index: async (req: Request, res: Response, next: NextFunction) => {

        let query = Ads.query()
        // add where status = true
        query.where('status', true)

        return await UtilDatabase
            .finder(Ads, req.query, query)
            .then((results) => res.json(results))
            .catch(err => next(err))
    },

    /**
     * ---------------------------------------------------------------------
     * View a single model
     * ---------------------------------------------------------------------
     */
    show: async (req: Request, res: Response, next: NextFunction) => {

        await Ads
            .query()
            .findById(req.params.id)
            // .withGraphFetched(`[movies]`)
            .throwIfNotFound({ message: 'Ads not found!' })
            .then((result: Ads) => res.json(result))
            .catch(err => next(err))
    }
}
