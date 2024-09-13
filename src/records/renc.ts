import * as runknown from "@/records/runknown";
import * as rns from "@/records/rns";
import * as rsoa from "@/records/rsoa";
import * as rtxt from "@/records/rtxt";
import * as rnull from "@/records/rnull";
import * as rhinfo from "@/records/rhinfo";
import * as rptr from "@/records/rptr";
import * as rsrv from "@/records/rsrv";
import * as rcaa from "@/records/rcaa";
import * as rmx from "@/records/rmx";

import * as ra from "@/records/ra";
import * as raaaa from "@/records/raaaa";
import * as ropt from "@/records/ropt";
import * as rdnskey from "@/records/rdnskey";
import * as rrrsig from "@/records/rrrsig";
import * as rrp from "@/records/rrp";
import * as rnsec from "@/records/rnsec";
import * as rnsec3 from "@/records/rnsec3";
import * as rds from "@/records/rds";

export {
    runknown as unknown,
    rns as ns,
    rsoa as soa,
    rtxt as txt,
    rnull as null,
    rhinfo as hinfo,
    rptr as ptr,
    rptr as cname,
    rptr as dname,
    rsrv as srv,
    rcaa as caa,
    rmx as mx,
    ra as a,
    raaaa as aaaa,
    ropt as opt,
    rdnskey as dnskey,
    rrrsig as rrsig,
    rrp as rp,
    rnsec as nsec,
    rnsec3 as nsec3,
    rds as ds,
};

export function renc(type: string) {
    switch (type.toUpperCase()) {
        case "A":
            return ra;
        case "PTR":
            return rptr;
        case "CNAME":
            return rptr;
        case "DNAME":
            return rptr;
        case "TXT":
            return rtxt;
        case "NULL":
            return rnull;
        case "AAAA":
            return raaaa;
        case "SRV":
            return rsrv;
        case "HINFO":
            return rhinfo;
        case "CAA":
            return rcaa;
        case "NS":
            return rns;
        case "SOA":
            return rsoa;
        case "MX":
            return rmx;
        case "OPT":
            return ropt;
        case "DNSKEY":
            return rdnskey;
        case "RRSIG":
            return rrrsig;
        case "RP":
            return rrp;
        case "NSEC":
            return rnsec;
        case "NSEC3":
            return rnsec3;
        case "DS":
            return rds;
    }
    return runknown;
}
