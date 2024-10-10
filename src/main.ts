import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});

  // Serve static files for the 'uploads' folder
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
 
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'http://localhost:3002'], // Allow image loading from your backend server
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );

  // Enable CORS with specific options
  app.enableCors({
    // origin: 'http://localhost:3000', // Allow requests from this origin
    // methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
    // credentials: true, // Allow cookies or authentication tokens (like JWT)
    // allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  await app.listen(3002);
}
bootstrap();
