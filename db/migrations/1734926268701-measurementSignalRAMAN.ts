import { MigrationInterface, QueryRunner } from "typeorm";

export class MeasurementSignalRAMAN1734926268701 implements MigrationInterface {
    name = 'MeasurementSignalRAMAN1734926268701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_measurement" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "experimentId" varchar, "attachmentName" varchar NOT NULL, "attachmentSize" integer NOT NULL, "attachmentMimetype" varchar NOT NULL, "attachmentFileext" varchar NOT NULL, "spectrumDescription" varchar, "remark" varchar, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "raman" json, CONSTRAINT "UQ_f3830901efcf428caf3e6a4f0df" UNIQUE ("name"), CONSTRAINT "FK_6b6e4936818d76b783b18ff5ac6" FOREIGN KEY ("experimentId") REFERENCES "experiment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_measurement"("id", "name", "experimentId", "attachmentName", "attachmentSize", "attachmentMimetype", "attachmentFileext", "spectrumDescription", "remark", "create_at", "update_at") SELECT "id", "name", "experimentId", "attachmentName", "attachmentSize", "attachmentMimetype", "attachmentFileext", "spectrumDescription", "remark", "create_at", "update_at" FROM "measurement"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`ALTER TABLE "temporary_measurement" RENAME TO "measurement"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" RENAME TO "temporary_measurement"`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "experimentId" varchar, "attachmentName" varchar NOT NULL, "attachmentSize" integer NOT NULL, "attachmentMimetype" varchar NOT NULL, "attachmentFileext" varchar NOT NULL, "spectrumDescription" varchar, "remark" varchar, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), CONSTRAINT "UQ_f3830901efcf428caf3e6a4f0df" UNIQUE ("name"), CONSTRAINT "FK_6b6e4936818d76b783b18ff5ac6" FOREIGN KEY ("experimentId") REFERENCES "experiment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "measurement"("id", "name", "experimentId", "attachmentName", "attachmentSize", "attachmentMimetype", "attachmentFileext", "spectrumDescription", "remark", "create_at", "update_at") SELECT "id", "name", "experimentId", "attachmentName", "attachmentSize", "attachmentMimetype", "attachmentFileext", "spectrumDescription", "remark", "create_at", "update_at" FROM "temporary_measurement"`);
        await queryRunner.query(`DROP TABLE "temporary_measurement"`);
    }

}
