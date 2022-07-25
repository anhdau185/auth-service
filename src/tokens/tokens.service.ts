import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import hashData from '../shared/utils/hashData';
import getTokenSignature from '../shared/utils/getTokenSignature';
import { Token } from './token.entity';
import { TokenDto } from './token.dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private readonly tokensRepository: Repository<Token>,
  ) {}

  async saveNewTokenForUser(data: TokenDto): Promise<Token> {
    await this.deleteIfExists({ userId: data.userId });

    const tokenSignature = getTokenSignature(data.token);
    const hashedTokenSignature = await hashData(tokenSignature);

    const processedData: TokenDto = {
      ...data,
      token: hashedTokenSignature,
    };
    return this.tokensRepository.save(processedData);
  }

  async findOneToken(where: FindOptionsWhere<Token>): Promise<Token> {
    return this.tokensRepository.findOneBy(where);
  }

  async deleteIfExists(where: FindOptionsWhere<Token>): Promise<void> {
    const existingRecord = await this.findOneToken(where);
    if (existingRecord == null) return;
    await this.tokensRepository.delete(existingRecord.id);
  }
}
