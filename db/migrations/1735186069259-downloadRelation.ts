import { MigrationInterface, QueryRunner } from "typeorm";

export class DownloadRelation1735186069259 implements MigrationInterface {
    name = 'DownloadRelation1735186069259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_download" ("id" varchar PRIMARY KEY NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "experimentId" varchar, "userId" varchar, CONSTRAINT "FK_ccb403e6acb0b40c7740af652cc" FOREIGN KEY ("experimentId") REFERENCES "experiment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9d13a8323fab9297788961ec6cc" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_download"("id", "create_at", "experimentId", "userId") SELECT "id", "timestamp", "experimentId", "userId" FROM "download"`);
        await queryRunner.query(`DROP TABLE "download"`);
        await queryRunner.query(`ALTER TABLE "temporary_download" RENAME TO "download"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "download" RENAME TO "temporary_download"`);
        await queryRunner.query(`CREATE TABLE "download" ("id" varchar PRIMARY KEY NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')), "experimentId" varchar, "userId" varchar, CONSTRAINT "FK_ccb403e6acb0b40c7740af652cc" FOREIGN KEY ("experimentId") REFERENCES "experiment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9d13a8323fab9297788961ec6cc" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "download"("id", "timestamp", "experimentId", "userId") SELECT "id", "create_at", "experimentId", "userId" FROM "temporary_download"`);
        await queryRunner.query(`DROP TABLE "temporary_download"`);
    }

}
