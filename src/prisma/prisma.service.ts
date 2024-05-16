// src/prisma/prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {

    async onModuleInit() {
        this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}