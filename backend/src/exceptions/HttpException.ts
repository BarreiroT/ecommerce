import { ValidationError } from 'express-validator';

export class HttpException extends Error {
    statusCode: number;
    data?: ValidationError[];

    constructor(statusCode: number, message: string, data?: ValidationError[]) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

export class NotValidException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}

export class ServerException extends HttpException {
    constructor(message: string) {
        super(500, message);
    }
}

export class UnprocessableEntity extends HttpException {
    constructor(message: string, errors: ValidationError[]) {
        super(422, message, errors);
    }
}
