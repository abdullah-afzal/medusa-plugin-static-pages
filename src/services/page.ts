import { TransactionBaseService, buildQuery, FindConfig, Selector } from "@medusajs/medusa";
import { PageRepository } from "../repositories/page";
import { Page } from "../models/page";

export default class PageService extends TransactionBaseService {
	protected readonly pageRepository_: typeof PageRepository;

	constructor({ pageRepository }) {
		super(arguments[0]);
		this.pageRepository_ = pageRepository;
	}

	async getPages() {
		const pageRepository = this.activeManager_.withRepository(
			this.pageRepository_
		);
		return await pageRepository.find();
	}

	async getPageByIdOrHandle(identifier: string) {
		const pageRepository = this.activeManager_.withRepository(this.pageRepository_);

		// Try to find by id
		const pageById = await pageRepository.findOne({
			where: { id: identifier },
		});

		// If found by id, return the result
		if (pageById) {
			return pageById;
		}

		// If not found by id, try to find by handle
		const pageByHandle = await pageRepository.findOne({
			where: { handle: identifier },
		});

		// Return the result, even if it's undefined
		return pageByHandle;
	}


	async addPage(payload: Page) {
		const { handle, title, metadata, body } = payload;
		if (!handle || !title)
			throw new Error("Adding a page requires a unique handle and a title");

		const pageRepository = this.activeManager_.withRepository(
			this.pageRepository_
		);
		const createdPage = pageRepository.create({
			handle,
			title,
			metadata,
			body,
		});
		const page = await pageRepository.save(createdPage);
		return page;
	}

	async updatePage(identifier: string, payload: Page) {
		const { handle, title, metadata, body } = payload;
		if (!identifier || !handle || !title)
			throw new Error(
				"Updating a page requires an id, a unique handle, and a title"
			);
		const pageRepository = this.activeManager_.withRepository(
			this.pageRepository_
		);
		const page = await pageRepository.update({ handle: identifier }, payload);
		return page;
	}

	async deletePage(identifier) {
		if (!identifier) throw new Error("Deleting a page requires an id");
		/* @ts-ignore */
		const pageRepository = this.activeManager_.withRepository(
			this.pageRepository_
		);
		return await pageRepository.delete(identifier);
	}
}