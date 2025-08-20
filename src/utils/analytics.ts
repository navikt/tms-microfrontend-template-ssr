import { getAnalyticsInstance } from "@navikt/nav-dekoratoren-moduler";
import type { AmplitudeEvent } from "@navikt/nav-dekoratoren-moduler";

type ExtendedAmpltitudeEvent = AmplitudeEvent<'navigere', { lenketekst: string }>;

const analyticsLogger = getAnalyticsInstance<ExtendedAmpltitudeEvent>("tms-microfrontend-template-ssr");

export const logEvent = () => {
    analyticsLogger("navigere", { lenketekst: "tekst" });
};