import {Worker, Queue, Job} from "bullmq"
import { defaultQueueOptions, redisConnection } from "../config/queue.js"


export const emailQueueName = "emailQueue";

export const emailQueue = new Queue(emailQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions
})

 //Worker

 export const queueWorker = new Worker(emailQueueName, async (job: Job) => {
    const data = job.data;
    console.log("🚀 ~ queueWorker ~ data:", data)
    
 }, {
    connection: redisConnection
 })
