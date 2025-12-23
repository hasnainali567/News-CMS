class ApiError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
        if(this.stack) {
            this.stack = this.stack;
        }
        
    }
}

export default ApiError;