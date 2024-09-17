import { expect, test } from "vitest";
import {
    encode, decode,
    // @ts-ignore
    type Packet
} from "../src";

test('encodes packet {}', () => {
    const packet: Packet = {};

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 5 }', () => {
    const packet: Packet = { id: 5 };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,5,0,0,0,0,0,0,0,0,0,0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { questions: [{ type: "A", class: "IN", name: "." }] }', () => {
    const packet: Packet = { questions: [{ type: "A", class: "IN", name: "." }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { answers: [{ type: "A", class: "IN", name: ".", data: "0.0.0.0" }] }', () => {
    const packet: Packet = { answers: [{ type: "A", class: "IN", name: ".", data: "0.0.0.0" }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,4,0,0,0,0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 10, flags: 0x01 }', () => {
    const packet: Packet = { id: 10, flags: 0x01 };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,10,0,1,0,0,0,0,0,0,0,0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { questions: [{ type: "MX", class: "IN", name: "example.com" }] }', () => {
    const packet: Packet = { questions: [{ type: "MX", class: "IN", name: "example.com" }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,1,0,0,0,0,0,0,7,101,120,97,109,112,108,101,3,99,111,109,0,0,15,0,1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 20, flags: 0x02, questions: [{ type: "CNAME", class: "IN", name: "www.example.com" }] }', () => {
    const packet: Packet = { id: 20, flags: 0x02, questions: [{ type: "CNAME", class: "IN", name: "www.example.com" }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,20,0,2,0,1,0,0,0,0,0,0,3,119,119,119,7,101,120,97,109,112,108,101,3,99,111,109,0,0,5,0,1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 30, flags: 0x03, answers: [{ type: "TXT", class: "IN", name: "example.com", data: "v=spf1 include:_spf.google.com ~all" }] }', () => {
    const packet: Packet = { id: 30, flags: 0x03, answers: [{ type: "TXT", class: "IN", name: "example.com", data: "v=spf1 include:_spf.google.com ~all" }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,30,0,3,0,0,0,1,0,0,0,0,7,101,120,97,109,112,108,101,3,99,111,109,0,0,16,0,1,0,0,0,0,0,36,35,118,61,115,112,102,49,32,105,110,99,108,117,100,101,58,95,115,112,102,46,103,111,111,103,108,101,46,99,111,109,32,126,97,108,108]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 40, flags: 0x04, questions: [{ type: "AAAA", class: "IN", name: "ipv6.example.com" }] }', () => {
    const packet: Packet = { id: 40, flags: 0x04, questions: [{ type: "AAAA", class: "IN", name: "ipv6.example.com" }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,40,0,4,0,1,0,0,0,0,0,0,4,105,112,118,54,7,101,120,97,109,112,108,101,3,99,111,109,0,0,28,0,1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 50, flags: 0x05, answers: [{ type: "SRV", class: "IN", name: "service.example.com", data: { priority: 10, weight: 5, port: 80, target: "target.example.com" } }] }', () => {
    const packet: Packet = { id: 50, flags: 0x05, answers: [{ type: "SRV", class: "IN", name: "service.example.com", data: { priority: 10, weight: 5, port: 80, target: "target.example.com" } }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,50,0,5,0,0,0,1,0,0,0,0,7,115,101,114,118,105,99,101,7,101,120,97,109,112,108,101,3,99,111,109,0,0,33,0,1,0,0,0,0,0,26,0,10,0,5,0,80,6,116,97,114,103,101,116,7,101,120,97,109,112,108,101,3,99,111,109,0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with empty questions array', () => {
    const packet: Packet = { questions: [] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with multiple questions', () => {
    const packet: Packet = { questions: [{ type: "A", class: "IN", name: "example.com" }, { type: "AAAA", class: "IN", name: "ipv6.example.com" }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,2,0,0,0,0,0,0,7,101,120,97,109,112,108,101,3,99,111,109,0,0,1,0,1,4,105,112,118,54,7,101,120,97,109,112,108,101,3,99,111,109,0,0,28,0,1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with multiple answers', () => {
    const packet: Packet = { answers: [{ type: "A", class: "IN", name: "example.com", data: "1.2.3.4" }, { type: "AAAA", class: "IN", name: "ipv6.example.com", data: "2001:db8::1" }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,0,0,2,0,0,0,0,7,101,120,97,109,112,108,101,3,99,111,109,0,0,1,0,1,0,0,0,0,0,4,1,2,3,4,4,105,112,118,54,7,101,120,97,109,112,108,101,3,99,111,109,0,0,28,0,1,0,0,0,0,0,16,32,1,13,184,0,0,0,0,0,0,0,0,0,0,0,1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with mixed questions and answers', () => {
    const packet: Packet = { questions: [{ type: "A", class: "IN", name: "example.com" }], answers: [{ type: "A", class: "IN", name: "example.com", data: "1.2.3.4" }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,1,0,1,0,0,0,0,7,101,120,97,109,112,108,101,3,99,111,109,0,0,1,0,1,7,101,120,97,109,112,108,101,3,99,111,109,0,0,1,0,1,0,0,0,0,0,4,1,2,3,4]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with large id and flags', () => {
    const packet: Packet = { id: 65535, flags: 0xFFFF };

    const encoded = encode(packet);
    const buffer = Buffer.from([255,255,127,255,0,0,0,0,0,0,0,0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with no id and flags', () => {
    const packet: Packet = { id: undefined, flags: undefined };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with single question and no answers', () => {
    const packet: Packet = { questions: [{ type: "A", class: "IN", name: "example.com" }], answers: [] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,1,0,0,0,0,0,0,7,101,120,97,109,112,108,101,3,99,111,109,0,0,1,0,1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with single answer and no questions', () => {
    const packet: Packet = { questions: [], answers: [{ type: "A", class: "IN", name: "example.com", data: "1.2.3.4" }] };

    const encoded = encode(packet);
    const buffer = Buffer.from([0,0,0,0,0,0,0,1,0,0,0,0,7,101,120,97,109,112,108,101,3,99,111,109,0,0,1,0,1,0,0,0,0,0,4,1,2,3,4]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encode this', () => {
    const packet = {"id":35869,"type":"response","flags":384,"questions":[{"name":"_dns.resolver.arpa","type":"UNKNOWN_64","class":"IN"}],"answers":[{"name":"_dns.resolver.arpa","type":"UNKNOWN_64","ttl":86400,"class":"IN","flush":false,"data":{"type":"Buffer","data":[0,1,3,100,110,115,6,103,111,111,103,108,101,0,0,1,0,4,3,100,111,116]}},{"name":"_dns.resolver.arpa","type":"UNKNOWN_64","ttl":86400,"class":"IN","flush":false,"data":{"type":"Buffer","data":[0,2,3,100,110,115,6,103,111,111,103,108,101,0,0,1,0,6,2,104,50,2,104,51,0,7,0,16,47,100,110,115,45,113,117,101,114,121,123,63,100,110,115,125]}}],"additionals":[{"type":"OPT","name":".","ednsVersion":0,"flag_do":true}]};
    const buffer = encode(packet);

    console.log(buffer);
});
