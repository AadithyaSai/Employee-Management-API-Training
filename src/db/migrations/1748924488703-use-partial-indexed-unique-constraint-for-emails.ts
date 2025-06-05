import { MigrationInterface, QueryRunner } from "typeorm";

export class UsePartialIndexedUniqueConstraintForEmails1748924488703 implements MigrationInterface {
    name = 'UsePartialIndexedUniqueConstraintForEmails1748924488703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_817d1d427138772d47eca048855"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_TITLE" ON "employee" ("email") WHERE (deleted_at IS NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."UQ_TITLE"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT '2025-06-02 09:58:37.477179'`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email")`);
    }

}
