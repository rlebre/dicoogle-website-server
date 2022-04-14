import { BadRequestException, Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { DownloadRequestService } from './download-request.service';
import { CreateDownloadRequestDto } from './dto/create-dl-request.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('download')
export class DownloadRequestController {
    constructor(private readonly downloadRequestService: DownloadRequestService) { }

    @Post('request')
    async create(@Body() downloadRequest: CreateDownloadRequestDto & CreateUserDto) {
        const user = plainToClass(CreateUserDto, downloadRequest);
        let errors = await validate(user)
        if (errors.length > 0) {
            throw new BadRequestException(errors[0].constraints[Object.keys(errors[0].constraints)[0]]);
        }

        const download = plainToClass(CreateDownloadRequestDto, downloadRequest);
        errors = await validate(download)
        if (errors.length > 0) {
            throw new BadRequestException(errors[0].constraints[Object.keys(errors[0].constraints)[0]]);
        }

        return this.downloadRequestService.create(downloadRequest);
    }

    @Get(':hash')
    async get(@Res() res, @Param('hash') hash: string) {
        const download = await this.downloadRequestService.getLink(hash);
        return res.redirect(download.downloadLink)
    }
}
