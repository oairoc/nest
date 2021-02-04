import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('findOne')
    findOne(@Query() id: number) {
        return this.userService.findOne(id)
    }

    @Get('findAll')
    findAll() {
        return this.userService.findAll()
    }

    @Post('add')
    add(@Body() body: any) {
        return this.userService.add(body)
    }

    @Post('del')
    remove(@Query() id: number) {
        return this.userService.remove(id)
    }

    @Post('register')
    async register(@Body() body: any) {
        return await this.userService.register(body);
    }

}
