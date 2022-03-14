import {MigrationInterface, QueryRunner} from "typeorm";

export class audioFileAddCommand1643629362107 implements MigrationInterface {
    name = 'audioFileAddCommand1643629362107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audio_files" ADD "command" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "audio_files" ADD CONSTRAINT "UQ_fd13fc31445d9c9531946aa519c" UNIQUE ("command")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audio_files" DROP CONSTRAINT "UQ_fd13fc31445d9c9531946aa519c"`);
        await queryRunner.query(`ALTER TABLE "audio_files" DROP COLUMN "command"`);
    }

}
