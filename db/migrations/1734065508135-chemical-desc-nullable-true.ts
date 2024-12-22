import { MigrationInterface, QueryRunner } from "typeorm";

export class ChemicalDescNullableTrue1734065508135 implements MigrationInterface {
    name = 'ChemicalDescNullableTrue1734065508135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_chemical"("id", "name", "description") SELECT "id", "name", "description" FROM "chemical"`);
        await queryRunner.query(`DROP TABLE "chemical"`);
        await queryRunner.query(`ALTER TABLE "temporary_chemical" RENAME TO "chemical"`);
        await queryRunner.query(`CREATE TABLE "temporary_chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_chemical"("id", "name", "description") SELECT "id", "name", "description" FROM "chemical"`);
        await queryRunner.query(`DROP TABLE "chemical"`);
        await queryRunner.query(`ALTER TABLE "temporary_chemical" RENAME TO "chemical"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chemical" RENAME TO "temporary_chemical"`);
        await queryRunner.query(`CREATE TABLE "chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "chemical"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_chemical"`);
        await queryRunner.query(`DROP TABLE "temporary_chemical"`);
        await queryRunner.query(`ALTER TABLE "chemical" RENAME TO "temporary_chemical"`);
        await queryRunner.query(`CREATE TABLE "chemical" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_b0978d04fd0a03ca93abb0c610a" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "chemical"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_chemical"`);
        await queryRunner.query(`DROP TABLE "temporary_chemical"`);
    }

}
