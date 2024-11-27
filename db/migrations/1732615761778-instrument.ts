import { MigrationInterface, QueryRunner } from "typeorm";

export class Instrument1732615761778 implements MigrationInterface {
    name = 'Instrument1732615761778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_experiment" ("id" varchar PRIMARY KEY NOT NULL, "experiment_name" varchar NOT NULL, "material_name" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "instrumentId" varchar, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "measurementId" varchar, CONSTRAINT "FK_efd004fa410567831df8dd764fb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b773f55f3d5afe549e96ddc2915" FOREIGN KEY ("sampleId") REFERENCES "sample" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a968dced2748a865538bcbfae7c" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cbef76a01cf016394c576315d19" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_experiment"("id", "experiment_name", "material_name", "create_at", "update_at", "instrumentId", "userId", "sampleId", "organizationId", "techniqueId", "measurementId") SELECT "id", "experiment_name", "material_name", "create_at", "update_at", "instrumentId", "userId", "sampleId", "organizationId", "techniqueId", "measurementId" FROM "experiment"`);
        await queryRunner.query(`DROP TABLE "experiment"`);
        await queryRunner.query(`ALTER TABLE "temporary_experiment" RENAME TO "experiment"`);
        await queryRunner.query(`CREATE TABLE "temporary_experiment" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "measurementId" varchar, CONSTRAINT "FK_efd004fa410567831df8dd764fb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b773f55f3d5afe549e96ddc2915" FOREIGN KEY ("sampleId") REFERENCES "sample" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a968dced2748a865538bcbfae7c" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cbef76a01cf016394c576315d19" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_experiment"("id", "userId", "sampleId", "organizationId", "techniqueId", "measurementId") SELECT "id", "userId", "sampleId", "organizationId", "techniqueId", "measurementId" FROM "experiment"`);
        await queryRunner.query(`DROP TABLE "experiment"`);
        await queryRunner.query(`ALTER TABLE "temporary_experiment" RENAME TO "experiment"`);
        await queryRunner.query(`CREATE TABLE "temporary_measurement" ("id" varchar PRIMARY KEY NOT NULL, "files" json, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_measurement"("id", "files", "name") SELECT "id", "files", "name" FROM "measurement"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`ALTER TABLE "temporary_measurement" RENAME TO "measurement"`);
        await queryRunner.query(`CREATE TABLE "temporary_instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "temporary_instrument"("id", "name", "description") SELECT "id", "name", "description" FROM "instrument"`);
        await queryRunner.query(`DROP TABLE "instrument"`);
        await queryRunner.query(`ALTER TABLE "temporary_instrument" RENAME TO "instrument"`);
        await queryRunner.query(`CREATE TABLE "temporary_experiment" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "measurementId" varchar, "Name" varchar NOT NULL, "materialName" varchar NOT NULL, "createAt" datetime NOT NULL DEFAULT (datetime('now')), "updateAt" datetime DEFAULT (datetime('now')), CONSTRAINT "FK_efd004fa410567831df8dd764fb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b773f55f3d5afe549e96ddc2915" FOREIGN KEY ("sampleId") REFERENCES "sample" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a968dced2748a865538bcbfae7c" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cbef76a01cf016394c576315d19" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_experiment"("id", "userId", "sampleId", "organizationId", "techniqueId", "measurementId") SELECT "id", "userId", "sampleId", "organizationId", "techniqueId", "measurementId" FROM "experiment"`);
        await queryRunner.query(`DROP TABLE "experiment"`);
        await queryRunner.query(`ALTER TABLE "temporary_experiment" RENAME TO "experiment"`);
        await queryRunner.query(`CREATE TABLE "temporary_measurement" ("id" varchar PRIMARY KEY NOT NULL, "files" json, "name" varchar NOT NULL, "measurementRange" varchar, "typeData" varchar, "measurementConditionAccumulations" integer NOT NULL, "measurementConditionWavelength" varchar, "measurementConditionSource" varchar, "measurementConditionBeamsplitter" varchar, "measurementConditionDetector" varchar, "measurementConditionLaserpower" varchar, "measurementConditionExposuretime" varchar, "measurementConditionLens" varchar, "measurementTechniqueSersChip" varchar NOT NULL, "measurementTechniqueSersNanoparticles" varchar NOT NULL, "measurementTechniqueSersPapers" varchar NOT NULL, "measurementTechniqueSersOther" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_measurement"("id", "files", "name") SELECT "id", "files", "name" FROM "measurement"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`ALTER TABLE "temporary_measurement" RENAME TO "measurement"`);
        await queryRunner.query(`CREATE TABLE "temporary_instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"), CONSTRAINT "FK_bef2514b9129dca013689f6ea23" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_instrument"("id", "name", "description", "techniqueId") SELECT "id", "name", "description", "techniqueId" FROM "instrument"`);
        await queryRunner.query(`DROP TABLE "instrument"`);
        await queryRunner.query(`ALTER TABLE "temporary_instrument" RENAME TO "instrument"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instrument" RENAME TO "temporary_instrument"`);
        await queryRunner.query(`CREATE TABLE "instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "techniqueId" varchar, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "instrument"("id", "name", "description", "techniqueId") SELECT "id", "name", "description", "techniqueId" FROM "temporary_instrument"`);
        await queryRunner.query(`DROP TABLE "temporary_instrument"`);
        await queryRunner.query(`ALTER TABLE "measurement" RENAME TO "temporary_measurement"`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" varchar PRIMARY KEY NOT NULL, "files" json, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "measurement"("id", "files", "name") SELECT "id", "files", "name" FROM "temporary_measurement"`);
        await queryRunner.query(`DROP TABLE "temporary_measurement"`);
        await queryRunner.query(`ALTER TABLE "experiment" RENAME TO "temporary_experiment"`);
        await queryRunner.query(`CREATE TABLE "experiment" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "measurementId" varchar, CONSTRAINT "FK_efd004fa410567831df8dd764fb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b773f55f3d5afe549e96ddc2915" FOREIGN KEY ("sampleId") REFERENCES "sample" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a968dced2748a865538bcbfae7c" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cbef76a01cf016394c576315d19" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "experiment"("id", "userId", "sampleId", "organizationId", "techniqueId", "measurementId") SELECT "id", "userId", "sampleId", "organizationId", "techniqueId", "measurementId" FROM "temporary_experiment"`);
        await queryRunner.query(`DROP TABLE "temporary_experiment"`);
        await queryRunner.query(`ALTER TABLE "instrument" RENAME TO "temporary_instrument"`);
        await queryRunner.query(`CREATE TABLE "instrument" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "instrument"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_instrument"`);
        await queryRunner.query(`DROP TABLE "temporary_instrument"`);
        await queryRunner.query(`ALTER TABLE "measurement" RENAME TO "temporary_measurement"`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" varchar PRIMARY KEY NOT NULL, "files" json, "name" varchar NOT NULL, "waveLength" varchar NOT NULL, "laserPower" varchar NOT NULL, "exposureTime" varchar NOT NULL, "accumulations" integer NOT NULL, "lens" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "measurement"("id", "files", "name") SELECT "id", "files", "name" FROM "temporary_measurement"`);
        await queryRunner.query(`DROP TABLE "temporary_measurement"`);
        await queryRunner.query(`ALTER TABLE "experiment" RENAME TO "temporary_experiment"`);
        await queryRunner.query(`CREATE TABLE "experiment" ("id" varchar PRIMARY KEY NOT NULL, "experiment_name" varchar NOT NULL, "material_name" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "instrumentId" varchar, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "measurementId" varchar, CONSTRAINT "FK_efd004fa410567831df8dd764fb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b773f55f3d5afe549e96ddc2915" FOREIGN KEY ("sampleId") REFERENCES "sample" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a968dced2748a865538bcbfae7c" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cbef76a01cf016394c576315d19" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "experiment"("id", "userId", "sampleId", "organizationId", "techniqueId", "measurementId") SELECT "id", "userId", "sampleId", "organizationId", "techniqueId", "measurementId" FROM "temporary_experiment"`);
        await queryRunner.query(`DROP TABLE "temporary_experiment"`);
        await queryRunner.query(`ALTER TABLE "experiment" RENAME TO "temporary_experiment"`);
        await queryRunner.query(`CREATE TABLE "experiment" ("id" varchar PRIMARY KEY NOT NULL, "experiment_name" varchar NOT NULL, "material_name" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "instrumentId" varchar, "userId" varchar, "sampleId" varchar, "organizationId" varchar, "techniqueId" varchar, "measurementId" varchar, CONSTRAINT "FK_912f3f19494e80b6cb91dbc9bf2" FOREIGN KEY ("instrumentId") REFERENCES "instrument" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_efd004fa410567831df8dd764fb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b773f55f3d5afe549e96ddc2915" FOREIGN KEY ("sampleId") REFERENCES "sample" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a968dced2748a865538bcbfae7c" FOREIGN KEY ("techniqueId") REFERENCES "technique" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cbef76a01cf016394c576315d19" FOREIGN KEY ("measurementId") REFERENCES "measurement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "experiment"("id", "experiment_name", "material_name", "create_at", "update_at", "instrumentId", "userId", "sampleId", "organizationId", "techniqueId", "measurementId") SELECT "id", "experiment_name", "material_name", "create_at", "update_at", "instrumentId", "userId", "sampleId", "organizationId", "techniqueId", "measurementId" FROM "temporary_experiment"`);
        await queryRunner.query(`DROP TABLE "temporary_experiment"`);
    }

}
