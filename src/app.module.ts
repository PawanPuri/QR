import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { VCardModule } from './vcard/vcard.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"], // Corrected here
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("DATABASE_URL"), // Added type for configService.get
      }),
      inject: [ConfigService],
    })
    
    
    ,AuthModule,VCardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
