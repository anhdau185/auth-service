import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTableNameColumn1658324924949 implements MigrationInterface {
    name = 'UpdateUserTableNameColumn1658324924949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`);
    }

}
