export class Api_error extends Error {
    constructor(message, code, statusCode) {
        super(message);
        this.name = "Api_Error";
        this.codeName = code;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    }
}