import type { Consumer, Producer, WebRtcTransport } from "mediasoup/types";

export interface Peer {
    id: string; // USERNAME (keep it as a mental model)
    socketId: string | null; //null until it's claimed

    transports: Map<string, WebRtcTransport>;
    producers: Map<string, Producer>;
    consumers: Map<string, Consumer>;
}
