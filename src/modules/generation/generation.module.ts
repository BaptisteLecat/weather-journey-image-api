import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GenerationController } from './controllers/generation.controller';
import { ImageGeneratorService } from './services/image_generator.service';
import { PromptGeneratorService } from './services/prompt_generator.service';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { FirebaseThrottlerGuard } from '../auth/guard/firebase-throttler.guard';

@Module({
    controllers: [GenerationController],
    providers: [ImageGeneratorService, PromptGeneratorService],
})
export class GenerationModule{
    /*configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(RateLimitMiddleware)
        .forRoutes(GenerationController);
    }*/
}
