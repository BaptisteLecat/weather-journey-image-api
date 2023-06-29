import { AuthGuard } from "@nestjs/passport";
import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { AuthUser } from "../entity/auth-user.entity";
import { INVALID_TOKEN, TOKEN_NOT_FOUND } from "src/errors/errors.constants";
import { auth } from "firebase-admin";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        console.log('JwtAuthGuard');
        if(info != undefined) {
            throw new BadRequestException(TOKEN_NOT_FOUND);
        }
        if (err) {
            throw err || new UnauthorizedException(INVALID_TOKEN);
        }
        const authUser = AuthUser.fromJson(user);
        if (authUser == null || authUser == undefined || authUser.id == null) {
            throw new BadRequestException(TOKEN_NOT_FOUND);
        }
        return user;
    }
}