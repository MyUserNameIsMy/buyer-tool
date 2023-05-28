import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1685187721945 implements MigrationInterface {
    name = 'Init1685187721945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "claires" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_name" character varying NOT NULL, "product_id" character varying NOT NULL, "standard_price" character varying NOT NULL, "sales_price" character varying NOT NULL, "img" character varying NOT NULL, CONSTRAINT "PK_49cc43dab437465529152275083" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_account_status_enum" AS ENUM('active', 'inactive', 'banned')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "telegram_id" character varying NOT NULL, "password" character varying NOT NULL, "account_status" "public"."users_account_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "UQ_1a1e4649fd31ea6ec6b025c7bfc" UNIQUE ("telegram_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_account_status_enum"`);
        await queryRunner.query(`DROP TABLE "claires"`);
    }

}
