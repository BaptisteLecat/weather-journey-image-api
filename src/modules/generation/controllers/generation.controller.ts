import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { PromptGeneratorService } from '../services/prompt_generator.service';
import { ImageGeneratorService } from '../services/image_generator.service';
import { GeneratedImage } from '../entities/generated-image.entities';
import { CustomLogging } from 'src/modules/logging/custom-logging';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/modules/auth/guard/api-key-auth.guard';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { FirebaseThrottlerGuard } from 'src/modules/auth/guard/firebase-throttler.guard';

@UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiBearerAuth('ApiKey')
@Controller({
  version: '1',
  path: 'generations'
})
export class GenerationController {
  private readonly logger = new CustomLogging(GenerationController.name);
  constructor(@Inject(PromptGeneratorService) private readonly promptGenerationService: PromptGeneratorService, @Inject(ImageGeneratorService) private readonly imageGeneratorService) {}

  @Get()
  async getGeneration(): Promise<GeneratedImage> {
    this.logger.log('Generating prompt');
    const prompt = await this.promptGenerationService.generatePrompt();
    this.logger.log('Generating image');
    return await this.imageGeneratorService.generateImage(prompt);
  }
}
