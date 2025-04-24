import { MigrationInterface, QueryRunner } from "typeorm";

export class MediaFieldForDestinations1744806959253 implements MigrationInterface {
    name = 'MediaFieldForDestinations1744806959253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination" ADD "media" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination" DROP COLUMN "media"`);
    }

}
