class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }

    }
}

export default ApiError;