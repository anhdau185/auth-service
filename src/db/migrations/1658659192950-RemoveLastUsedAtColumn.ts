import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveLastUsedAtColumn1658659192950 implements MigrationInterface {
    name = 'RemoveLastUsedAtColumn1658659192950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "lastUsedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ADD "lastUsedAt" integer`);
    }

}
