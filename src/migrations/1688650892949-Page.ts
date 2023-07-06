import { MigrationInterface, QueryRunner } from "typeorm";
export class Page1688650892949 implements MigrationInterface {
    name = 'Page1688650892949'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "page" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "handle" character varying NOT NULL, "title" character varying NOT NULL, "metadata" jsonb, "body" text, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0eceed6ff608a8794d8ef211f6" ON "page" ("handle") `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0eceed6ff608a8794d8ef211f6"`);
        await queryRunner.query(`DROP TABLE "page"`);
    }
}
