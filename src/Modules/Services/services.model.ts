import Objection, { Model } from 'objection'
import { DOMAIN } from "../../config"

import { TimestampedModel } from '../Shared/TimestampedModel'
import { User } from '../Users/user.model'
import { Review } from '../Reviews/reviews.model'

export default class Service extends TimestampedModel {

    // Table name
    static tableName = 'services'
    static defaultSort = 'title'

    // Table columns
    id!: number
    provider_id?: number
    category_id?: number
    title!: string
    description?: string
    price?: string
    location?: string
    images?: any
    status!: boolean | string

    static jsonSchema = {
        type: 'object',
        required: ['title'],
        properties: {
            title: { type: 'string', minLength: 1 },
            description: { type: 'string' }
        }
    }
    //relation with provider
 static get relationMappings() {
    return {
        provider: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'services.provider_id',
                to: 'users.id'
            }
        },

 
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: 'services.id',
                    to: 'reviews.service_id'
                }
            }
        
        }
    }
}