import { MigrationInterface, QueryRunner } from "typeorm";

export class Setnullablesample1733286963208 implements MigrationInterface {
    name = 'Setnullablesample1733286963208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "source" varchar, "note" varchar, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "organizationId" varchar NOT NULL, "chemicalId" varchar, "categoryId" varchar, "formId" varchar, CONSTRAINT "UQ_7c453dce19d37ae0e4ecbd10709" UNIQUE ("name"), CONSTRAINT "FK_9424e423b6997d95cffcb149a69" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_885ee312ba08566765412f5c246" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_460349e27a26afd588e6154f457" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sample"("id", "name", "description", "source", "note", "attachments", "images", "create_at", "update_at", "organizationId", "chemicalId", "categoryId", "formId") SELECT "id", "name", "description", "source", "note", "attachments", "images", "create_at", "update_at", "organizationId", "chemicalId", "categoryId", "formId" FROM "sample"`);
        await queryRunner.query(`DROP TABLE "sample"`);
        await queryRunner.query(`ALTER TABLE "temporary_sample" RENAME TO "sample"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sample" RENAME TO "temporary_sample"`);
        await queryRunner.query(`CREATE TABLE "sample" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "source" varchar NOT NULL, "note" varchar NOT NULL, "attachments" json NOT NULL, "images" json NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "organizationId" varchar NOT NULL, "chemicalId" varchar, "categoryId" varchar, "formId" varchar, CONSTRAINT "UQ_7c453dce19d37ae0e4ecbd10709" UNIQUE ("name"), CONSTRAINT "FK_9424e423b6997d95cffcb149a69" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_885ee312ba08566765412f5c246" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_460349e27a26afd588e6154f457" FOREIGN KEY ("chemicalId") REFERENCES "chemical" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9855ae6df5fcd0db02a2eb33104" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "sample"("id", "name", "description", "source", "note", "attachments", "images", "create_at", "update_at", "organizationId", "chemicalId", "categoryId", "formId") SELECT "id", "name", "description", "source", "note", "attachments", "images", "create_at", "update_at", "organizationId", "chemicalId", "categoryId", "formId" FROM "temporary_sample"`);
        await queryRunner.query(`DROP TABLE "temporary_sample"`);
    }

}
