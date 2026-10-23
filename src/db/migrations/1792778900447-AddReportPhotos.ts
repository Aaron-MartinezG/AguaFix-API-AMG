import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReportPhotos1792778900447 implements MigrationInterface {
    name = 'AddReportPhotos1792778900447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" ADD "photoUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" ADD "repairPhotoUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" DROP COLUMN "repairPhotoUrl"`);
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" DROP COLUMN "photoUrl"`);
    }

}
