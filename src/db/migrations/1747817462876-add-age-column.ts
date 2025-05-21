import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeColumn1747817462876 implements MigrationInterface {
    name = 'AddAgeColumn1747817462876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "deleted_time_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deleted_time_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "deleted_at" TIMESTAMP`);
    }

}
