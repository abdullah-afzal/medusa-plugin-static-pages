import { Page } from "../models/page"
import { dataSource } from '@medusajs/medusa/dist/loaders/database'

export const PageRepository = dataSource.getRepository(Page)