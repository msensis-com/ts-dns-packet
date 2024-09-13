import { RecordClass } from "@/types/question";
import { OtherRecordType, StringRecordType } from "@/types/common";

interface OptCodes {
    OPTION_0: 0;
    LLQ: 1;
    UL: 2;
    NSID: 3;
    OPTION_4: 4;
    DAU: 5;
    DHU: 6;
    N3U: 7;
    CLIENT_SUBNET: 8;
    EXPIRE: 9;
    COOKIE: 10;
    TCP_KEEPALIVE: 11;
    PADDING: 12;
    CHAIN: 13;
    KEY_TAG: 14;
    DEVICEID: 26946;
    OPTION_65535: 65535;
}

type OptCodeType = keyof OptCodes;

type OptCode<K extends OptCodeType> = OptCodes[K];

interface GenericOpt<T extends OptCodeType> {
    code: OptCode<T>;

    type?: T | undefined;

    data?: Buffer | undefined;
}

interface ClientSubnetOpt extends GenericOpt<"CLIENT_SUBNET"> {
    family?: number | undefined;

    sourcePrefixLength?: number | undefined;

    scopePrefixLength?: number | undefined;

    ip: string | undefined;
}

interface KeepAliveOpt extends GenericOpt<"TCP_KEEPALIVE"> {
    timeout?: number | undefined;
}

interface PaddingOpt extends GenericOpt<"PADDING"> {
    length?: number | undefined;
}

interface TagOpt extends GenericOpt<"KEY_TAG"> {
    tags: number[];
}

export type PacketOpt = ClientSubnetOpt | KeepAliveOpt | PaddingOpt | TagOpt;

export interface OptAnswer extends GenericAnswer<"OPT"> {
    udpPayloadSize: number;

    extendedRcode: number;

    ednsVersion: number;

    flags: number;

    /**
     * Whether or not the DNS DO bit is set
     */
    flag_do: boolean;

    options: PacketOpt[];
}

export interface CaaData {
    issuerCritical?: boolean | undefined;

    flags?: number | undefined;

    tag: "issue" | "issuewild" | "iodef";

    value: string;
}

export interface DnskeyData {
    flags: number;

    algorithm: number;

    key: Buffer;
}

export interface DsData {
    keyTag: number;

    algorithm: number;

    digestType: number;

    digest: Buffer;
}

export interface HInfoData {
    cpu: string;

    os: string;
}

export interface MxData {
    preference?: number | undefined;

    exchange: string;
}

export interface NaptrData {
    order: number;

    preference: number;

    flags: string;

    services: string;

    regexp: string;

    replacement: string;
}

export interface NsecData {
    nextDomain: string;

    rrtypes: string[];
}

export interface Nsec3Data {
    algorithm: number;

    flags: number;

    iterations: number;

    salt: Buffer;

    nextDomain: Buffer;

    rrtypes: string[];
}

export interface RpData {
    mbox: string;

    txt: string;
}

export interface RrsigData {
    typeCovered: string;

    algorithm: number;

    labels: number;

    originalTTL: number;

    expiration: number;

    inception: number;

    keyTag: number;

    signersName: string;

    signature: Buffer;
}

export interface SrvData {
    port: number;

    target: string;

    priority?: number | undefined;

    weight?: number | undefined;
}

export interface SoaData {
    mname: string;

    rname: string;

    serial?: number | undefined;

    refresh?: number | undefined;

    retry?: number | undefined;

    expire?: number | undefined;

    minimum?: number | undefined;
}

export interface SshfpData {
    algorithm: number;

    hash: number;

    fingerprint: string;
}

export interface TlsaData {
    usage: number;

    selector: number;

    matchingType: number;

    certificate: Buffer;
}

export type TxtData = string | Buffer | Array<string | Buffer>;

export interface GenericAnswer<T> {
    type: T;

    name: string;
}

export interface BaseAnswer<T, D> extends GenericAnswer<T> {
    ttl?: number | undefined;

    class?: RecordClass | undefined;

    flush?: boolean | undefined;

    data: D;
}

export type StringAnswer = BaseAnswer<StringRecordType, string>;

export type BufferAnswer = BaseAnswer<OtherRecordType, Buffer>;

export type CaaAnswer = BaseAnswer<"CAA", CaaData>;

export type DnskeyAnswer = BaseAnswer<"DNSKEY", DnskeyData>;

export type DSAnswer = BaseAnswer<"DS", DsData>;

export type HInfoAnswer = BaseAnswer<"HINFO", HInfoData>;

export type MxAnswer = BaseAnswer<"MX", MxData>;

export type NaptrAnswer = BaseAnswer<"NAPTR", NaptrData>;

export type Nsec3Answer = BaseAnswer<"NSEC3", Nsec3Data>;

export type NsecAnswer = BaseAnswer<"NSEC", NsecData>;

export type RpAnswer = BaseAnswer<"RP", RpData>;

export type RrsigAnswer = BaseAnswer<"RRSIG", RrsigData>;

export type SoaAnswer = BaseAnswer<"SOA", SoaData>;

export type SrvAnswer = BaseAnswer<"SRV", SrvData>;

export type SshfpAnswer = BaseAnswer<"SSHFP", SshfpData>;

export type TlsaAnswer = BaseAnswer<"TLSA", TlsaData>;

export type TxtAnswer = BaseAnswer<"TXT", TxtData>;

export type Answer =
    | StringAnswer
    | BufferAnswer
    | CaaAnswer
    | DnskeyAnswer
    | DSAnswer
    | HInfoAnswer
    | MxAnswer
    | NaptrAnswer
    | Nsec3Answer
    | NsecAnswer
    | OptAnswer
    | RpAnswer
    | RrsigAnswer
    | SoaAnswer
    | SrvAnswer
    | SshfpAnswer
    | TlsaAnswer
    | TxtAnswer;
