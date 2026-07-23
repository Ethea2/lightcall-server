import type { Room } from "../types/room.js";
import { createRoom, isRoomEmpty } from "../services/room.js";
import { generateRoomCode } from "../utils/roomCode.js";

const rooms = new Map<string, Room>();

export async function createRoomWithCode(): Promise<Room> {
    let code = generateRoomCode();

    const room = await createRoom(code);
    rooms.set(code, room);
    return room;
}

export function getRoom(code: string): Room | undefined {
    return rooms.get(code);
}

export function deleteRoomIfEmpty(code: string): void {
    const room = rooms.get(code);
    if (room && isRoomEmpty(room)) rooms.delete(code);
}

export { rooms };
