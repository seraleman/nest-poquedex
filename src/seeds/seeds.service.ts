import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // Cuidado!!! Se borrarán todos los datos de la bD

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon/?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = Number(segments[segments.length - 2]);
      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }
}
