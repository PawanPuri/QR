
import {
    Controller,
    Get,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
    Param,
    NotFoundException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { VCardService } from './vcard.service';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  @Controller('vcard')
  export class VCardController {
    constructor(private readonly vCardService: VCardService) {}
  
    // @Post()
    // @UseInterceptors(
    //   FileInterceptor('image', {
    //     storage: diskStorage({
    //       destination: './uploads',
    //       filename: (req, file, cb) => {
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //         const ext = extname(file.originalname);
    //         cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    //       },
    //     }),
    //   }),
    // )
    // async createVCard(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    //   const imageUrl = file ? `/uploads/${file.filename}` : null;
    //   const newVCard = { ...body, imageUrl };
    //   return this.vCardService.create(newVCard);
    // }
       @Post()
      @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './uploads',  // Make sure this matches the path served by staticAssets
            filename: (req, file, cb) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = extname(file.originalname);
              cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
          }),
        }),
      )
async createVCard(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
  const imageUrl = file ? `/uploads/${file.filename}` : null;  // Correctly stores the image path
  const newVCard = { ...body, imageUrl };
  return this.vCardService.create(newVCard);
}

  
    @Get()
    async findAll() {
      return this.vCardService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
      console.log(`Fetching vCard with ID: ${id}`);
      const vCard = await this.vCardService.findById(id);
      if (!vCard) {
        throw new NotFoundException(`VCard with ID ${id} not found`);
      }
      return vCard;
    }
  }
  