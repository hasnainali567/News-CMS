class ApiResponse {
    constructor(status = 200, message = 'Success', data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;