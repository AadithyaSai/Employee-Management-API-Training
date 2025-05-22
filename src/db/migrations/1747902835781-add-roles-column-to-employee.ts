import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesColumnToEmployee1747902835781 implements MigrationInterface {
    name = 'AddRolesColumnToEmployee1747902835781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_roles_enum" AS ENUM('UI', 'UX', 'Developer', 'HR')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "roles" "public"."employee_roles_enum" NOT NULL DEFAULT 'Developer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."employee_roles_enum"`);
    }

}
