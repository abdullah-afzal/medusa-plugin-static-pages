import cors from "cors"
import configLoader from "@medusajs/medusa/dist/loaders/config"
import { Router } from "express"
import * as bodyParser from "body-parser"
import { MedusaError } from "@medusajs/utils"
import { z } from "zod"

export default (rootDirectory: string): Router | Router[] => {

   const config = configLoader(rootDirectory)
   const storeCorsOptions = { origin: config.projectConfig.store_cors.split(","), credentials: true, }
   const adminCorsOptions = { origin: config.projectConfig.admin_cors.split(","), credentials: true, }

   const router = Router()

   // GET ALL PAGES
   router.get("/store/pages", cors(storeCorsOptions), async (req, res) => {
      const pageService = req.scope.resolve("pageService")
      pageService.getPages().then((pages) => {
         return res.json(pages)
      })
   })


   // GET A SINGLE PAGE BY HANDLE
   router.get("/store/page/:handle", cors(storeCorsOptions), async (req, res) => {
      const pageService = req.scope.resolve("pageService")
      pageService.getPageByHandle(req.params.handle).then((page) => {
         return res.json(page)
      })
   })

   // GET A SINGLE PAGE BY ID
   router.get("/store/page/:id", cors(storeCorsOptions), async (req, res) => {
      const pageService = req.scope.resolve("pageService")
      pageService.getPageById(req.params.handle).then((page) => {
         return res.json(page)
      })
   })

   // ADD A PAGE
   router.use("/admin/page", bodyParser.json())
   router.post("/admin/page", cors(adminCorsOptions), async (req, res) => {
      const schema = z.object({
         handle: z.string().optional(),
         title: z.string().min(1),
         metadata: z.string().optional(),
         body: z.string().optional()
      })
      /* @ts-ignore */
      const { success, error, data } = schema.safeParse(req.body)
      if (!success) {
         throw new MedusaError(MedusaError.Types.INVALID_DATA, error)
      }
      const pageService = req.scope.resolve("pageService")
      pageService.addPage(data).then((page) => {
         return res.json(page)
      })
   })

   // UPDATE A PAGE
   router.use("/admin/page/:id", bodyParser.json())
   router.post("/admin/page/:id", cors(adminCorsOptions), async (req, res) => {
      const schema = z.object({
         handle: z.string().optional(),
         title: z.string().min(1),
         metadata: z.string().optional(),
         body: z.string().optional()
      })
      /* @ts-ignore */
      const { success, error, data } = schema.safeParse(req.body)
      if (!success) {
         throw new MedusaError(MedusaError.Types.INVALID_DATA, error)
      }
      const pageService = req.scope.resolve("pageService")
      pageService.updatePage(req.params.id, data).then((page) => {
         return res.json(page)
      })
   })

   // DELETE A PAGE
   router.delete("/admin/page/:id", cors(adminCorsOptions), async (req, res) => {
      const pageService = req.scope.resolve("pageService")
      pageService.deletePage(req.params.id).then(() => {
         return res.sendStatus(200)
      })
   })

   return router
}