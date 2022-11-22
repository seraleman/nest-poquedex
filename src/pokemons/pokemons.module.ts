import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonsService } from './pokemons.service';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { PokemonsController } from './pokemons.controller';

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class PokemonsModule {}
