import type { Peer } from "../types/peer.js";

export function createPeer(username: string, socketId: string): Peer {
    return {
        id: username,
        socketId,
        transports: new Map(),
        producers: new Map(),
        consumers: new Map(),
    };
}

export function closePeer(peer: Peer): void {
    peer.transports.forEach((t) => t.close());
    peer.transports.clear();
    peer.producers.clear();
    peer.consumers.clear();
}
