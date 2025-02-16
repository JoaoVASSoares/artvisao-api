import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNewColumn1739718488083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "projects",
      new TableColumn({
        name: "name",
        type: "varchar",
        length: "255",
        isNullable: false, // Define como obrigatório
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("projects", "name");
  }
}
