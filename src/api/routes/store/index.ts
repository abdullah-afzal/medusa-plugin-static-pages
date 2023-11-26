import { Router } from "express";
import { wrapHandler } from "@medusajs/medusa";
import { getPageByIdOrHandle, getPages } from "../handlers/page-handlers";

const pageRouter = Router();
export function attachStoreRoutes(storeRouter: Router) {
  storeRouter.use("/pages", pageRouter);
  pageRouter.get("/", wrapHandler(getPages));
  pageRouter.get("/:identifier", wrapHandler(getPageByIdOrHandle));
}
