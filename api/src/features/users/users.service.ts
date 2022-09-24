import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateUserRequestDTO } from "./dtos/CreateUserRequest";
import { User } from "./user.entity";
import {InjectRepository} from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { LoginResponseDTO } from "./dtos/LoginResponse";
import { LoginRequestDTO } from "./dtos/LoginRequest";
import { CryptoService } from "src/infrastructure/crypto/crypto.service";

@Injectable()
export class UsersServices {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    protected readonly cryptoService: CryptoService,
  ) {}

  private async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email }
    });
  }

  private getUserToken(userData: User): LoginResponseDTO {
    const expiresIn = '12h';

    delete userData.password;

    const token = sign(Object.assign({}, userData), process.env.TOKEN_SECRET || 'secret', { expiresIn });

    return {
      accessToken: token,
      expiresIn
    }
  }

  public async createUser(payload: CreateUserRequestDTO): Promise<LoginResponseDTO> {
    const hasUser = !!(await this.getUserByEmail(payload.email));

    if(hasUser) {
      throw new ConflictException();
    }

    const user = { 
      ...payload, 
      password: await this.cryptoService.createPassword(payload.password) 
    };

    const res = await this.userRepository.save(user);

    return this.getUserToken(res);
  }

  public async login(payload: LoginRequestDTO) {
    const user = await this.getUserByEmail(payload.email);

    if(!user) {
      throw new NotFoundException();
    }

    const isPasswordCorrect = await this.cryptoService.verifyPassword(payload.password, user.password)

    if(!isPasswordCorrect) throw new NotFoundException();

    return this.getUserToken(user);
  }
}