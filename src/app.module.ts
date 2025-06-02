import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PartnersModule } from './partners/partners.module';
import { ActivitiesModule } from './activities/activities.module';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'site-api',
      synchronize: true, // apenas para desenvolvimento
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    PostsModule,
    PartnersModule,
    ActivitiesModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
