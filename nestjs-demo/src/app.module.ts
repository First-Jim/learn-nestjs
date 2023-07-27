import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './configuration';
const Joi = require('joi');
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entiry';
import { Profile } from './user/profile.entity';
import { Roles } from './roles/roles.entity';
import { Logs } from './logs/logs.entity';
console.log('config: ', config.get('db'));
// ConfigModule.forRoot() 可以读取.env 的变量
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //除了appModule外,其他模块都可以读取.env
      load: [Configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3306),
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     console.log('11', configService.get('db'));
    //     return {};
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'testdb',
      entities: [User, Profile, Roles, Logs],
      // 同步本地的schema 与数据库
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
