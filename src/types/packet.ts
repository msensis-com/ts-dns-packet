import { Answer } from "@/types/answer";
import { Question } from "@/types/question";

export interface Packet {
    /**
     * Whether the packet is a query or a response. This field may be
     * omitted if it is clear from the context of usage what type of packet
     * it is.
     */

    type?: "query" | "response" | undefined;
    id?: number | undefined;

    /**
     * A bit-mask combination of zero or more of:
     * {@link Flags.AUTHORITATIVE_ANSWER},
     * {@link Flags.TRUNCATED_RESPONSE},
     * {@link Flags.RECURSION_DESIRED},
     * {@link Flags.RECURSION_AVAILABLE},
     * {@link Flags.AUTHENTIC_DATA},
     * {@link Flags.CHECKING_DISABLED}.
     */
    flags?: number | undefined;

    questions?: Question[] | undefined;
    answers?: Answer[] | undefined;
    additionals?: Answer[] | undefined;
    authorities?: Answer[] | undefined;
}

// https://github.com/mafintosh/dns-packet/blob/7b6662025c49c0e31d2f0c5cbd726e4423805639/index.js#L181-L197
export interface DecodedPacket extends Packet {
    flag_qr: boolean;

    flag_aa: boolean;

    flag_tc: boolean;

    flag_rd: boolean;
    flag_ra: boolean;
    flag_z: boolean;
    flag_ad: boolean;
    flag_cd: boolean;
}
