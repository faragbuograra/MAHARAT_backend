import { TimestampedModel } from '../Shared/TimestampedModel'

export class Review extends TimestampedModel {

    static tableName = 'reviews'

    id!: number
    service_id!: number | any
    seeker_id!: number | any   
    rating!: number | any
    comment?: string | any

    static jsonSchema = {
        type: 'object',
        required: ['service_id', 'seeker_id', 'rating'],
        properties: {
            comment: { type: 'string' }
        }
    }

}

