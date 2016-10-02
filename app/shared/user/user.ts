var validator = require("email-validator");

export class User {
    email: string;
    password: string;
    displayname: string;
    isValidEmail() {
        return validator.validate(this.email);
    }
}