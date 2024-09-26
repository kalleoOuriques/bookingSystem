import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './providers/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
  imports: [TypeOrmModule.forFeature([Client])]
})
export class ClientsModule {}
