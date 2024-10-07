import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AppAuthMiddleware } from "src/middlewares/appauth.middleware";
import { AdminMiddleware } from "src/middlewares/admin.middleware";
import { AdminService } from "./admin.service";

@Module({
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppAuthMiddleware).forRoutes('admin');
        consumer.apply(AdminMiddleware).forRoutes('admin');
        consumer.apply(AppAuthMiddleware).forRoutes('admin/*');
        consumer.apply(AdminMiddleware).forRoutes('admin/*');
    }
}