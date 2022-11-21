import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(searchTerm: string) {
    try {
      const pokemon: Pokemon = await this.pokemonModel.findOne({
        $or: [
          ...(!isNaN(+searchTerm) ? [{ no: searchTerm }] : []),
          ...(isValidObjectId(searchTerm) ? [{ _id: searchTerm }] : []),
          { name: searchTerm.toLowerCase().trim() },
        ],
      });

      if (!pokemon)
        throw new NotFoundException(
          `Pokemon with search term '${searchTerm}' not found`,
        );

      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(searchTerm: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(searchTerm);
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();

      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const pokemon: Pokemon = await this.pokemonModel.findByIdAndDelete(id);
      if (!pokemon)
        throw new NotFoundException(`Pokemon with id '${id}' not found`);

      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000)
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );

    if (error.status === 404) throw new NotFoundException(error.message);

    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }
}
