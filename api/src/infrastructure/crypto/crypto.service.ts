import { Injectable } from '@nestjs/common';
import { hash, compare} from 'bcrypt';

@Injectable()
export class CryptoService {

  async createPassword(rawPassword: string): Promise<string> {
    return hash(rawPassword, 10);
  }

  async verifyPassword(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(rawPassword, hashedPassword);
  }
}