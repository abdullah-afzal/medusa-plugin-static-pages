import { TransactionBaseService } from '@medusajs/medusa'
import { PageRepository } from '../repositories/page'

export default class PageService extends TransactionBaseService {

	protected readonly pageRepository_: typeof PageRepository

	constructor({ pageRepository }) {
		super(arguments[0])
		this.pageRepository_ = pageRepository
	}

	async getPages() {
		/* @ts-ignore */
		const pageRepository = this.activeManager_.withRepository(this.pageRepository_)
		return await pageRepository.find()
	}	

	async getPageById(id) {
		/* @ts-ignore */
		const pageRepository = this.activeManager_.withRepository(this.pageRepository_)
		return await pageRepository.findOne({
			where: { id }
		})
	}

	async getPageByHandle(handle) {
		/* @ts-ignore */
		const pageRepository = this.activeManager_.withRepository(this.pageRepository_)
		return await pageRepository.findOne({
			where: { handle }
		})
	}

	async addPage(post) {
		const { handle, title, metadata, body } = post
		if (!handle || !title) throw new Error("Adding a page requires a unique handle and a title")
		
		/* @ts-ignore */
		const pageRepository = this.activeManager_.withRepository(this.pageRepository_)
		const createdPage = pageRepository.create({
			handle,
			title,
			metadata,
			body
		})
		const page = await pageRepository.save(createdPage)
		return page
	}
	
	async updatePage(id, post) {
		const { handle, title, metadata, body } = post
		if (!id || !handle || !title) throw new Error("Updating a page requires an id, a unique handle, and a title")
		/* @ts-ignore */
		const pageRepository = this.activeManager_.withRepository(this.pageRepository_)
		const existingPage = await pageRepository.findOne({ 
			where: { id } 
		})
		if (!existingPage) throw new Error("No page found with that id")
		existingPage.handle = handle
		existingPage.title = title
		existingPage.metadata = metadata
		existingPage.body = body	
		const page = await pageRepository.save(existingPage)
		return page
	}

	async deletePage(id) {
		if (!id) throw new Error("Deleting a page requires an id")
		/* @ts-ignore */
		const pageRepository = this.activeManager_.withRepository(this.pageRepository_)
		return await pageRepository.delete(id)
	}
}