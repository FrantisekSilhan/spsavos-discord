import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminService {
    async default(): Promise<string> {
        return 'Hello admin!';
    }
}