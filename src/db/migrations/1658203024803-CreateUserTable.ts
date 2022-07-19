import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1658203024803 implements MigrationInterface {
    name = 'CreateUserTable1658203024803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT 'Unnamed', "scope" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
