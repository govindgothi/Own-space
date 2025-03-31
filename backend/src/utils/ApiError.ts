class ApiError extends Error {
    statusCode: number;
    data: null;
    success: boolean;
    errors: string[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: string[] = [],
        stack?: string
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype); // Fix prototype chain
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message, // Ensure message is serializable
            data: this.data,
            success: this.success,
            errors: this.errors,
        };
    }
}
export {ApiError}