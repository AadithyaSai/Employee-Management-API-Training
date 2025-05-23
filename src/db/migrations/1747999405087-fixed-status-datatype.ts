import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedStatusDatatype1747999405087 implements MigrationInterface {
    name = 'FixedStatusDatatype1747999405087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT '2025-05-23 07:09:27.944688'`);
    }

}
