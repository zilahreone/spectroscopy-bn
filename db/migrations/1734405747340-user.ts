import { MigrationInterface, QueryRunner } from "typeorm";

export class User1734405747340 implements MigrationInterface {
    name = 'User1734405747340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar, "user" json NOT NULL, "organizationId" varchar, "isActive" boolean NOT NULL DEFAULT (0), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "preferredUsername" varchar NOT NULL, "giveName" varchar NOT NULL, "familyName" varchar NOT NULL, CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "user", "organizationId", "isActive", "createdDate", "preferredUsername", "giveName", "familyName") SELECT "id", "email", "user", "organizationId", "isActive", "createdDate", "preferredUsername", "givenName", "familyName" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar, "user" json NOT NULL, "organizationId" varchar, "isActive" boolean NOT NULL DEFAULT (0), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "preferredUsername" varchar NOT NULL, "givenName" varchar NOT NULL, "familyName" varchar NOT NULL, CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "user", "organizationId", "isActive", "createdDate", "preferredUsername", "givenName", "familyName") SELECT "id", "email", "user", "organizationId", "isActive", "createdDate", "preferredUsername", "giveName", "familyName" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
