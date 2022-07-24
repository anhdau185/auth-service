import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import hashData from '../shared/utils/hashData';
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

    const hashedToken = await hashData(data.token);
    const processedData: TokenDto = {
      ...data,
      token: hashedToken,
    };

    return this.tokensRepository.save(processedData);
  }

  private async deleteIfExists(where: FindOptionsWhere<Token>): Promise<void> {
    const existingRecord = await this.tokensRepository.findOneBy(where);
    if (existingRecord == null) return;
    await this.tokensRepository.delete(existingRecord.id);
  }
}
