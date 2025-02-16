import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MountingController } from "./mounting.controller";
import { MountingService } from "./mounting.service";
import { Mounting } from "./entity/mounting.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Mounting])],
  controllers: [MountingController],
  providers: [MountingService],
})
export class MountingModule {}
