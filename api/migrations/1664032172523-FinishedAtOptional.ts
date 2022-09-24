import { MigrationInterface, QueryRunner } from "typeorm";

export class FinishedAtOptional1664032172523 implements MigrationInterface {
    name = 'FinishedAtOptional1664032172523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`finishedAt\` \`finishedAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`finishedAt\` \`finishedAt\` datetime NOT NULL`);
    }

}
