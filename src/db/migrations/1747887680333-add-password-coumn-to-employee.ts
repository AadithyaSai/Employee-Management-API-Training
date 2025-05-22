import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordCoumnToEmployee1747887680333 implements MigrationInterface {
    name = 'AddPasswordCoumnToEmployee1747887680333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
