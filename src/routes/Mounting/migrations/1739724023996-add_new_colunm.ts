import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNewColunm1739724023996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "mountings",
      new TableColumn({
        name: "mounting_date",
        type: "date",
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("mountings", "mounting_date");
  }
}
