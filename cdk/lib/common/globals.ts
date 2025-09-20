import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import winston from 'winston'

class GlobalObject {
  logger: winston.Logger
  dynamoDB: DynamoDBDocumentClient

  constructor() {
    this.logger
    this.dynamoDB
  }

  initialize() {
    if (!this.logger) {
      this.logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.json(),
        transports: [new winston.transports.Console()],
      })
    }

    if (!this.dynamoDB) {
      const client: DynamoDBClient = new DynamoDBClient({ region: process.env.REGION })
      const dynamoDB: DynamoDBDocumentClient = DynamoDBDocumentClient.from(client)
      this.dynamoDB = dynamoDB
    }
  }
}

const globals = new GlobalObject()
export default globals
