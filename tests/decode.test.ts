import {expect, test} from "vitest";
import {
    encode, decode,
    // @ts-ignore
    type DecodedPacket, type Packet
} from "../src";

test('decodes packet {}', () => {
    const buffer = Buffer.from([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0])
    const decoded: DecodedPacket = {
        "id": 0,
        "flags": 0,
        "flag_aa": false,
        "flag_ad": false,
        "flag_cd": false,
        "flag_qr": false,
        "flag_ra": false,
        "flag_rd": false,
        "flag_tc": false,
        "flag_z": false,
        "type": "query",
        "rcode": "NOERROR",
        "opcode": "QUERY",
        "questions": [],
        "answers": [],
        "additionals": [],
        "authorities": [],
    };

    expect(decode(buffer)).toStrictEqual(decoded);
    expect(encode(decode(buffer))).toStrictEqual(buffer);
});

test('decodes packet { id: 5 }', () => {
    const buffer = Buffer.from([ 0x0, 0x05, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0 ]);
    const decoded: DecodedPacket = {
        "id": 5,
        "flags": 0,
        "flag_aa": false,
        "flag_ad": false,
        "flag_cd": false,
        "flag_qr": false,
        "flag_ra": false,
        "flag_rd": false,
        "flag_tc": false,
        "flag_z": false,
        "type": "query",
        "rcode": "NOERROR",
        "opcode": "QUERY",
        "questions": [],
        "answers": [],
        "additionals": [],
        "authorities": [],
    };

    expect(decode(buffer)).toStrictEqual(decoded);
    expect(encode(decode(buffer))).toStrictEqual(buffer);
});

test('decodes packet { questions: [{ type: "A", class: "IN", name: "." }] }', () => {
    const buffer = Buffer.from([ 0, 0, 0, 0, 0, 0x1, 0, 0, 0, 0, 0, 0, 0, 0, 0x1, 0, 0x1 ]);
    const decoded: DecodedPacket = {
        "id": 0,
        "flags": 0,
        "flag_aa": false,
        "flag_ad": false,
        "flag_cd": false,
        "flag_qr": false,
        "flag_ra": false,
        "flag_rd": false,
        "flag_tc": false,
        "flag_z": false,
        "type": "query",
        "rcode": "NOERROR",
        "opcode": "QUERY",
        "questions": [{ type: "A", class: "IN", name: "." }],
        "answers": [],
        "additionals": [],
        "authorities": [],
    };

    expect(decode(buffer)).toStrictEqual(decoded);
    expect(encode(decode(buffer))).toStrictEqual(buffer);
});

test('decodes packet { answers: [{ type: "A", class: "IN", data: "0.0.0.0" }] }', () => {
    const buffer = Buffer.from([ 0, 0, 0, 0, 0, 0, 0, 0x01, 0, 0, 0, 0, 0, 0, 0x01, 0, 0x01, 0, 0, 0, 0, 0, 0x04, 0, 0, 0, 0 ]);
    const decoded: DecodedPacket = {
        "id": 0,
        "flags": 0,
        "flag_aa": false,
        "flag_ad": false,
        "flag_cd": false,
        "flag_qr": false,
        "flag_ra": false,
        "flag_rd": false,
        "flag_tc": false,
        "flag_z": false,
        "type": "query",
        "rcode": "NOERROR",
        "opcode": "QUERY",
        "questions": [],
        "answers": [{ type: "A", class: "IN", name: ".", data: "0.0.0.0", flush: false, ttl: 0 }],
        "additionals": [],
        "authorities": [],
    };

    expect(decode(buffer)).toStrictEqual(decoded);
    expect(encode(decode(buffer))).toStrictEqual(buffer);
});

test('decodes packet with large id and flags', () => {
    const buffer = Buffer.from([0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]);
    const decoded: DecodedPacket = {
        "id": 65535,
        "flags": 32767,
        "flag_aa": true,
        "flag_ad": true,
        "flag_cd": true,
        "flag_qr": true,
        "flag_ra": true,
        "flag_rd": true,
        "flag_tc": true,
        "flag_z": true,
        "type": "response",
        "rcode": "RCODE_15",
        "opcode": "OPCODE_15",
        "questions": [],
        "answers": [],
        "additionals": [],
        "authorities": [],
    };

    expect(decode(buffer)).toStrictEqual(decoded);
    expect(encode(decode(buffer))).toStrictEqual(buffer);
});

