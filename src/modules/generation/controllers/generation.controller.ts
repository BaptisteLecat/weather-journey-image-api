import { Body, Controller, Get, Inject, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { PromptGeneratorService } from '../services/prompt_generator.service';
import { GeneratedImage } from '../entities/generated-image.entities';
import { CustomLogging } from 'src/modules/logging/custom-logging';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/modules/auth/guard/api-key-auth.guard';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { FirebaseThrottlerGuard } from 'src/modules/auth/guard/firebase-throttler.guard';
import { Generation } from '../entities/generation.entity';
import { GenerationsService } from '../services/generations.service';
import { parse } from 'path';
import { LocationsService } from 'src/modules/locations/locations.service';
import { CreateGenerationDto } from '../dto/create-generation.dto';
import { UsersService } from 'src/modules/users/users.service';

@UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiBearerAuth('ApiKey')
@Controller({
  version: '1',
  path: 'locations/:locationId/generations'
})
export class GenerationController {
  private readonly logger = new CustomLogging(GenerationController.name);
  constructor(@Inject(PromptGeneratorService) private readonly promptGenerationService: PromptGeneratorService, @Inject(GenerationsService) private readonly generationService: GenerationsService, @Inject(LocationsService) private readonly locationService: LocationsService, @Inject(UsersService) private readonly userService : UsersService) { }

  @ApiParam({ name: 'locationId', type: String })
  @ApiBody({ type: CreateGenerationDto })
  @Post()
  async getGeneration(@Request() request, @Param('locationId') locationId: string, @Body() createGeneration : CreateGenerationDto): Promise<Generation> {
    let generation: Generation | null = null;
    const appUser = request.user;
    locationId = decodeURIComponent(locationId);
    console.log(locationId);
    this.logger.log('Getting user data');
    const user = await this.userService.findOne(appUser.id);
    this.logger.log('Checking if the location exists');
    const location = await this.locationService.findOne(locationId, user.id);
    if (!location) {
      this.logger.log('Location does not exist');
      throw new NotFoundException( `Location with id ${locationId} does not exist`);
    }
    this.logger.log('Generating prompt');
    const prompt = await this.promptGenerationService.generatePrompt(user.style, createGeneration.time, location.city, createGeneration.weather);
    this.logger.log('Starting image generation');
    generation = await this.generationService.create(null, user.id, location.id, prompt);
    return generation;
  }
}
