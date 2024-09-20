import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1726819009460 implements MigrationInterface {
    name = 'NewMigration1726819009460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "material" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar, "categoryId" varchar, "organizationId" varchar)`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "contact" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "measurementId" varchar)`);
        await queryRunner.query(`CREATE TABLE "experiment" ("id" varchar PRIMARY KEY NOT NULL, "experiment_name" varchar NOT NULL, "material_name" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "instrument" varchar NOT NULL, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "measurementId" varchar)`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" varchar PRIMARY KEY NOT NULL, "parameters" varchar NOT NULL, "files" json NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "download" ("id" varchar PRIMARY KEY NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')), "measurementId" varchar, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "is_active" boolean NOT NULL DEFAULT (0), "created_date" datetime NOT NULL DEFAULT (datetime('now')), "preferred_username" varchar, "given_name" varchar, "family_name" varchar, "email" varchar, "user" json NOT NULL, "organizationId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar, "categoryId" varchar, "organizationId" varchar, CONSTRAINT "FK_0fb44e2a6abc57477a30b93629e" FOREIGN KEY ("materialId") REFERENCES "material" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_885ee312ba08566765412f5c246" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId" FROM "sample"`);
        await queryRunner.query(`DROP TABLE "sample"`);
        await queryRunner.query(`ALTER TABLE "temporary_sample" RENAME TO "sample"`);
        await queryRunner.query(`CREATE TABLE "temporary_technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "measurementId" varchar, CONSTRAINT "FK_22576812ebe42615a8eee1a9b55" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_technique"("id", "name", "description", "measurementId") SELECT "id", "name", "description", "measurementId" FROM "technique"`);
        await queryRunner.query(`DROP TABLE "technique"`);
        await queryRunner.query(`ALTER TABLE "temporary_technique" RENAME TO "technique"`);
        await queryRunner.query(`CREATE TABLE "temporary_experiment" ("id" varchar PRIMARY KEY NOT NULL, "experiment_name" varchar NOT NULL, "material_name" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "instrument" varchar NOT NULL, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "measurementId" varchar, CONSTRAINT "FK_efd004fa410567831df8dd764fb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b773f55f3d5afe549e96ddc2915" FOREIGN KEY ("sampleId") REFERENCES "sample" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a968dced2748a865538bcbfae7c" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cbef76a01cf016394c576315d19" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_experiment"("id", "experiment_name", "material_name", "create_at", "update_at", "instrument", "userId", "sampleId", "organizationId", "techniqueId", "measurementId") SELECT "id", "experiment_name", "material_name", "create_at", "update_at", "instrument", "userId", "sampleId", "organizationId", "techniqueId", "measurementId" FROM "experiment"`);
        await queryRunner.query(`DROP TABLE "experiment"`);
        await queryRunner.query(`ALTER TABLE "temporary_experiment" RENAME TO "experiment"`);
        await queryRunner.query(`CREATE TABLE "temporary_download" ("id" varchar PRIMARY KEY NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')), "measurementId" varchar, "userId" varchar, CONSTRAINT "FK_37a31c04601f9310746fcbc64c3" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9d13a8323fab9297788961ec6cc" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_download"("id", "timestamp", "measurementId", "userId") SELECT "id", "timestamp", "measurementId", "userId" FROM "download"`);
        await queryRunner.query(`DROP TABLE "download"`);
        await queryRunner.query(`ALTER TABLE "temporary_download" RENAME TO "download"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "is_active" boolean NOT NULL DEFAULT (0), "created_date" datetime NOT NULL DEFAULT (datetime('now')), "preferred_username" varchar, "given_name" varchar, "family_name" varchar, "email" varchar, "user" json NOT NULL, "organizationId" varchar, CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "is_active", "created_date", "preferred_username", "given_name", "family_name", "email", "user", "organizationId") SELECT "id", "is_active", "created_date", "preferred_username", "given_name", "family_name", "email", "user", "organizationId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "is_active" boolean NOT NULL DEFAULT (0), "created_date" datetime NOT NULL DEFAULT (datetime('now')), "preferred_username" varchar, "given_name" varchar, "family_name" varchar, "email" varchar, "user" json NOT NULL, "organizationId" varchar)`);
        await queryRunner.query(`INSERT INTO "user"("id", "is_active", "created_date", "preferred_username", "given_name", "family_name", "email", "user", "organizationId") SELECT "id", "is_active", "created_date", "preferred_username", "given_name", "family_name", "email", "user", "organizationId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "download" RENAME TO "temporary_download"`);
        await queryRunner.query(`CREATE TABLE "download" ("id" varchar PRIMARY KEY NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')), "measurementId" varchar, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "download"("id", "timestamp", "measurementId", "userId") SELECT "id", "timestamp", "measurementId", "userId" FROM "temporary_download"`);
        await queryRunner.query(`DROP TABLE "temporary_download"`);
        await queryRunner.query(`ALTER TABLE "experiment" RENAME TO "temporary_experiment"`);
        await queryRunner.query(`CREATE TABLE "experiment" ("id" varchar PRIMARY KEY NOT NULL, "experiment_name" varchar NOT NULL, "material_name" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "instrument" varchar NOT NULL, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "measurementId" varchar)`);
        await queryRunner.query(`INSERT INTO "experiment"("id", "experiment_name", "material_name", "create_at", "update_at", "instrument", "userId", "sampleId", "organizationId", "techniqueId", "measurementId") SELECT "id", "experiment_name", "material_name", "create_at", "update_at", "instrument", "userId", "sampleId", "organizationId", "techniqueId", "measurementId" FROM "temporary_experiment"`);
        await queryRunner.query(`DROP TABLE "temporary_experiment"`);
        await queryRunner.query(`ALTER TABLE "technique" RENAME TO "temporary_technique"`);
        await queryRunner.query(`CREATE TABLE "technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "measurementId" varchar)`);
        await queryRunner.query(`INSERT INTO "technique"("id", "name", "description", "measurementId") SELECT "id", "name", "description", "measurementId" FROM "temporary_technique"`);
        await queryRunner.query(`DROP TABLE "temporary_technique"`);
        await queryRunner.query(`ALTER TABLE "sample" RENAME TO "temporary_sample"`);
        await queryRunner.query(`CREATE TABLE "sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "form" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "materialId" varchar, "categoryId" varchar, "organizationId" varchar)`);
        await queryRunner.query(`INSERT INTO "sample"("id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId") SELECT "id", "name", "description", "form", "source", "note", "attachments", "images", "create_at", "update_at", "materialId", "categoryId", "organizationId" FROM "temporary_sample"`);
        await queryRunner.query(`DROP TABLE "temporary_sample"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "download"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`DROP TABLE "experiment"`);
        await queryRunner.query(`DROP TABLE "technique"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "sample"`);
        await queryRunner.query(`DROP TABLE "material"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
