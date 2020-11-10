import { Plant } from "src/plants/plant.entity";
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class PhotosTable1605026596120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'photos',
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'filename',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'originalname',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'path',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                    name: 'plant_id',
                    type: 'int'
                },
                {
                  name: 'created_at',
                  type: 'Date',
                  isNullable: true,
                },
              ],
            }),
          );

          await queryRunner.createForeignKey("photos", new TableForeignKey({
            columnNames: ["plant_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "plants",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("photos");
    }

}
