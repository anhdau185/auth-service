import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTokenTable1658652947889 implements MigrationInterface {
    name = 'CreateTokenTable1658652947889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" integer, "validUntil" integer, "lastUsedAt" integer, CONSTRAINT "UQ_d9959ee7e17e2293893444ea371" UNIQUE ("token"), CONSTRAINT "UQ_94f168faad896c0786646fa3d4a" UNIQUE ("userId"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
