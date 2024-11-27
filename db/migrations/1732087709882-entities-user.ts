import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesUser1732087709882 implements MigrationInterface {
    name = 'EntitiesUser1732087709882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_measurement" ("id" varchar PRIMARY KEY NOT NULL, "files" json)`);
        await queryRunner.query(`INSERT INTO "temporary_measurement"("id", "files") SELECT "id", "files" FROM "measurement"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`ALTER TABLE "temporary_measurement" RENAME TO "measurement"`);
        await queryRunner.query(`CREATE TABLE "temporary_measurement" ("id" varchar PRIMARY KEY NOT NULL, "files" json, "name" varchar NOT NULL, "waveLength" varchar NOT NULL, "laserPower" varchar NOT NULL, "exposureTime" varchar NOT NULL, "accumulations" integer NOT NULL, "lens" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_measurement"("id", "files") SELECT "id", "files" FROM "measurement"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`ALTER TABLE "temporary_measurement" RENAME TO "measurement"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" RENAME TO "temporary_measurement"`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" varchar PRIMARY KEY NOT NULL, "files" json)`);
        await queryRunner.query(`INSERT INTO "measurement"("id", "files") SELECT "id", "files" FROM "temporary_measurement"`);
        await queryRunner.query(`DROP TABLE "temporary_measurement"`);
        await queryRunner.query(`ALTER TABLE "measurement" RENAME TO "temporary_measurement"`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" varchar PRIMARY KEY NOT NULL, "parameters" varchar NOT NULL, "files" json)`);
        await queryRunner.query(`INSERT INTO "measurement"("id", "files") SELECT "id", "files" FROM "temporary_measurement"`);
        await queryRunner.query(`DROP TABLE "temporary_measurement"`);
    }

}
