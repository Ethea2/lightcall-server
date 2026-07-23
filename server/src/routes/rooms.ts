import { Router } from "express";
import { createRoomWithCode } from "../state/rooms.js";

const router = Router();

router.post("/create", async (_req, res) => {
    try {
        const room = await createRoomWithCode();
        res.status(201).json({ roomCode: room.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "failed to create room" });
    }
});

export default router;
