import { getNextWorker } from "../state/worker.js";
import { mediaCodecs } from "../config/mediasoup.js";
import type { Room, ProducerRef } from "../types/room.js";
import type { Peer } from "../types/peer.js";
import { closePeer } from "./peer.js";

export async function createRoom(id: string): Promise<Room> {
    const worker = getNextWorker();
    const router = await worker.createRouter({ mediaCodecs });
    return { id, router, peers: new Map() };
}

export function hasUsername(room: Room, username: string): boolean {
    return room.peers.has(username);
}

export function addPeer(room: Room, peer: Peer): void {
    room.peers.set(peer.id, peer);
}

export function removePeer(room: Room, username: string): void {
    const peer = room.peers.get(username);
    if (peer) closePeer(peer);
    room.peers.delete(username);
}

export function isRoomEmpty(room: Room): boolean {
    return room.peers.size === 0;
}

export function getProducerRefsExcept(
    room: Room,
    username: string,
): ProducerRef[] {
    const refs: ProducerRef[] = [];
    for (const [peerId, peer] of room.peers) {
        if (peerId === username) continue;
        for (const producer of peer.producers.values()) {
            refs.push({ peerId, producerId: producer.id });
        }
    }
    return refs;
}
