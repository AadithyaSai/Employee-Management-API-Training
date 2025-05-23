import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedRolesEnum1747984153795 implements MigrationInterface {
    name = 'UpdatedRolesEnum1747984153795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."employee_roles_enum" RENAME TO "employee_roles_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."employee_roles_enum" AS ENUM('UI', 'UX', 'DEVELOPER', 'HR', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" TYPE "public"."employee_roles_enum" USING "roles"::"text"::"public"."employee_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" SET DEFAULT 'DEVELOPER'`);
        await queryRunner.query(`DROP TYPE "public"."employee_roles_enum_old"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT '2025-05-23 05:22:46.936893'`);
        await queryRunner.query(`CREATE TYPE "public"."employee_roles_enum_old" AS ENUM('UI', 'UX', 'DEVELOPER', 'HR')`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" TYPE "public"."employee_roles_enum_old" USING "roles"::"text"::"public"."employee_roles_enum_old"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" SET DEFAULT 'DEVELOPER'`);
        await queryRunner.query(`DROP TYPE "public"."employee_roles_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."employee_roles_enum_old" RENAME TO "employee_roles_enum"`);
    }

}
