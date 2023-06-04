import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApplication1685786456996 implements MigrationInterface {
    name = 'AddApplication1685786456996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."applications_status_enum" AS ENUM('Новая', 'Приняли в работу', 'Сделали заказ', 'Заказ пришел', 'Закрыто')`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_table" character varying NOT NULL, "original_link" character varying NOT NULL, "original_price" character varying NOT NULL, "buyer_price" character varying NOT NULL, "client_fullname" character varying NOT NULL, "client_address" character varying NOT NULL, "quantity" integer NOT NULL, "size" character varying NOT NULL, "status" "public"."applications_status_enum" NOT NULL DEFAULT 'Новая', "userId" integer, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_90ad8bec24861de0180f638b9cc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_90ad8bec24861de0180f638b9cc"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TYPE "public"."applications_status_enum"`);
    }

}
