import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { motebehovUtenSvar } from "./fixtures/dialogmote/motebehovUtenSvar.ts";
import { createAvlysningsBrev, createInnkallingsBrev } from "./fixtures/factories/brev.ts";
import { createReferatBrev, createReferatEndretBrev } from "./fixtures/factories/brev.ts";
import { leggTilDagerPaDato } from "@src/utils/dateUtils.ts";

const api = new Hono();

api.use("/*", cors({ origin: "http://localhost:4321", credentials: true }));

api.get("/api/dialogmote", (c) => {
  return c.json([
      createInnkallingsBrev({ createdAt: leggTilDagerPaDato(new Date(), -10).toISOString() }),
      createAvlysningsBrev({ createdAt: leggTilDagerPaDato(new Date(), -6).toISOString() }),
      createInnkallingsBrev({ createdAt: leggTilDagerPaDato(new Date(), -5).toISOString() }),
      createReferatBrev({ createdAt: leggTilDagerPaDato(new Date(), -4).toISOString() }),
      createInnkallingsBrev({ createdAt: leggTilDagerPaDato(new Date(), -3).toISOString() }),
      createReferatEndretBrev({ createdAt: leggTilDagerPaDato(new Date(), -103).toISOString() }),
  ]);
});

api.get("/api/motebehov", (c) => {
    return c.json(motebehovUtenSvar);
});

serve(api);