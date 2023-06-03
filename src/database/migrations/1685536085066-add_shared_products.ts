import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSharedProducts1685536085066 implements MigrationInterface {
    name = 'AddSharedProducts1685536085066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shared_products" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_d85b2dabe67fdd396aa1f325d4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shared_products" ADD CONSTRAINT "FK_21e03acb5054f1fe388716e3ee8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_products" DROP CONSTRAINT "FK_21e03acb5054f1fe388716e3ee8"`);
        await queryRunner.query(`DROP TABLE "shared_products"`);
    }

}
