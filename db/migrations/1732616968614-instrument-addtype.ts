import { MigrationInterface, QueryRunner } from "typeorm";

export class InstrumentAddtype1732616968614 implements MigrationInterface {
    name = 'InstrumentAddtype1732616968614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, "equipmentType" varchar NOT NULL, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"), CONSTRAINT "FK_bef2514b9129dca013689f6ea23" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_instrument"("id", "name", "description", "techniqueId") SELECT "id", "name", "description", "techniqueId" FROM "instrument"`);
        await queryRunner.query(`DROP TABLE "instrument"`);
        await queryRunner.query(`ALTER TABLE "temporary_instrument" RENAME TO "instrument"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instrument" RENAME TO "temporary_instrument"`);
        await queryRunner.query(`CREATE TABLE "instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"), CONSTRAINT "FK_bef2514b9129dca013689f6ea23" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "instrument"("id", "name", "description", "techniqueId") SELECT "id", "name", "description", "techniqueId" FROM "temporary_instrument"`);
        await queryRunner.query(`DROP TABLE "temporary_instrument"`);
    }

}
