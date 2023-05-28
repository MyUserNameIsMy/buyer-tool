import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateClairesEntity1685205316533 implements MigrationInterface {
    name = 'UpdateClairesEntity1685205316533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claires" DROP COLUMN "img"`);
        await queryRunner.query(`ALTER TABLE "claires" ADD "product_url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "claires" ADD "images" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "account_status" SET DEFAULT 'inactive'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "account_status" SET DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "claires" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "claires" DROP COLUMN "product_url"`);
        await queryRunner.query(`ALTER TABLE "claires" ADD "img" character varying NOT NULL`);
    }

}
