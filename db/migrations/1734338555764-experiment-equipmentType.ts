import { MigrationInterface, QueryRunner } from "typeorm";

export class ExperimentEquipmentType1734338555764 implements MigrationInterface {
    name = 'ExperimentEquipmentType1734338555764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_experiment" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "createAt" datetime NOT NULL DEFAULT (datetime('now')), "updateAt" datetime DEFAULT (datetime('now')), "name" varchar NOT NULL, "equipmentTypeId" varchar, CONSTRAINT "FK_3c092842ef313b1dc4ad99c91a3" FOREIGN KEY ("equipmentTypeId") REFERENCES "equipment_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a968dced2748a865538bcbfae7c" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b773f55f3d5afe549e96ddc2915" FOREIGN KEY ("sampleId") REFERENCES "sample" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_efd004fa410567831df8dd764fb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_experiment"("id", "userId", "sampleId", "organizationId", "techniqueId", "createAt", "updateAt", "name", "equipmentTypeId") SELECT "id", "userId", "sampleId", "organizationId", "techniqueId", "createAt", "updateAt", "name", "equipmentTypeId" FROM "experiment"`);
        await queryRunner.query(`DROP TABLE "experiment"`);
        await queryRunner.query(`ALTER TABLE "temporary_experiment" RENAME TO "experiment"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experiment" RENAME TO "temporary_experiment"`);
        await queryRunner.query(`CREATE TABLE "experiment" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "materialName" varchar NOT NULL, "createAt" datetime NOT NULL DEFAULT (datetime('now')), "updateAt" datetime DEFAULT (datetime('now')), "name" varchar NOT NULL, "equipmentTypeId" varchar, CONSTRAINT "FK_3c092842ef313b1dc4ad99c91a3" FOREIGN KEY ("equipmentTypeId") REFERENCES "equipment_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a968dced2748a865538bcbfae7c" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b773f55f3d5afe549e96ddc2915" FOREIGN KEY ("sampleId") REFERENCES "sample" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_efd004fa410567831df8dd764fb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "experiment"("id", "userId", "sampleId", "organizationId", "techniqueId", "createAt", "updateAt", "name", "equipmentTypeId") SELECT "id", "userId", "sampleId", "organizationId", "techniqueId", "createAt", "updateAt", "name", "equipmentTypeId" FROM "temporary_experiment"`);
        await queryRunner.query(`DROP TABLE "temporary_experiment"`);
    }

}
