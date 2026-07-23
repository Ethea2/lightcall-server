import express from "express";
import cors from "cors";
import { createServer } from "http";

const ALLOWED_ORIGINS = "*";

async function main() {
    const app = express();

    app.use(
        cors({
            origin: ALLOWED_ORIGINS,
            methods: ["GET", "POST"],
        }),
    );

    app.get("/health", (_req, res) => {
        res.status(200).json({ status: "okay!" });
    });

    const httpServer = createServer(app);

    httpServer.listen("3000", () => {
        console.log("Listening on :3000");
        console.log(`Allowed origins: ${ALLOWED_ORIGINS}`);
    });
}

main().catch((err) => {
    console.error("Fatal startup error:", err);
    process.exit(1);
});
