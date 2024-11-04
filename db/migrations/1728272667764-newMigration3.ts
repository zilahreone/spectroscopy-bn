import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration31728272667764 implements MigrationInterface {
    name = 'NewMigration31728272667764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "measurementId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_technique"("id", "name", "description", "measurementId") SELECT "id", "name", "description", "measurementId" FROM "technique"`);
        await queryRunner.query(`DROP TABLE "technique"`);
        await queryRunner.query(`ALTER TABLE "temporary_technique" RENAME TO "technique"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name", "description") SELECT "id", "name", "description" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
        await queryRunner.query(`CREATE TABLE "temporary_material" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_material"("id", "name", "description") SELECT "id", "name", "description" FROM "material"`);
        await queryRunner.query(`DROP TABLE "material"`);
        await queryRunner.query(`ALTER TABLE "temporary_material" RENAME TO "material"`);
        await queryRunner.query(`CREATE TABLE "temporary_sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar, "categoryId" varchar, "organizationId" varchar, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_885ee312ba08566765412f5c246" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0fb44e2a6abc57477a30b93629e" FOREIGN KEY ("materialId") REFERENCES "material" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId" FROM "sample"`);
        await queryRunner.query(`DROP TABLE "sample"`);
        await queryRunner.query(`ALTER TABLE "temporary_sample" RENAME TO "sample"`);
        await queryRunner.query(`CREATE TABLE "temporary_organization" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "contact" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_organization"("id", "name", "description", "contact") SELECT "id", "name", "description", "contact" FROM "organization"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`ALTER TABLE "temporary_organization" RENAME TO "organization"`);
        await queryRunner.query(`CREATE TABLE "temporary_technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_technique"("id", "name", "description") SELECT "id", "name", "description" FROM "technique"`);
        await queryRunner.query(`DROP TABLE "technique"`);
        await queryRunner.query(`ALTER TABLE "temporary_technique" RENAME TO "technique"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name", "description") SELECT "id", "name", "description" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
        await queryRunner.query(`CREATE TABLE "temporary_material" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_c1cd67c1666f87e5151dcfa9f23" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_material"("id", "name", "description") SELECT "id", "name", "description" FROM "material"`);
        await queryRunner.query(`DROP TABLE "material"`);
        await queryRunner.query(`ALTER TABLE "temporary_material" RENAME TO "material"`);
        await queryRunner.query(`CREATE TABLE "temporary_sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar, "categoryId" varchar, "organizationId" varchar, CONSTRAINT "UQ_7c453dce19d37ae0e4ecbd10709" UNIQUE ("name"), CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_885ee312ba08566765412f5c246" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0fb44e2a6abc57477a30b93629e" FOREIGN KEY ("materialId") REFERENCES "material" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId" FROM "sample"`);
        await queryRunner.query(`DROP TABLE "sample"`);
        await queryRunner.query(`ALTER TABLE "temporary_sample" RENAME TO "sample"`);
        await queryRunner.query(`CREATE TABLE "temporary_technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_5d139614e54288d7c6028b95658" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_technique"("id", "name", "description") SELECT "id", "name", "description" FROM "technique"`);
        await queryRunner.query(`DROP TABLE "technique"`);
        await queryRunner.query(`ALTER TABLE "temporary_technique" RENAME TO "technique"`);
        await queryRunner.query(`CREATE TABLE "temporary_organization" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "contact" varchar NOT NULL, CONSTRAINT "UQ_28639366e2fa1aefe6b80b42be9" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_organization"("id", "name", "description", "contact") SELECT "id", "name", "description", "contact" FROM "organization"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`ALTER TABLE "temporary_organization" RENAME TO "organization"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" RENAME TO "temporary_organization"`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "contact" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "organization"("id", "name", "description", "contact") SELECT "id", "name", "description", "contact" FROM "temporary_organization"`);
        await queryRunner.query(`DROP TABLE "temporary_organization"`);
        await queryRunner.query(`ALTER TABLE "technique" RENAME TO "temporary_technique"`);
        await queryRunner.query(`CREATE TABLE "technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "technique"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_technique"`);
        await queryRunner.query(`DROP TABLE "temporary_technique"`);
        await queryRunner.query(`ALTER TABLE "sample" RENAME TO "temporary_sample"`);
        await queryRunner.query(`CREATE TABLE "sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar, "categoryId" varchar, "organizationId" varchar, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_885ee312ba08566765412f5c246" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0fb44e2a6abc57477a30b93629e" FOREIGN KEY ("materialId") REFERENCES "material" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId" FROM "temporary_sample"`);
        await queryRunner.query(`DROP TABLE "temporary_sample"`);
        await queryRunner.query(`ALTER TABLE "material" RENAME TO "temporary_material"`);
        await queryRunner.query(`CREATE TABLE "material" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "material"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_material"`);
        await queryRunner.query(`DROP TABLE "temporary_material"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "category"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`ALTER TABLE "technique" RENAME TO "temporary_technique"`);
        await queryRunner.query(`CREATE TABLE "technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "measurementId" varchar)`);
        await queryRunner.query(`INSERT INTO "technique"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_technique"`);
        await queryRunner.query(`DROP TABLE "temporary_technique"`);
        await queryRunner.query(`ALTER TABLE "organization" RENAME TO "temporary_organization"`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "contact" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "organization"("id", "name", "description", "contact") SELECT "id", "name", "description", "contact" FROM "temporary_organization"`);
        await queryRunner.query(`DROP TABLE "temporary_organization"`);
        await queryRunner.query(`ALTER TABLE "sample" RENAME TO "temporary_sample"`);
        await queryRunner.query(`CREATE TABLE "sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar, "categoryId" varchar, "organizationId" varchar, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_885ee312ba08566765412f5c246" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0fb44e2a6abc57477a30b93629e" FOREIGN KEY ("materialId") REFERENCES "material" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId" FROM "temporary_sample"`);
        await queryRunner.query(`DROP TABLE "temporary_sample"`);
        await queryRunner.query(`ALTER TABLE "material" RENAME TO "temporary_material"`);
        await queryRunner.query(`CREATE TABLE "material" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "material"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_material"`);
        await queryRunner.query(`DROP TABLE "temporary_material"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "category"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`ALTER TABLE "technique" RENAME TO "temporary_technique"`);
        await queryRunner.query(`CREATE TABLE "technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "measurementId" varchar, CONSTRAINT "FK_22576812ebe42615a8eee1a9b55" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "technique"("id", "name", "description", "measurementId") SELECT "id", "name", "description", "measurementId" FROM "temporary_technique"`);
        await queryRunner.query(`DROP TABLE "temporary_technique"`);
    }

}
