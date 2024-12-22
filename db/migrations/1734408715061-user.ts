import { MigrationInterface, QueryRunner } from "typeorm";

export class User1734408715061 implements MigrationInterface {
    name = 'User1734408715061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar, "user" json NOT NULL, "organizationId" varchar, "isActive" boolean NOT NULL DEFAULT (0), "preferredUsername" varchar NOT NULL, "familyName" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "user", "organizationId", "isActive", "preferredUsername", "familyName", "create_at", "update_at") SELECT "id", "email", "user", "organizationId", "isActive", "preferredUsername", "familyName", "create_at", "update_at" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar, "user" json NOT NULL, "organizationId" varchar, "isActive" boolean NOT NULL DEFAULT (0), "preferredUsername" varchar NOT NULL, "familyName" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), "name" varchar NOT NULL, "givenName" varchar NOT NULL, CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "user", "organizationId", "isActive", "preferredUsername", "familyName", "create_at", "update_at") SELECT "id", "email", "user", "organizationId", "isActive", "preferredUsername", "familyName", "create_at", "update_at" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar, "user" json NOT NULL, "organizationId" varchar, "isActive" boolean NOT NULL DEFAULT (0), "preferredUsername" varchar NOT NULL, "familyName" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "user", "organizationId", "isActive", "preferredUsername", "familyName", "create_at", "update_at") SELECT "id", "email", "user", "organizationId", "isActive", "preferredUsername", "familyName", "create_at", "update_at" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar, "user" json NOT NULL, "organizationId" varchar, "isActive" boolean NOT NULL DEFAULT (0), "preferredUsername" varchar NOT NULL, "giveName" varchar NOT NULL, "familyName" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime DEFAULT (datetime('now')), CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "user", "organizationId", "isActive", "preferredUsername", "familyName", "create_at", "update_at") SELECT "id", "email", "user", "organizationId", "isActive", "preferredUsername", "familyName", "create_at", "update_at" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
