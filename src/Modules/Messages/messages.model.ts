import { TimestampedModel } from '../Shared/TimestampedModel'

export default class Message extends TimestampedModel {

    static tableName = 'messages'

    id!: number
    sender_id!: number
    receiver_id!: number
    content!: string
    read_status!: boolean

    static jsonSchema = {
        type: 'object',
        required: ['sender_id', 'receiver_id', 'content'],
        properties: {
            content: { type: 'string' }
        }
    }

}

