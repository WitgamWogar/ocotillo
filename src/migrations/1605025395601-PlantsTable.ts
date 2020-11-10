import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PlantsTable1605025395601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plants',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'scientific_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'common_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nickname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'acquired_at',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'source',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'Date',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("plants");
  }
}
