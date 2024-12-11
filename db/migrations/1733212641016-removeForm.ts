import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveForm1733212641016 implements MigrationInterface {
    name = 'RemoveForm1733212641016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "formId" varchar, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_chemical"("id", "name", "description", "formId") SELECT "id", "name", "description", "formId" FROM "chemical"`);
        await queryRunner.query(`DROP TABLE "chemical"`);
        await queryRunner.query(`ALTER TABLE "temporary_chemical" RENAME TO "chemical"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, "techniqueId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name", "description", "chemicalId", "techniqueId") SELECT "id", "name", "description", "chemicalId", "techniqueId" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
        await queryRunner.query(`CREATE TABLE "temporary_chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_chemical"("id", "name", "description") SELECT "id", "name", "description" FROM "chemical"`);
        await queryRunner.query(`DROP TABLE "chemical"`);
        await queryRunner.query(`ALTER TABLE "temporary_chemical" RENAME TO "chemical"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name", "description") SELECT "id", "name", "description" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, "techniqueId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "category"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`ALTER TABLE "chemical" RENAME TO "temporary_chemical"`);
        await queryRunner.query(`CREATE TABLE "chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "formId" varchar, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "chemical"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_chemical"`);
        await queryRunner.query(`DROP TABLE "temporary_chemical"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "chemicalId" varchar, "techniqueId" varchar, CONSTRAINT "UQ_05b0f0a0941211bd58a019b5bc3" UNIQUE ("name"), CONSTRAINT "FK_5c70229a22c13e247f3adb2cf39" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_69637758cc1080caba1b92ebb3c" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "category"("id", "name", "description", "chemicalId", "techniqueId") SELECT "id", "name", "description", "chemicalId", "techniqueId" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`ALTER TABLE "chemical" RENAME TO "temporary_chemical"`);
        await queryRunner.query(`CREATE TABLE "chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "formId" varchar, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"), CONSTRAINT "FK_8a57b9b7121d5dfc967d062bc29" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "chemical"("id", "name", "description", "formId") SELECT "id", "name", "description", "formId" FROM "temporary_chemical"`);
        await queryRunner.query(`DROP TABLE "temporary_chemical"`);
    }

}
