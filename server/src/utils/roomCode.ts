const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no O/0, I/1, L — avoids visual ambiguity
const CODE_LENGTH = 6;

export function generateRoomCode(): string {
    let code = "";
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    }
    return code;
}
