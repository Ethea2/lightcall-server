import type {
    RouterRtpCodecCapability,
    WebRtcTransportOptions,
    WorkerSettings,
} from "mediasoup/types";

export const workerSettings: WorkerSettings = {
    logLevel: "warn",
    rtcMinPort: 40000,
    rtcMaxPort: 49999,
};

export const mediaCodecs: RouterRtpCodecCapability[] = [
    { kind: "audio", mimeType: "audio/opus", clockRate: 48000, channels: 2 },
];

export const webRtcTransportOptions: WebRtcTransportOptions = {
    listenIps: [
        { ip: "0.0.0.0", announcedIp: process.env.PUBLIC_IP || "127.0.0.1" },
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    initialAvailableOutgoingBitrate: 64000,
};
