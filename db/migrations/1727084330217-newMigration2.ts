import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration21727084330217 implements MigrationInterface {
    name = 'NewMigration21727084330217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_measurement" ("id" varchar PRIMARY KEY NOT NULL, "parameters" varchar NOT NULL, "files" json NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_measurement"("id", "parameters", "files") SELECT "id", "parameters", "files" FROM "measurement"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`ALTER TABLE "temporary_measurement" RENAME TO "measurement"`);
        await queryRunner.query(`CREATE TABLE "temporary_measurement" ("id" varchar PRIMARY KEY NOT NULL, "parameters" varchar NOT NULL, "files" json)`);
        await queryRunner.query(`INSERT INTO "temporary_measurement"("id", "parameters", "files") SELECT "id", "parameters", "files" FROM "measurement"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`ALTER TABLE "temporary_measurement" RENAME TO "measurement"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" RENAME TO "temporary_measurement"`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" varchar PRIMARY KEY NOT NULL, "parameters" varchar NOT NULL, "files" json NOT NULL)`);
        await queryRunner.query(`INSERT INTO "measurement"("id", "parameters", "files") SELECT "id", "parameters", "files" FROM "temporary_measurement"`);
        await queryRunner.query(`DROP TABLE "temporary_measurement"`);
        await queryRunner.query(`ALTER TABLE "measurement" RENAME TO "temporary_measurement"`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" varchar PRIMARY KEY NOT NULL, "parameters" varchar NOT NULL, "files" json NOT NULL)`);
        await queryRunner.query(`INSERT INTO "measurement"("id", "parameters", "files") SELECT "id", "parameters", "files" FROM "temporary_measurement"`);
        await queryRunner.query(`DROP TABLE "temporary_measurement"`);
    }

}
