export class AuthRequiredException extends Error {
    constructor(message = 'Login required!') {
        super(message)
        this.name = 'AuthRequiredError'
    }
};