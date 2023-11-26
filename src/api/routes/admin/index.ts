import { Router } from "express";
import { wrapHandler } from "@medusajs/medusa";
import {
  createPage,
  getPageByIdOrHandle,
  getPages,
  updatePage,
  deletePage,
} from "../handlers/page-handlers";

const pageRouter = Router();

export function attachAdminRoutes(adminRouter: Router) {
  adminRouter.use("/pages", pageRouter);
  pageRouter.get("/", wrapHandler(getPages));
  pageRouter.get("/:identifier", wrapHandler(getPageByIdOrHandle));
  pageRouter.post("/", wrapHandler(createPage));
  pageRouter.post("/:identifier/update", wrapHandler(updatePage));
  pageRouter.delete("/:identifier/delete", wrapHandler(deletePage));
}
