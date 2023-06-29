import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {

    async use(req: Request, res: Response, next: NextFunction) {
        //const userId = req.user.uid; // Extract user ID from JWT
        console.log('RateLimitMiddleware');
        //console.log(req);
        next();
        /*const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        // Get number of requests in the last 24 hours
        const requests = await this.userRequestModel.countDocuments({
            userId: userId,
            requestTime: { $gte: yesterday },
        });

        if (requests >= 100) {
            res.status(429).send('Trop de requêtes. Veuillez réessayer plus tard.');
        } else {
            const userRequest = new this.userRequestModel({ userId: userId, requestTime: new Date() });
            await userRequest.save();
            next();
        }*/
    }
}
