import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GenerationController } from './controllers/generation.controller';
import { PromptGeneratorService } from './services/prompt_generator.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { FirebaseThrottlerGuard } from '../auth/guard/firebase-throttler.guard';
import { GenerationsService } from './services/generations.service';
import { FirebaseProvider } from 'src/providers/firebase.provider';
import { GenerationConverter } from './converters/generation.converter';
import { UsersService } from '../users/users.service';
import { UserConverter } from '../users/converters/user.converter';
import { LocationsService } from '../locations/locations.service';
import { LocationConverter } from '../locations/converters/location.converter';
import { StylesService } from '../styles/styles.service';
import { StyleConverter } from '../styles/converters/style.converter';

@Module({
    controllers: [GenerationController],
    providers: [PromptGeneratorService, GenerationsService, FirebaseProvider, GenerationConverter, UsersService, UserConverter, LocationConverter, LocationsService, StylesService, StyleConverter],
})
export class GenerationModule{
    /*configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(RateLimitMiddleware)
        .forRoutes(GenerationController);
    }*/
}
