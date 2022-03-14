import {MigrationInterface, QueryRunner} from "typeorm";

export class fileRemoveUrlColumn1643651916553 implements MigrationInterface {
    name = 'fileRemoveUrlColumn1643651916553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audio_files" DROP COLUMN "url"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audio_files" ADD "url" character varying(255) NOT NULL`);
    }

}
