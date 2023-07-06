import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { PromptGeneratorService } from '../services/prompt_generator.service';
import { GeneratedImage } from '../entities/generated-image.entities';
import { CustomLogging } from 'src/modules/logging/custom-logging';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/modules/auth/guard/api-key-auth.guard';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { FirebaseThrottlerGuard } from 'src/modules/auth/guard/firebase-throttler.guard';
import { Generation } from '../entities/generation.entity';
import { GenerationsService } from '../services/generations.service';
import { parse } from 'path';

@UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiBearerAuth('ApiKey')
@Controller({
  version: '1',
  path: 'generations'
})
export class GenerationController {
  private readonly logger = new CustomLogging(GenerationController.name);
  constructor(@Inject(PromptGeneratorService) private readonly promptGenerationService: PromptGeneratorService, @Inject(GenerationsService) private readonly generationService : GenerationsService) {}

  @Get()
  async getGeneration(@Request() request): Promise<Generation> {
    let generation : Generation | null = null;
    const user = request.user;
    this.logger.log('Generating prompt');
    const prompt = await this.promptGenerationService.generatePrompt();
    this.logger.log('Starting image generation');
    generation = await this.generationService.create(null, user.id, prompt);
    return generation;
  }
}
