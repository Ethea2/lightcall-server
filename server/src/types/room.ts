import type { Router } from "mediasoup/types";
import type { Peer } from "./peer.js";

export interface Room {
    id: string;
    router: Router;
    peers: Map<string, Peer>;
}

export interface ProducerRef {
    peerId: string;
    producerId: string;
}
