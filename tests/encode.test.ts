import {expect, test} from "vitest";
import {decode, encode, type Packet} from "../src";

test('encodes packet {}', () => {
    const packet: Packet = {};

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 5 }', () => {
    const packet: Packet = {id: 5};

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { questions: [{ type: "A", class: "IN", name: "." }] }', () => {
    const packet: Packet = {questions: [{type: "A", class: "IN", name: "."}]};

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { answers: [{ type: "A", class: "IN", name: ".", data: "0.0.0.0" }] }', () => {
    const packet: Packet = {
        answers: [{
            type: "A",
            class: "IN",
            name: ".",
            data: "0.0.0.0"
        }]
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 10, flags: 0x01 }', () => {
    const packet: Packet = {id: 10, flags: 0x01};

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 10, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { questions: [{ type: "MX", class: "IN", name: "example.com" }] }', () => {
    const packet: Packet = {questions: [{type: "MX", class: "IN", name: "example.com"}]};

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 15, 0, 1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 20, flags: 0x02, questions: [{ type: "CNAME", class: "IN", name: "www.example.com" }] }', () => {
    const packet: Packet = {
        id: 20,
        flags: 0x02,
        questions: [{type: "CNAME", class: "IN", name: "www.example.com"}]
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 20, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 3, 119, 119, 119, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 5, 0, 1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 30, flags: 0x03, answers: [{ type: "TXT", class: "IN", name: "example.com", data: "v=spf1 include:_spf.google.com ~all" }] }', () => {
    const packet: Packet = {
        id: 30,
        flags: 0x03,
        answers: [{
            type: "TXT",
            class: "IN",
            name: "example.com",
            data: "v=spf1 include:_spf.google.com ~all"
        }]
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 30, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 16, 0, 1, 0, 0, 0, 0, 0, 36, 35, 118, 61, 115, 112, 102, 49, 32, 105, 110, 99, 108, 117, 100, 101, 58, 95, 115, 112, 102, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109, 32, 126, 97, 108, 108]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 40, flags: 0x04, questions: [{ type: "AAAA", class: "IN", name: "ipv6.example.com" }] }', () => {
    const packet: Packet = {
        id: 40,
        flags: 0x04,
        questions: [{type: "AAAA", class: "IN", name: "ipv6.example.com"}]
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 40, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 4, 105, 112, 118, 54, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 28, 0, 1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet { id: 50, flags: 0x05, answers: [{ type: "SRV", class: "IN", name: "service.example.com", data: { priority: 10, weight: 5, port: 80, target: "target.example.com" } }] }', () => {
    const packet: Packet = {
        id: 50,
        flags: 0x05,
        answers: [{
            type: "SRV",
            class: "IN",
            name: "service.example.com",
            data: {priority: 10, weight: 5, port: 80, target: "target.example.com"}
        }]
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 50, 0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 7, 115, 101, 114, 118, 105, 99, 101, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 33, 0, 1, 0, 0, 0, 0, 0, 26, 0, 10, 0, 5, 0, 80, 6, 116, 97, 114, 103, 101, 116, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with empty questions array', () => {
    const packet: Packet = {questions: []};

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with multiple questions', () => {
    const packet: Packet = {
        questions: [{
            type: "A",
            class: "IN",
            name: "example.com"
        }, {type: "AAAA", class: "IN", name: "ipv6.example.com"}]
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 4, 105, 112, 118, 54, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 28, 0, 1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with multiple answers', () => {
    const packet: Packet = {
        answers: [{
            type: "A",
            class: "IN",
            name: "example.com",
            data: "1.2.3.4"
        }, {type: "AAAA", class: "IN", name: "ipv6.example.com", data: "2001:db8::1"}]
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4, 4, 105, 112, 118, 54, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 28, 0, 1, 0, 0, 0, 0, 0, 16, 32, 1, 13, 184, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with mixed questions and answers', () => {
    const packet: Packet = {
        questions: [{type: "A", class: "IN", name: "example.com"}],
        answers: [{type: "A", class: "IN", name: "example.com", data: "1.2.3.4"}]
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with large id and flags', () => {
    const packet: Packet = {id: 65535, flags: 0xFFFF};

    const encoded = encode(packet);
    const buffer = Buffer.from([255, 255, 127, 255, 0, 0, 0, 0, 0, 0, 0, 0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with no id and flags', () => {
    const packet: Packet = {id: undefined, flags: undefined};

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with single question and no answers', () => {
    const packet: Packet = {
        questions: [{type: "A", class: "IN", name: "example.com"}],
        answers: []
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encodes packet with single answer and no questions', () => {
    const packet: Packet = {
        questions: [],
        answers: [{type: "A", class: "IN", name: "example.com", data: "1.2.3.4"}]
    };

    const encoded = encode(packet);
    const buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 99, 111, 109, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4]);

    expect(encoded).toStrictEqual(buffer);
    expect(encode(decode(encoded))).toStrictEqual(buffer);
});

test('encode this', () => {
    const packet = {
        "id": 35869,
        "type": "response",
        "flags": 384,
        "questions": [{
            "name": "_dns.resolver.arpa",
            "type": "UNKNOWN_64",
            "class": "IN"
        }],
        "answers": [{
            "name": "_dns.resolver.arpa",
            "type": "UNKNOWN_64",
            "ttl": 86400,
            "class": "IN",
            "flush": false,
            "data": Buffer.from([0, 1, 3, 100, 110, 115, 6, 103, 111, 111, 103, 108, 101, 0, 0, 1, 0, 4, 3, 100, 111, 116])
        }, {
            "name": "_dns.resolver.arpa",
            "type": "UNKNOWN_64",
            "ttl": 86400,
            "class": "IN",
            "flush": false,
            "data": Buffer.from([0, 2, 3, 100, 110, 115, 6, 103, 111, 111, 103, 108, 101, 0, 0, 1, 0, 6, 2, 104, 50, 2, 104, 51, 0, 7, 0, 16, 47, 100, 110, 115, 45, 113, 117, 101, 114, 121, 123, 63, 100, 110, 115, 125])
        }],
        "additionals": [{"type": "OPT", "name": ".", "ednsVersion": 0, "flag_do": true}]
    };
    encode(packet);
});


test('encode that', () => {
    const packet = {"id":9117,"type":"response","flags":416,"questions":[{"name":"dkim3.mcsv.net","type":"TXT","class":"IN"}],"answers":[{"name":"dkim3.mcsv.net","type":"TXT","ttl":11882,"class":"IN","flush":false,"data":[{"type":"Buffer","data":[118,61,68,75,73,77,49,59,32,107,61,114,115,97,59,32,112,61,77,73,73,66,73,106,65,78,66,103,107,113,104,107,105,71,57,119,48,66,65,81,69,70,65,65,79,67,65,81,56,65,77,73,73,66,67,103,75,67,65,81,69,65,115,89,71,105,77,83,110,55,102,115,85,113,83,118,102,83,88,52,48,120,57,82,49,79,108,82,116,98,78,105,67,89,56,48,108,72,82,73,108,99,75,120,51,88,68,73,82,55,50,53,55,97,85,120,43,113,57,67,83,73,65,82,100,102,84,76,54,75,67,117,76,71,78,70,120,53,103,57,84,103,86,114,54,112,110,103,52,97,106,99,105,101,83,81,71,116,79,101,104,66,103,120,110,107,68,78,56,97,65,65,53,84,88,48,70,109,70,114,99,101,102,74,85,48,74,111,120,76,79,70,48,57,69,75,103,88,120,104,83,83,72,67,107,47,101,107,86,98,48,80,88,83,98,111,72,88,111,90,57,43,69,73,52,48,52,70,49,113,104,99,119,88,88,73,103,72,88,84,97,85,116,104,72,84,117,116,50,80,54,66,66,90,104]},{"type":"Buffer","data":[73,88,73,103,118,68,101,47,119,52,57,71,99,104,82,55,77,82,74,113,106,78,98,55,110,101,69,66,98,89,72,98,103,87,117,66,84,118,118,72,67,103,55,71,121,54,109,54,110,57,107,114,89,75,43,82,79,87,113,51,100,86,118,88,121,57,112,108,65,71,75,51,121,103,77,43,72,116,106,73,105,77,116,55,97,114,82,71,77,79,70,48,87,103,68,84,122,55,89,100,78,57,66,71,112,116,54,66,118,88,120,76,110,106,105,81,99,103,83,53,84,57,110,43,99,73,121,80,90,103,105,87,122,68,77,88,78,108,97,69,69,100,75,84,69,75,120,114,119,73,68,65,81,65,66,59]}]}],"additionals":[{"type":"OPT","name":".","ednsVersion":0,"flag_do":true}]};

    encode(packet);
});

test('encode this 2', () => {
    const packet = {"id":29059,"type":"response","flags":432,"questions":[{"name":".","type":"DNSKEY","class":"IN"}],"answers":[{"name":".","type":"DNSKEY","ttl":9035,"class":"IN","flush":false,"data":{"flags":256,"algorithm":8,"key":{"type":"Buffer","data":[3,1,0,1,205,18,186,118,199,117,45,10,20,76,153,109,130,8,255,235,115,178,179,115,35,11,171,43,25,137,3,237,31,132,6,37,76,240,63,228,186,204,26,65,132,170,251,238,127,51,52,195,240,154,86,215,102,229,229,164,101,132,28,178,132,138,79,150,242,115,29,2,226,60,103,44,70,247,102,38,84,65,42,174,214,181,156,40,97,117,126,63,198,200,53,139,144,235,187,107,152,119,122,95,160,62,104,37,143,254,37,225,93,245,186,3,88,126,166,42,243,139,194,7,237,195,233,42,29,173,223,188,228,172,168,158,124,214,39,199,18,237,166,121,239,29,29,210,193,170,176,2,128,251,171,81,156,133,227,84,213,94,237,26,57,196,155,179,240,132,123,172,236,93,205,251,145,46,184,141,249,157,52,16,189,212,228,78,236,245,34,18,83,248,67,135,180,59,55,189,22,214,98,204,115,90,54,250,208,145,26,49,22,175,14,48,152,37,140,205,205,100,122,6,203,17,47,221,80,229,133,188,248,201,207,79,128,17,229,131,133,221,134,170,213,228,211,96,115,2,23,95,120,128,4,34,254,188,21,59]}}},{"name":".","type":"DNSKEY","ttl":9035,"class":"IN","flush":false,"data":{"flags":257,"algorithm":8,"key":{"type":"Buffer","data":[3,1,0,1,172,255,180,9,188,201,57,248,49,247,161,229,236,136,247,165,146,85,236,83,4,11,228,50,2,115,144,164,206,137,109,111,144,134,243,197,225,119,251,254,17,129,99,170,236,122,241,70,44,71,148,89,68,196,226,192,38,190,94,152,187,205,237,37,151,130,114,225,227,224,121,197,9,77,87,63,14,131,201,47,2,179,45,53,19,177,85,11,130,105,41,200,13,208,249,44,172,150,109,23,118,159,213,134,123,100,124,63,56,2,154,189,196,129,82,235,143,32,113,89,236,197,210,50,199,193,83,124,121,244,183,172,40,255,17,104,47,33,104,27,246,214,171,165,85,3,43,246,249,240,54,190,178,170,165,179,119,141,110,235,251,166,191,158,161,145,190,74,176,202,234,117,158,47,119,58,31,144,41,199,62,203,141,87,53,185,50,29,176,133,241,184,226,216,3,143,226,148,25,146,84,140,238,13,103,221,69,71,225,29,214,58,249,201,252,28,84,102,251,104,76,240,9,215,25,124,44,247,158,121,42,181,1,230,168,161,202,81,154,242,203,155,95,99,103,233,76,13,71,80,36,81,53,123,225,181]}}},{"name":".","type":"DNSKEY","ttl":9035,"class":"IN","flush":false,"data":{"flags":256,"algorithm":8,"key":{"type":"Buffer","data":[3,1,0,1,212,162,203,171,44,149,138,220,101,33,156,184,193,10,224,59,68,240,54,89,99,80,52,242,64,44,190,32,3,227,219,104,113,131,185,155,126,192,188,131,178,205,232,138,5,107,143,184,158,38,246,238,71,162,112,140,254,123,113,146,86,74,96,92,140,126,219,252,94,132,112,110,37,221,165,40,223,118,147,71,136,198,19,77,93,168,13,67,76,141,210,197,156,94,135,97,38,56,243,26,207,109,235,208,57,134,192,20,97,233,198,167,23,1,4,244,248,22,129,136,12,119,46,206,165,92,20,55,254,20,149,58,154,239,13,98,66,66,34,54,57,63,189,250,198,138,45,215,82,33,126,131,193,53,114,209,46,83,225,134,56,16,104,57,71,119,63,120,165,27,219,255,23,128,165,148,206,83,136,102,197,64,101,149,18,76,165,180,181,126,120,113,192,0,44,238,198,174,251,49,252,213,186,218,55,53,198,254,176,88,5,232,112,225,21,128,30,254,224,188,219,238,175,105,230,141,244,250,198,40,26,147,172,42,1,111,49,44,184,160,38,83,64,196,49,217,40,221,252,209,182,108,195,48,234,115]}}}],"additionals":[{"type":"OPT","name":".","ednsVersion":0,"flag_do":true}]};
    encode(packet)
});
