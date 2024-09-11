import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1721985527989 implements MigrationInterface {
    name = 'NewMigration1721985527989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "experiment" ("id" varchar PRIMARY KEY NOT NULL, "experiment_name" varchar NOT NULL, "chemical_name" varchar NOT NULL, "chemical_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "files" json NOT NULL, "others_attachments" json, "date_collection" varchar NOT NULL, "measurement_technique" varchar NOT NULL, "organization" varchar NOT NULL, "collected_by" varchar NOT NULL, "instrument" varchar NOT NULL, "type" varchar NOT NULL, "normalization" varchar NOT NULL, "createdById" varchar NOT NULL, "createdByName" varchar, "createdByPreferred_username" varchar NOT NULL, "createdByGiven_name" varchar, "createdByFamily_name" varchar, "createdByEmail" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "experiment"`);
    }

}
