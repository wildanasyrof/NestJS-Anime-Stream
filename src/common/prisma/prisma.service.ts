import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient, Prisma } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, string> implements OnModuleInit {

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {
        super({
            log: [
                { emit: "event", level: "query" },
                { emit: "event", level: "info" },
                { emit: "event", level: "warn" },
                { emit: "event", level: "error" }
            ],
        });
    }

    onModuleInit() {
        this.$on("query", (e) => {
            this.logger.debug(JSON.stringify(e.query));
        });
        this.$on("info", (e) => {
            this.logger.info(JSON.stringify(e));
        });
        this.$on("warn", (e) => {
            this.logger.warn(JSON.stringify(e));
        });
        this.$on("error", (e) => {
            this.logger.error(JSON.stringify(e));
        });
    }
}
