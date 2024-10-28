import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1730138226414 implements MigrationInterface {
    name = 'Default1730138226414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`usuario_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`usuario_nome\` varchar(255) NOT NULL, \`usuario_email\` varchar(255) NOT NULL, \`usuario_password\` varchar(255) NOT NULL, \`usuario_ultimoAcesso\` date NULL, \`usuario_status\` enum ('Ativo', 'Inativo') NOT NULL DEFAULT 'Inativo', \`updated_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_2798103bab9f13a926c1a164be\` (\`usuario_email\`), PRIMARY KEY (\`usuario_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2798103bab9f13a926c1a164be\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
