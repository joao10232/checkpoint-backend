import { DeleteResult, QueryFailedError } from "typeorm"
import { CryptoData } from "../../utility/bcrypt/cryptoData"
import { UsuarioRepository } from "../../usuario/repositories/usuario.repositories"
import { LoginRepository } from "../repositories/login.repositories"
import { sign } from "jsonwebtoken"

export class loginService {
    private repoLogin: LoginRepository

    constructor() {
        this.repoLogin = new LoginRepository()
    }

    /**
    * Verifica Email
    * @param login - Login a ser verificado
    * @returns Resultado da operação
    */
    async verificaLogin(login: string, password: string) {

        try {
            const email = await this.repoLogin.email({ usuario_email: login })
            if (email instanceof Error) {
                return {
                    success: false,
                    message: 'Usuario Inválido',
                    error: email
                }
            } else {
                if (email.usuario_password) {
                    //retorno usuario //verifica senha
                    const verifcaSenha = await new CryptoData().verify(password, email.usuario_password)
                    if (!verifcaSenha) {
                        return {
                            success: false,
                            message: 'Senha Inválida'
                        }
                    } else {
                        const token = sign({ sub: String(email.usuario_id), permissions: ['user', 'pessoa'] }, "e261b609570a6ad4484db9fe7cf240b2", {   //usar um env
                            expiresIn: '5min'
                        })
                        delete email.usuario_password //removendo a senha do retorno
                        return {
                            success: true,
                            message: 'Login localizado',
                            error: token
                        }
                    }
                }else {
                    return {
                        success: false,
                        message: 'Senha Não Informada'                      
                    }
                }
            }
        } catch (error) {
            return {
                success: false,
                message: 'Login não localizado',
                error: error
            }
        }
    }
}