import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'

export default class Ads extends TimestampedModel {

    // Table name
    static tableName = 'ads'
    static defaultSort = 'name'

    // Table columns
    id!: string
    name!: string | null
    status!:boolean | string
    dec!: string | null
    img!: string | null
    static jsonSchema = {
        type: 'object',
        required: [ 'name',
                   
                    'dec',
                   
    
    ],
        properties: {
            name: { type: 'string', minLength: 1 }
        }
    }

    // Formats img and thumb fields when existing model value returns from database
    $parseDatabaseJson(json: Objection.Pojo): Objection.Pojo {
        json       = super.$parseDatabaseJson(json);
        json.img   = json.img != null ? `${ DOMAIN }/uploads/ads/${ json.img }` : null
      
        return json
    }

    /*
     * ---------------------------------------------------------------------
     * Model Relations
     * ---------------------------------------------------------------------
     */

}

