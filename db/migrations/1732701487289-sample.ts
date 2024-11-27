import { MigrationInterface, QueryRunner } from "typeorm";

export class Sample1732701487289 implements MigrationInterface {
    name = 'Sample1732701487289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar NOT NULL, "categoryId" varchar, "organizationId" varchar NOT NULL, "chemicalId" varchar, CONSTRAINT "UQ_7c453dce19d37ae0e4ecbd10709" UNIQUE ("name"), CONSTRAINT "FK_460349e27a26afd588e6154f457" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId", "chemicalId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId", "chemicalId" FROM "sample"`);
        await queryRunner.query(`DROP TABLE "sample"`);
        await queryRunner.query(`ALTER TABLE "temporary_sample" RENAME TO "sample"`);
        await queryRunner.query(`CREATE TABLE "temporary_sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "organizationId" varchar NOT NULL, "chemicalId" varchar, CONSTRAINT "UQ_7c453dce19d37ae0e4ecbd10709" UNIQUE ("name"), CONSTRAINT "FK_460349e27a26afd588e6154f457" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "organizationId", "chemicalId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "organizationId", "chemicalId" FROM "sample"`);
        await queryRunner.query(`DROP TABLE "sample"`);
        await queryRunner.query(`ALTER TABLE "temporary_sample" RENAME TO "sample"`);
        await queryRunner.query(`CREATE TABLE "temporary_technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "categoryId" varchar, CONSTRAINT "UQ_5d139614e54288d7c6028b95658" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_technique"("id", "name", "description") SELECT "id", "name", "description" FROM "technique"`);
        await queryRunner.query(`DROP TABLE "technique"`);
        await queryRunner.query(`ALTER TABLE "temporary_technique" RENAME TO "technique"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name", "description") SELECT "id", "name", "description" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
        await queryRunner.query(`CREATE TABLE "temporary_technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "categoryId" varchar, CONSTRAINT "UQ_5d139614e54288d7c6028b95658" UNIQUE ("name"), CONSTRAINT "FK_1be58fc39773833517f7ed2018d" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_technique"("id", "name", "description", "categoryId") SELECT "id", "name", "description", "categoryId" FROM "technique"`);
        await queryRunner.query(`DROP TABLE "technique"`);
        await queryRunner.query(`ALTER TABLE "temporary_technique" RENAME TO "technique"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"), CONSTRAINT "FK_69637758cc1080caba1b92ebb3c" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name", "description", "chemicalId") SELECT "id", "name", "description", "chemicalId" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "category"("id", "name", "description", "chemicalId") SELECT "id", "name", "description", "chemicalId" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`ALTER TABLE "technique" RENAME TO "temporary_technique"`);
        await queryRunner.query(`CREATE TABLE "technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "categoryId" varchar, CONSTRAINT "UQ_5d139614e54288d7c6028b95658" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "technique"("id", "name", "description", "categoryId") SELECT "id", "name", "description", "categoryId" FROM "temporary_technique"`);
        await queryRunner.query(`DROP TABLE "temporary_technique"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "category"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`ALTER TABLE "technique" RENAME TO "temporary_technique"`);
        await queryRunner.query(`CREATE TABLE "technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_5d139614e54288d7c6028b95658" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "technique"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_technique"`);
        await queryRunner.query(`DROP TABLE "temporary_technique"`);
        await queryRunner.query(`ALTER TABLE "sample" RENAME TO "temporary_sample"`);
        await queryRunner.query(`CREATE TABLE "sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar NOT NULL, "categoryId" varchar, "organizationId" varchar NOT NULL, "chemicalId" varchar, CONSTRAINT "UQ_7c453dce19d37ae0e4ecbd10709" UNIQUE ("name"), CONSTRAINT "FK_460349e27a26afd588e6154f457" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "organizationId", "chemicalId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "organizationId", "chemicalId" FROM "temporary_sample"`);
        await queryRunner.query(`DROP TABLE "temporary_sample"`);
        await queryRunner.query(`ALTER TABLE "sample" RENAME TO "temporary_sample"`);
        await queryRunner.query(`CREATE TABLE "sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar NOT NULL, "categoryId" varchar, "organizationId" varchar NOT NULL, "chemicalId" varchar, CONSTRAINT "UQ_7c453dce19d37ae0e4ecbd10709" UNIQUE ("name"), CONSTRAINT "FK_460349e27a26afd588e6154f457" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_885ee312ba08566765412f5c246" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId", "chemicalId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId", "chemicalId" FROM "temporary_sample"`);
        await queryRunner.query(`DROP TABLE "temporary_sample"`);
    }

}
