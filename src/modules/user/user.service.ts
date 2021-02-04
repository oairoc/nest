import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    findOne(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async add(body: any): Promise<void> {
        await this.userRepository.save(body)
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    // 注册
    async register(body: any): Promise<any> {
        const { name, age, mobile, psd } = body;
        const user = await this.userRepository.findOne({ "mobile": mobile })
        if (user) {
            return {
                code: 400,
                msg: '用户已存在',
            };
        }
        const sql = `
          INSERT INTO user
            (id, name, age, mobile, psd, admin)
          VALUES
            (2, '${name}', '${age}', '${mobile}', '${psd}', 0)
        `;
        try {
            await this.userRepository.query(sql);
            return {
                code: 200,
                msg: 'Success',
            };
        } catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }


}
