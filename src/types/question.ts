import { RecordType } from "@/types/common";

export type RecordClass = "IN" | "CS" | "CH" | "HS" | "ANY";

export interface Question {
    type: RecordType;
    name: string;
    class?: RecordClass | undefined;
}
