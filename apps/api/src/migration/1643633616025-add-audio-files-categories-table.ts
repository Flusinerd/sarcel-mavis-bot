import {MigrationInterface, QueryRunner} from "typeorm";

export class addAudioFilesCategoriesTable1643633616025 implements MigrationInterface {
    name = 'addAudioFilesCategoriesTable1643633616025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audio_files_categories" ("audio_file_id" uuid NOT NULL, "audio_file_category_id" uuid NOT NULL, CONSTRAINT "PK_88fc502fdad0914a7b016ab5098" PRIMARY KEY ("audio_file_id", "audio_file_category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8affafbb8dc0f3680c135056f0" ON "audio_files_categories" ("audio_file_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7adb3555494c0f845514548107" ON "audio_files_categories" ("audio_file_category_id") `);
        await queryRunner.query(`ALTER TABLE "audio_files_categories" ADD CONSTRAINT "FK_8affafbb8dc0f3680c135056f0c" FOREIGN KEY ("audio_file_id") REFERENCES "audio_files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "audio_files_categories" ADD CONSTRAINT "FK_7adb3555494c0f845514548107e" FOREIGN KEY ("audio_file_category_id") REFERENCES "audio_file_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audio_files_categories" DROP CONSTRAINT "FK_7adb3555494c0f845514548107e"`);
        await queryRunner.query(`ALTER TABLE "audio_files_categories" DROP CONSTRAINT "FK_8affafbb8dc0f3680c135056f0c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7adb3555494c0f845514548107"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8affafbb8dc0f3680c135056f0"`);
        await queryRunner.query(`DROP TABLE "audio_files_categories"`);
    }

}
