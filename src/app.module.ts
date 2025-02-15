import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./routes/Users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DEVELOPMENT_DB_HOST,
      port: Number(process.env.DEVELOPMENT_DB_PORT),
      username: process.env.DEVELOPMENT_DB_USERNAME,
      password: String(process.env.DEVELOPMENT_DB_PASSWORD),
      database: process.env.DEVELOPMENT_DB_DATABASE,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/routes/**/migrations/*{.ts,.js}`],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
