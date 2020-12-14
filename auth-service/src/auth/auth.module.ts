import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { JWT_CONFIG, USER_SERVICE } from '../app.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.startegy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([{ name: USER_SERVICE, transport: Transport.TCP }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get(JWT_CONFIG);
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [
    {
      provide: USER_SERVICE,
      useFactory: (configService: ConfigService) => {
        const options = configService.get(USER_SERVICE);
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
