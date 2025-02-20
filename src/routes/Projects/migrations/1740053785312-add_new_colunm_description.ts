import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNewColumnDescription1740053785312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "projects",
      new TableColumn({
        name: "description",
        type: "text",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("projects", "description");
  }
}
