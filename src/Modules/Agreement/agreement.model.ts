import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'

export default class Agreement extends TimestampedModel {

    // Table name
    static tableName = 'agreement'
    static defaultSort = 'name'

    // Table columns
    id!: string
    name!: string | null
    status!:boolean | string
    dec!: string | null
    img!: string | null
    static jsonSchema = {
        type: 'object',
        required: [ 
                   
                  
                   
    
    ],
        properties: {
            name: { type: 'string', minLength: 1 }
        }
    }



    /*
     * ---------------------------------------------------------------------
     * Model Relations
     * ---------------------------------------------------------------------
     */

}

