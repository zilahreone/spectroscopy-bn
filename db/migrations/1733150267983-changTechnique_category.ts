import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangTechniqueCategory1733150267983 implements MigrationInterface {
    name = 'ChangTechniqueCategory1733150267983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "categoryId" varchar, CONSTRAINT "UQ_5d139614e54288d7c6028b95658" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_technique"("id", "name", "description", "categoryId") SELECT "id", "name", "description", "categoryId" FROM "technique"`);
        await queryRunner.query(`DROP TABLE "technique"`);
        await queryRunner.query(`ALTER TABLE "temporary_technique" RENAME TO "technique"`);
        await queryRunner.query(`CREATE TABLE "temporary_technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_5d139614e54288d7c6028b95658" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_technique"("id", "name", "description") SELECT "id", "name", "description" FROM "technique"`);
        await queryRunner.query(`DROP TABLE "technique"`);
        await queryRunner.query(`ALTER TABLE "temporary_technique" RENAME TO "technique"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, "techniqueId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"), CONSTRAINT "FK_69637758cc1080caba1b92ebb3c" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name", "description", "chemicalId") SELECT "id", "name", "description", "chemicalId" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, "techniqueId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"), CONSTRAINT "FK_69637758cc1080caba1b92ebb3c" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_5c70229a22c13e247f3adb2cf39" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name", "description", "chemicalId", "techniqueId") SELECT "id", "name", "description", "chemicalId", "techniqueId" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, "techniqueId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"), CONSTRAINT "FK_69637758cc1080caba1b92ebb3c" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "category"("id", "name", "description", "chemicalId", "techniqueId") SELECT "id", "name", "description", "chemicalId", "techniqueId" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"), CONSTRAINT "FK_69637758cc1080caba1b92ebb3c" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "category"("id", "name", "description", "chemicalId") SELECT "id", "name", "description", "chemicalId" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`ALTER TABLE "technique" RENAME TO "temporary_technique"`);
        await queryRunner.query(`CREATE TABLE "technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "categoryId" varchar, CONSTRAINT "UQ_5d139614e54288d7c6028b95658" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "technique"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_technique"`);
        await queryRunner.query(`DROP TABLE "temporary_technique"`);
        await queryRunner.query(`ALTER TABLE "technique" RENAME TO "temporary_technique"`);
        await queryRunner.query(`CREATE TABLE "technique" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "categoryId" varchar, CONSTRAINT "UQ_5d139614e54288d7c6028b95658" UNIQUE ("name"), CONSTRAINT "FK_1be58fc39773833517f7ed2018d" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "technique"("id", "name", "description", "categoryId") SELECT "id", "name", "description", "categoryId" FROM "temporary_technique"`);
        await queryRunner.query(`DROP TABLE "temporary_technique"`);
    }

}
