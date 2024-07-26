import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1721979291766 implements MigrationInterface {
    name = 'NewMigration1721979291766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_experiment" ("id" varchar PRIMARY KEY NOT NULL, "experiment_name" varchar NOT NULL, "chemical_name" varchar NOT NULL, "chemical_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "files" json NOT NULL, "others_attachments" json, "date_collection" varchar NOT NULL, "measurement_technique" varchar NOT NULL, "organization" varchar NOT NULL, "collected_by" varchar NOT NULL, "instrument" varchar NOT NULL, "type" varchar NOT NULL, "normalization" varchar NOT NULL, "createdById" varchar NOT NULL, "createdByName" varchar, "createdByPreferred_username" varchar NOT NULL, "createdByGiven_name" varchar, "createdByFamily_name" varchar, "createdByEmail" varchar NOT NULL, "colol" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_experiment"("id", "experiment_name", "chemical_name", "chemical_id", "created_at", "files", "others_attachments", "date_collection", "measurement_technique", "organization", "collected_by", "instrument", "type", "normalization", "createdById", "createdByName", "createdByPreferred_username", "createdByGiven_name", "createdByFamily_name", "createdByEmail") SELECT "id", "experiment_name", "chemical_name", "chemical_id", "created_at", "files", "others_attachments", "date_collection", "measurement_technique", "organization", "collected_by", "instrument", "type", "normalization", "createdById", "createdByName", "createdByPreferred_username", "createdByGiven_name", "createdByFamily_name", "createdByEmail" FROM "experiment"`);
        await queryRunner.query(`DROP TABLE "experiment"`);
        await queryRunner.query(`ALTER TABLE "temporary_experiment" RENAME TO "experiment"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experiment" RENAME TO "temporary_experiment"`);
        await queryRunner.query(`CREATE TABLE "experiment" ("id" varchar PRIMARY KEY NOT NULL, "experiment_name" varchar NOT NULL, "chemical_name" varchar NOT NULL, "chemical_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "files" json NOT NULL, "others_attachments" json, "date_collection" varchar NOT NULL, "measurement_technique" varchar NOT NULL, "organization" varchar NOT NULL, "collected_by" varchar NOT NULL, "instrument" varchar NOT NULL, "type" varchar NOT NULL, "normalization" varchar NOT NULL, "createdById" varchar NOT NULL, "createdByName" varchar, "createdByPreferred_username" varchar NOT NULL, "createdByGiven_name" varchar, "createdByFamily_name" varchar, "createdByEmail" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "experiment"("id", "experiment_name", "chemical_name", "chemical_id", "created_at", "files", "others_attachments", "date_collection", "measurement_technique", "organization", "collected_by", "instrument", "type", "normalization", "createdById", "createdByName", "createdByPreferred_username", "createdByGiven_name", "createdByFamily_name", "createdByEmail") SELECT "id", "experiment_name", "chemical_name", "chemical_id", "created_at", "files", "others_attachments", "date_collection", "measurement_technique", "organization", "collected_by", "instrument", "type", "normalization", "createdById", "createdByName", "createdByPreferred_username", "createdByGiven_name", "createdByFamily_name", "createdByEmail" FROM "temporary_experiment"`);
        await queryRunner.query(`DROP TABLE "temporary_experiment"`);
    }

}
