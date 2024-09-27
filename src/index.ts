import * as header from "@/header";
import * as name from "@/name";
import * as string from "@/string";

import * as answer from "@/answer";
import * as question from "@/question";

import { encodingLengthList, encodeList, decodeList } from "./utils";
import { DecodedPacket, Packet } from "@/types/packet";

export * from "@/records/renc";

export * from '@/types/answer';
export * from '@/types/common';
export * from '@/types/packet';
export * from '@/types/question';

export { answer, question, header, name, string };

export const FLUSH_MASK = 1 << 15;
export const NOT_FLUSH_MASK = ~FLUSH_MASK;

export enum Flags {
    AUTHORITATIVE_ANSWER = 1 << 10,
    TRUNCATED_RESPONSE = 1 << 9,
    RECURSION_DESIRED = 1 << 8,
    RECURSION_AVAILABLE = 1 << 7,
    AUTHENTIC_DATA = 1 << 5,
    CHECKING_DISABLED = 1 << 4,
    DNSSEC_OK = 1 << 15,
}

export function encode(result: Packet, buf?: Buffer, offset = 0): Buffer {
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(result));
    if (!offset) offset = 0;

    const oldOffset = offset;

    if (!result.questions) result.questions = [];
    if (!result.answers) result.answers = [];
    if (!result.authorities) result.authorities = [];
    if (!result.additionals) result.additionals = [];

    header.encode(result as any, buf, offset);
    offset += header.encode.bytes;

    offset = encodeList(result.questions, question, buf, offset);
    offset = encodeList(result.answers, answer, buf, offset);
    offset = encodeList(result.authorities, answer, buf, offset);
    offset = encodeList(result.additionals, answer, buf, offset);

    encode.bytes = offset - oldOffset;

    return buf;
}

encode.bytes = 0;

export function decode(buf: Buffer, offset = 0): DecodedPacket {
    const oldOffset = offset;
    const result = header.decode(buf, offset);
    offset += header.decode.bytes;

    offset = decodeList(result.questions, question, buf, offset);
    offset = decodeList(result.answers, answer, buf, offset);

    // Note: when the authorities or additionals sections are corrupted or unsupported,
    // we ignore them and continue as if they were never there.
    // This is done so that we can still parse the rest of the packet.
    // TODO: Find out why the name decoder fails on some packets.

    try {
        offset = decodeList(result.authorities, answer, buf, offset);
    } catch (e) {
        if (!(e instanceof Error) || e.name !== "RangeError") {
            // throw e;
        } else {
            // ignore
            result.authorities = [];
        }
    }

    try {
        offset = decodeList(result.additionals, answer, buf, offset);
    } catch (e) {
        if (!(e instanceof Error) || e.name !== "RangeError") {
            // throw e;
        } else {
            // ignore
            result.additionals = [];
        }
    }

    decode.bytes = offset - oldOffset;

    // @ts-ignore
    return result;
}

decode.bytes = 0;

export function encodingLength(result: Packet) {
    // fix data
    for (const answer of (result.answers ?? [])) {
        if ('data' in answer &&
            typeof answer.data === "object"
        ) {
            if (Array.isArray(answer.data)) {
                let idx = 0;
                for (const item of answer.data) {
                    if (typeof item === "object"
                        && 'type' in item
                        && item.type === "Buffer"
                        && 'data' in item
                        && Array.isArray(item.data)) {
                        answer.data[idx] = Buffer.from(item.data);
                    }

                    idx++;
                }
            } else if ('type' in answer.data
                && answer.data.type === "Buffer"
                && 'data' in answer.data
                && Array.isArray(answer.data.data)) {
                answer.data = Buffer.from(answer.data.data);
            }
        }
    }

    return (
        header.encodingLength() +
        encodingLengthList(result.questions ?? [], question) +
        encodingLengthList(result.answers ?? [], answer) +
        encodingLengthList(result.authorities ?? [], answer) +
        encodingLengthList(result.additionals ?? [], answer)
    );
}

export function streamEncode(result: Packet) {
    const buf = encode(result);
    const sbuf = Buffer.allocUnsafe(2);
    sbuf.writeUInt16BE(buf.byteLength);
    const combine = Buffer.concat([sbuf, buf]);
    streamEncode.bytes = combine.byteLength;
    return combine;
}

streamEncode.bytes = 0;

export function streamDecode(sbuf: Buffer) {
    const len = sbuf.readUInt16BE(0);
    if (sbuf.byteLength < len + 2) {
        // not enough data
        return null;
    }
    const result = decode(sbuf.slice(2));
    streamDecode.bytes = decode.bytes;
    return result;
}

streamDecode.bytes = 0;
