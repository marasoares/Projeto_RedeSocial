import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { SeguindoModule } from './seguindo/seguindo.module';
import { TweetModule } from './tweet/tweet.module';
import { SeguidoresModule } from './seguidores/seguidores.module';

@Module({
  imports: [UsuarioModule, SeguidoresModule, SeguindoModule, TweetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
