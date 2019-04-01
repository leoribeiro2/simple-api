import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    nome: String,
    email: {
        type: String,
        unique: true,
    },
    senha: String,
    telefones: [{
        numero: String,
        ddd: String,
    }],
    ultimo_login: Date,
}, { timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' }, versionKey: false });

UserSchema.pre('save', function(next) {
    if (this.isModified('senha')) {
        this.senha = bcrypt.hashSync(this.senha, 2);
        next();
    }
    next();
});

UserSchema.methods.validatePass = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.senha, (err, res) => {
            resolve(res);
        });
    });
};
