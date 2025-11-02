import Objection, { Model } from 'objection'
import { TimestampedModel } from '../Shared/TimestampedModel'

export default class Category extends TimestampedModel {

    static tableName = 'categories'
    static defaultSort = 'name'

    id!: number
    name!: string
    description?: string

    static jsonSchema = {
        type: 'object',
        required: ['name'],
        properties: {
            name: { type: 'string', minLength: 1 },
            description: { type: 'string' }
        }
    }

}