test('decodes packet with multiple questions', () => {
    const buffer = Buffer.from([0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 4, 105, 112, 118, 54, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 28, 0, 1]);
    const decoded: DecodedPacket = {
        "id": 0,
        "flags": 0,
        "flag_aa": false,
        "flag_ad": false,
        "flag_cd": false,
        "flag_qr": false,
        "flag_ra": false,
        "flag_rd": false,
        "flag_tc": false,
        "flag_z": false,
        "type": "query",
        "rcode": "NOERROR",
        "opcode": "QUERY",
        "questions": [
            { type: "A", class: "IN", name: "example.com" },
            { type: "AAAA", class: "IN", name: "ipv6.example.com" }
        ],
        "answers": [],
        "additionals": [],
        "authorities": [],
    };

    expect(decode(buffer)).toStrictEqual(decoded);
    expect(encode(decode(buffer))).toStrictEqual(buffer);
});

test('decodes packet with multiple answers', () => {
    const buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4, 4, 105, 112, 118, 54, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 28, 0, 1, 0, 0, 0, 0, 0, 16, 32, 1, 13, 184, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]);
    const decoded: DecodedPacket = {
        "id": 0,
        "flags": 0,
        "flag_aa": false,
        "flag_ad": false,
        "flag_cd": false,
        "flag_qr": false,
        "flag_ra": false,
        "flag_rd": false,
        "flag_tc": false,
        "flag_z": false,
        "type": "query",
        "rcode": "NOERROR",
        "opcode": "QUERY",
        "questions": [],
        "answers": [
            { type: "A", class: "IN", name: "example.com", data: "1.2.3.4", flush: false, ttl: 0 },
            { type: "AAAA", class: "IN", name: "ipv6.example.com", data: "2001:db8::1:0", flush: false, ttl: 0 }
        ],
        "additionals": [],
        "authorities": [],
    };

    expect(decode(buffer)).toStrictEqual(decoded);
    expect(encode(decode(buffer))).toStrictEqual(buffer);
});

test('decodes packet with mixed questions and answers', () => {
    const buffer = Buffer.from([0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4]);
    const decoded: DecodedPacket = {
        "id": 0,
        "flags": 0,
        "flag_aa": false,
        "flag_ad": false,
        "flag_cd": false,
        "flag_qr": false,
        "flag_ra": false,
        "flag_rd": false,
        "flag_tc": false,
        "flag_z": false,
        "type": "query",
        "rcode": "NOERROR",
        "opcode": "QUERY",
        "questions": [
            { type: "A", class: "IN", name: "example.com" }
        ],
        "answers": [
            { type: "A", class: "IN", name: "example.com", data: "1.2.3.4", flush: false, ttl: 0 }
        ],
        "additionals": [],
        "authorities": [],
    };

    expect(decode(buffer)).toStrictEqual(decoded);
    expect(encode(decode(buffer))).toStrictEqual(buffer);
});

test('decodes packet with empty buffer', () => {
    const buffer = Buffer.from([]);
    expect(() => decode(buffer)).toThrow();
});

test('decodes packet with invalid buffer', () => {
    const buffer = Buffer.from([0xFF, 0xFF, 0xFF]);
    expect(() => decode(buffer)).toThrow();
});

test('decodes packet with mixed questions, answers, and additionals', () => {
    const buffer = Buffer.from([0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 4, 5, 6, 7, 8]);
    expect(() => decode(buffer)).toThrow();
});

test('decodes packet with corrupted (or unsupported) authorities', () => {
    const buffer = Buffer.from([241, 131, 40, 0, 0, 1, 0, 1, 0, 3, 0, 0, 12, 112, 97, 101, 100, 109, 108, 45, 108, 105, 110, 117, 120, 5, 108, 111, 107, 97, 108, 0, 0, 6, 0, 1, 7, 118, 109, 112, 97, 101, 100, 50, 12, 112, 97, 101, 100, 109, 108, 45, 108, 105, 110, 117, 120, 5, 108, 111, 107, 97, 108, 0, 0, 5, 0, 254, 0, 0, 0, 0, 0, 0, 192, 36, 0, 28, 0, 255, 0, 0, 0, 0, 0, 0, 192, 36, 0, 1, 0, 255, 0, 0, 0, 0, 0, 0, 192, 36, 0, 1, 0, 1, 0, 0, 4, 176, 0, 4, 172, 23, 241, 168]);
    decode(buffer);
});

test('decodes packet with corrupted (or unsupported) additionals', () => {
    const buffer = Buffer.from([106, 240, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 6, 103, 111, 111, 103, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 1, 0, 41, 16, 0, 0, 0, 0, 0, 0, 12, 0, 10, 0, 8, 18, 27, 173, 235, 156, 231, 126, 85]);
    decode(buffer);
});
