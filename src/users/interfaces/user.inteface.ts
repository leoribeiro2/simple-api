import { Document } from 'mongoose';

export interface User extends Document {
    nome: string;
    email: number;
    senha: string;
    telefones: [Telephones];
    ultimo_login: Date;

    validatePass(pass: string): boolean;
    save(): User;
}

interface Telephones {
    ddd: string;
    numero: string;
}
