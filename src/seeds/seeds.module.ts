import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';
import { PokemonsModule } from 'src/pokemons/pokemons.module';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
  imports: [PokemonsModule, CommonModule],
})
export class SeedsModule {}
