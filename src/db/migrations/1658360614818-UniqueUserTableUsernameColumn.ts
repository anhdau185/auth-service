import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueUserTableUsernameColumn1658360614818 implements MigrationInterface {
    name = 'UniqueUserTableUsernameColumn1658360614818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
    }

}
