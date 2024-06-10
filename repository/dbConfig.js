import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const aws_region = process.env.REGION;

const client = new DynamoDBClient({
  region: aws_region,
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "lhch4c",
    secretAccessKey: "ov40b",
  },
});

export default client;
