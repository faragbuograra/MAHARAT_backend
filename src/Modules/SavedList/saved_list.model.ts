import { TimestampedModel } from '../Shared/TimestampedModel'
import { Model } from 'objection'
import { User } from '../Users/user.model'

export class SavedList extends TimestampedModel {

    static tableName = 'saved_list'

    id!: number
    seeker_id!: number | any
    provider_id!: number| any

    static jsonSchema = {
        type: 'object',
        required: ['seeker_id', 'provider_id'],
        properties: {}
    }

    static relationMappings = {
        provider: {
            relation: Model.BelongsToOneRelation,
            modelClass: () => require('../Users/user.model').User,
            join: {
                from: 'saved_list.provider_id',
                to: 'users.id'
            }
        }
    }

}

