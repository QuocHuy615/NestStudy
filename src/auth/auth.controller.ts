import { Controller, Post, Request, Get, UseGuards } from "@nestjs/common";
import { Public } from "../decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    hanldeLogin(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    getProfile(@Request() req) {
        return req.user;
    }
}