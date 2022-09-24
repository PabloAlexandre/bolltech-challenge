import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailField1664024280671 implements MigrationInterface {
    name = 'EmailField1664024280671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
