import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateActivityTypes1605818979648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO  activity_types(name, icon, color)
       VALUES
       ('Water','mdi-watering-can-outline','blue'),
       ('Mist','mdi-spray','cyan'),
       ('Fertilize','mdi-bottle-tonic-outline','teal'),
       ('Prune','mdi-content-cut','pink'),
       ('Transplant','mdi-shovel','#6D4C41');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE activity_types`);
  }
}
