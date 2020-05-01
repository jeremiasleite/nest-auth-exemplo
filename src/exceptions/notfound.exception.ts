import { NotFoundException } from "@nestjs/common";

export class CostumeNotFoundException extends NotFoundException {
    constructor(message: string) {
        super(message);
    }
}