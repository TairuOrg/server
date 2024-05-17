import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create() {
        return 'si';
    }

    async findUser(email: string, password: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email,
                password: password,
            },
        });

    }
}

