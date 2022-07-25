import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueConstraintFromTokenColumn1658716477755 implements MigrationInterface {
    name = 'RemoveUniqueConstraintFromTokenColumn1658716477755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "UQ_d9959ee7e17e2293893444ea371"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "UQ_d9959ee7e17e2293893444ea371" UNIQUE ("token")`);
    }

}
