import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnsToEmployee1747977677458 implements MigrationInterface {
    name = 'AddNewColumnsToEmployee1747977677458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'PROBATION'`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_f9d306b968b54923539b3936b03" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TYPE "public"."employee_roles_enum" RENAME TO "employee_roles_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."employee_roles_enum" AS ENUM('UI', 'UX', 'DEVELOPER', 'HR')`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" TYPE "public"."employee_roles_enum" USING "roles"::"text"::"public"."employee_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" SET DEFAULT 'DEVELOPER'`);
        await queryRunner.query(`DROP TYPE "public"."employee_roles_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_roles_enum_old" AS ENUM('UI', 'UX', 'Developer', 'HR')`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" TYPE "public"."employee_roles_enum_old" USING "roles"::"text"::"public"."employee_roles_enum_old"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "roles" SET DEFAULT 'Developer'`);
        await queryRunner.query(`DROP TYPE "public"."employee_roles_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."employee_roles_enum_old" RENAME TO "employee_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_f9d306b968b54923539b3936b03"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
    }

}
