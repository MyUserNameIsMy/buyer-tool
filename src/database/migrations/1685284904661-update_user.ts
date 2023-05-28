import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1685284904661 implements MigrationInterface {
    name = 'UpdateUser1685284904661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone_number" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`);
    }

}
