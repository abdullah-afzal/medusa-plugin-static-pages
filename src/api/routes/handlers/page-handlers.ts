import { Request, Response } from "express";
import PageService from "../../../services/page";
import { Page } from "../../../models/page";
import type {   
  MedusaRequest,   
  MedusaResponse,  
 } from "@medusajs/medusa" 

export async function getPages(req: Request, res: Response) {
  const pageService: PageService = req.scope.resolve("pageService");
  const pages = await pageService.getPages();
  res.json({
    pages,
  });
}
 

export async function getPageByIdOrHandle(req: Request, res: Response) {
  const identifier = req.params.identifier as string;
  const pageService: PageService = req.scope.resolve("pageService");
  const page = await pageService.getPageByIdOrHandle(identifier);

  res.json({
    page,
  });
}

export async function createPage(req: Request, res: Response) {
  const payload = req.body as Page;
  const pageService: PageService = req.scope.resolve("pageService");
  const newPage=await pageService.addPage(payload);

  res.json({
    identifier:newPage.handle,
    message: "Page has been created successfully",
  });
}

export async function updatePage(req: Request, res: Response) {
  const identifier = req.params.identifier as string;
  const payload = req.body as Page;
  const pageService: PageService = req.scope.resolve("pageService");
  const updatedPage = await pageService.updatePage(identifier, payload);

  res.json({
    identifier:payload.handle,
    message: "Page has been updated successfully",
  });
}

export async function deletePage(req: Request, res: Response) {
  const identifier = req.params.identifier as string;
  const pageService: PageService = req.scope.resolve("pageService");
  await pageService.deletePage({handle:identifier});

  res.json({
    message: "Page has been deleted successfully",
  });
}
