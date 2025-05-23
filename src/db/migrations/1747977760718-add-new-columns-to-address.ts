import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnsToAddress1747977760718 implements MigrationInterface {
    name = 'AddNewColumnsToAddress1747977760718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT '2025-05-23 05:21:24.288241'`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
    }

}
