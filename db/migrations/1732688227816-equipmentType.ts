import { MigrationInterface, QueryRunner } from "typeorm";

export class EquipmentType1732688227816 implements MigrationInterface {
    name = 'EquipmentType1732688227816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, "equipmentTypeId" varchar NOT NULL, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"), CONSTRAINT "FK_bef2514b9129dca013689f6ea23" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_instrument"("id", "name", "description", "techniqueId", "equipmentTypeId") SELECT "id", "name", "description", "techniqueId", "equipmentType" FROM "instrument"`);
        await queryRunner.query(`DROP TABLE "instrument"`);
        await queryRunner.query(`ALTER TABLE "temporary_instrument" RENAME TO "instrument"`);
        await queryRunner.query(`CREATE TABLE "equipment_type" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_ce2b5e7a7ca480169494f39fad5" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "temporary_instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, "equipmentTypeId" varchar, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"), CONSTRAINT "FK_bef2514b9129dca013689f6ea23" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_instrument"("id", "name", "description", "techniqueId", "equipmentTypeId") SELECT "id", "name", "description", "techniqueId", "equipmentTypeId" FROM "instrument"`);
        await queryRunner.query(`DROP TABLE "instrument"`);
        await queryRunner.query(`ALTER TABLE "temporary_instrument" RENAME TO "instrument"`);
        await queryRunner.query(`CREATE TABLE "temporary_instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, "equipmentTypeId" varchar, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"), CONSTRAINT "FK_bef2514b9129dca013689f6ea23" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_064845caa32df6420c2324563ee" FOREIGN KEY ("equipmentTypeId") REFERENCES "equipment_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_instrument"("id", "name", "description", "techniqueId", "equipmentTypeId") SELECT "id", "name", "description", "techniqueId", "equipmentTypeId" FROM "instrument"`);
        await queryRunner.query(`DROP TABLE "instrument"`);
        await queryRunner.query(`ALTER TABLE "temporary_instrument" RENAME TO "instrument"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instrument" RENAME TO "temporary_instrument"`);
        await queryRunner.query(`CREATE TABLE "instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, "equipmentTypeId" varchar, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"), CONSTRAINT "FK_bef2514b9129dca013689f6ea23" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "instrument"("id", "name", "description", "techniqueId", "equipmentTypeId") SELECT "id", "name", "description", "techniqueId", "equipmentTypeId" FROM "temporary_instrument"`);
        await queryRunner.query(`DROP TABLE "temporary_instrument"`);
        await queryRunner.query(`ALTER TABLE "instrument" RENAME TO "temporary_instrument"`);
        await queryRunner.query(`CREATE TABLE "instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, "equipmentTypeId" varchar NOT NULL, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"), CONSTRAINT "FK_bef2514b9129dca013689f6ea23" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "instrument"("id", "name", "description", "techniqueId", "equipmentTypeId") SELECT "id", "name", "description", "techniqueId", "equipmentTypeId" FROM "temporary_instrument"`);
        await queryRunner.query(`DROP TABLE "temporary_instrument"`);
        await queryRunner.query(`DROP TABLE "equipment_type"`);
        await queryRunner.query(`ALTER TABLE "instrument" RENAME TO "temporary_instrument"`);
        await queryRunner.query(`CREATE TABLE "instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, "equipmentType" varchar NOT NULL, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"), CONSTRAINT "FK_bef2514b9129dca013689f6ea23" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "instrument"("id", "name", "description", "techniqueId", "equipmentType") SELECT "id", "name", "description", "techniqueId", "equipmentTypeId" FROM "temporary_instrument"`);
        await queryRunner.query(`DROP TABLE "temporary_instrument"`);
    }

}
