import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Controller('tweet')
export class TweetController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.createPrisma(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetService.findAllPrisma();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetService.findOnePrisma(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetService.updatePrisma(+id, updateTweetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tweetService.removePrisma(+id);
  }
}
