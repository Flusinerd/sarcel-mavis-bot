import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1643370561406 implements MigrationInterface {
    name = 'initialMigration1643370561406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`CREATE TABLE "audio_files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "url" character varying(255) NOT NULL, "key" character varying(255) NOT NULL, CONSTRAINT "PK_687c178ef33b4e0e1f83ae66cbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_580c0e0b74f6cdccf311c955b6" ON "audio_files" ("key") `);
        await queryRunner.query(`CREATE TABLE "audio_file_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(512), CONSTRAINT "UQ_fa1ec1c9ea2f3264b3f466f9a6d" UNIQUE ("name"), CONSTRAINT "PK_1ec87f25762845d77874756b5db" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "audio_file_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_580c0e0b74f6cdccf311c955b6"`);
        await queryRunner.query(`DROP TABLE "audio_files"`);
    }

}
