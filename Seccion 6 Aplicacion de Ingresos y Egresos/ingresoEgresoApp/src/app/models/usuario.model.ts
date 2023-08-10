export class User {
    static fromFirebase: any;
    constructor (
        public uid: string,
        public nombre: string,
        public email: string
    ){}
}