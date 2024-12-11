import { MigrationInterface, QueryRunner } from "typeorm";

export class Form1732758756362 implements MigrationInterface {
    name = 'Form1732758756362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "form" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_e2b5265b1797dcc0f22ad187985" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "temporary_chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "formId" varchar, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_chemical"("id", "name", "description") SELECT "id", "name", "description" FROM "chemical"`);
        await queryRunner.query(`DROP TABLE "chemical"`);
        await queryRunner.query(`ALTER TABLE "temporary_chemical" RENAME TO "chemical"`);
        await queryRunner.query(`CREATE TABLE "temporary_chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "formId" varchar, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"), CONSTRAINT "FK_8a57b9b7121d5dfc967d062bc29" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_chemical"("id", "name", "description", "formId") SELECT "id", "name", "description", "formId" FROM "chemical"`);
        await queryRunner.query(`DROP TABLE "chemical"`);
        await queryRunner.query(`ALTER TABLE "temporary_chemical" RENAME TO "chemical"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chemical" RENAME TO "temporary_chemical"`);
        await queryRunner.query(`CREATE TABLE "chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "formId" varchar, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "chemical"("id", "name", "description", "formId") SELECT "id", "name", "description", "formId" FROM "temporary_chemical"`);
        await queryRunner.query(`DROP TABLE "temporary_chemical"`);
        await queryRunner.query(`ALTER TABLE "chemical" RENAME TO "temporary_chemical"`);
        await queryRunner.query(`CREATE TABLE "chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "chemical"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_chemical"`);
        await queryRunner.query(`DROP TABLE "temporary_chemical"`);
        await queryRunner.query(`DROP TABLE "form"`);
    }

}
