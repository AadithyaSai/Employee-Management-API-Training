import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameRolesToRole1748858273095 implements MigrationInterface {
    name = 'RenameRolesToRole1748858273095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "roles" TO "role"`);
        await queryRunner.query(`ALTER TYPE "public"."employee_roles_enum" RENAME TO "employee_role_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT '2025-05-23 11:23:35.543564'`);
        await queryRunner.query(`ALTER TYPE "public"."employee_role_enum" RENAME TO "employee_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "role" TO "roles"`);
    }

}
