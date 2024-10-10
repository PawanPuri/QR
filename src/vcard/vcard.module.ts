import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VCardController } from './vcard.controller';
import { VCardService } from './vcard.service';
import { VCard, VCardSchema } from 'src/schema/vCard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VCard.name, schema: VCardSchema }]),
  ],
   
  providers: [VCardService],
  controllers: [VCardController],
})
export class VCardModule {}
