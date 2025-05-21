import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressEntity1747819685270 implements MigrationInterface {
    name = 'AddAddressEntity1747819685270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "deleted_time_at" TO "deleted_at"`);
        await queryRunner.query(`CREATE TABLE "abstract_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_55bf07336ea469593601bccfe9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "line1" character varying NOT NULL, "pincode" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "abstract_entity"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "deleted_at" TO "deleted_time_at"`);
    }

}
