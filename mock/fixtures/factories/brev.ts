import { leggTilDagerPaDato } from "@src/utils/dateUtils";
import type { BrevDocumentComponentDTO, BrevDTO } from "../../../schema/brevSchema.ts";

export const createDocumentComponent = (props?: Partial<BrevDocumentComponentDTO>): BrevDocumentComponentDTO => {
    return {
        type: "PARAGRAPH",
        title: "TEST_HEADER",
        texts: ["Test_text_1", "Test_text_2"],
        key: "ARBEIDSRETTET_REHABILITERING",
        ...props,
    };
};

export const createInnkallingsBrev = (props?: Partial<BrevDTO>): BrevDTO => {
    const defaultDate = leggTilDagerPaDato(new Date(), -7).toISOString();

    return {
        uuid: "brev_uuid",
        deltakerUuid: "deltaker_uuid",
        createdAt: props?.createdAt || defaultDate,
        brevType: "INNKALT",
        digitalt: true,
        fritekst: "Her kommer det en fritekst",
        sted: "sted-felt",
        tid: props?.createdAt || defaultDate,
        videoLink: "videolenke-felt",
        document: [createDocumentComponent(), createDocumentComponent()],
        virksomhetsnummer: "virksomhetsnummer-felt",
        lestDato: null,
        svar: null,
        ...props,
    };
};

export const createEndringsBrev = (props?: Partial<BrevDTO>): BrevDTO => {
    return {
        ...createInnkallingsBrev({ brevType: "NYTT_TID_STED" }),
        ...props,
    };
};

export const createAvlysningsBrev = (props?: Partial<BrevDTO>): BrevDTO => {
    return {
        ...createInnkallingsBrev({ brevType: "AVLYST" }),
        ...props,
    };
};

export const createReferatBrev = (props?: Partial<BrevDTO>): BrevDTO => {
    const defaultDate = leggTilDagerPaDato(new Date(), -67).toISOString();
    const defaultDate2 = leggTilDagerPaDato(new Date(), -77).toISOString();

    return {
        ...createInnkallingsBrev(),
        brevType: "REFERAT",
        createdAt: props?.createdAt || defaultDate,
        tid: props?.createdAt || defaultDate2,
        ...props,
    };
};

export const createReferatEndretBrev = (props?: Partial<BrevDTO>): BrevDTO => {
    const defaultDate = leggTilDagerPaDato(new Date(), -87).toISOString();
    const defaultDate2 = leggTilDagerPaDato(new Date(), -97).toISOString();

    return {
        ...createInnkallingsBrev(),
        brevType: "REFERAT_ENDRET",
        createdAt: props?.createdAt || defaultDate,
        tid: props?.createdAt || defaultDate2,
        ...props,
    };
};
