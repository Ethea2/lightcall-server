import os from "os";
import { workerSettings } from "../config/mediasoup.js";
import type { Worker } from "mediasoup/types";
import { createWorker } from "mediasoup";

const workers: Worker[] = [];
let nextWorkerIdx = 0;

export async function createWorkers(): Promise<void> {
    const numWorkers = os.cpus().length;
    for (let i = 0; i < numWorkers; i++) {
        const worker = await createWorker(workerSettings);
        worker.on("died", () => {
            console.error(`mediasoup worker ${worker.pid} died, exiting`);
            process.exit(1);
        });
        workers.push(worker);
    }
}

export function getNextWorker(): Worker {
    const worker = workers[nextWorkerIdx];
    nextWorkerIdx = (nextWorkerIdx + 1) % workers.length;
    return worker!;
}
