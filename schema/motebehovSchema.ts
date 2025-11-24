import { union, object, literal, boolean, z, string } from "zod";

const skjemaType = union([literal("MELD_BEHOV"), literal("SVAR_BEHOV")]);

const motebehov = object({
    id: string(),
    // This app doesn't need to know more about motebehov.
});

export const motebehovStatusSchema = object({
    visMotebehov: boolean(),
    skjemaType: skjemaType,
    motebehov: motebehov.nullable(),
});

export type MotebehovStatusDTO = z.infer<typeof motebehovStatusSchema>;
