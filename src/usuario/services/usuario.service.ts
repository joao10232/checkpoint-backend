import { DeleteResult, QueryFailedError } from "typeorm"
import { CryptoData } from "../../utility/bcrypt/cryptoData" 
import { UsuarioInterface, UsuarioResultInterface } from "../interfaces/usuario.interface"
import { UsuarioRepository } from "../repositories/usuario.repositories"

export class UsuarioService {
    private repoUsuario: UsuarioRepository

    constructor() {
        this.repoUsuario = new UsuarioRepository()
    }

    /**
    * Adiciona um novo usuario.
    * @param usuario - Dados do usuario a ser adicionado
    * @returns Resultado da operação
    */
    async addUsuario(usuario: UsuarioInterface): Promise<UsuarioResultInterface> {

        try {
            const passwordHash = await new CryptoData().create(usuario.usuario_password)
            const createUsuario = await this.repoUsuario.create({ ...usuario, usuario_password: passwordHash })
            if (!createUsuario || createUsuario instanceof Error) { //garatindo a tipagem para  o retorno de create usuario
                return {
                    success: false,
                    message: 'Erro ao adicionar registro!',
                    error: createUsuario
                }
            }
            delete createUsuario.usuario_password //removendo a senha do retorno
            return {
                success: true,
                message: 'Usuario cadastrado com sucesso!',
                data: createUsuario
            }
        } catch (error) {
            if ((error as any).code === 'ER_DUP_ENTRY') {
                return {
                    success: false,
                    error: (error as any).code,
                    message: 'os dados informados já estão em uso',
                }
            }
            return {
                success: false,
                message: 'Erro ao adicionar registro!',
                error: error as any
            }
        }
    }


    /**
    * Busca um usuario.
    * @param queryParameter - Parametro da consulta
    * @returns retorno da consulta
   */
    async searchUsuario(queryParameter: { [key: string]: string }): Promise<UsuarioResultInterface> {
        const arrParameters = Object.keys(queryParameter)
        const parameter = arrParameters[0]
        const valorParameter = queryParameter[parameter]

        const searchUsuario = await this.repoUsuario.search({ [parameter]: valorParameter })
        if (searchUsuario instanceof Error) {
            return {
                success: false,
                message: 'Erro ao Consultar Usuario',
                error: searchUsuario
            }
        } else {
            return {
                success: true,
                message: 'Consulta realizada com sucesso!',
                data: searchUsuario
            }
        }
    }

    /**
    * Edita um usuario.
    * @param parm - Parametro da consulta
    * @returns retorno da consulta
    */
    async editUsuario(usuarioId: number, usuario: UsuarioInterface): Promise<UsuarioResultInterface> {
        try {
            //verifica password, se sim, criptografa se não, não
            const DadosEditUser = async () => {
                if (usuario.usuario_password) {
                    const passwordHash = await new CryptoData().create(usuario.usuario_password)
                    return { ...usuario, usuario_password: passwordHash }
                } else {
                    return usuario
                }
            }
            const editUsuario = await this.repoUsuario.edit(
                { 'usuario_id': usuarioId },
                await DadosEditUser()
            )

            if (!editUsuario || editUsuario instanceof Error) {
                return {
                    success: false,
                    message: 'Erro ao Editar registro!',
                    error: editUsuario
                }
            }
            delete editUsuario.usuario_password //removendo a senha do retorno do edit
            return {
                success: true,
                message: 'Registro alterado com sucesso!',
                data: editUsuario
            }
        } catch (error) {
            if ((error as any).code === 'ER_DUP_ENTRY') {
                return {
                    success: false,
                    error: (error as any).code,
                    message: 'os dados informados já estão em uso',
                }
            }
            return {
                success: false,
                message: 'Erro ao Editar registro!',
                error: error as any
            }
        }
    }

    /**
* Deleta usuario.
* @param parm - Parametro da consulta
* @returns retorno da consulta
*/
    async deleteUsuario(usuarioId: number) {
        try {
            const repositoryMethods: DeleteResult | Error = await this.repoUsuario.delete({ usuario_id: usuarioId })

            if (repositoryMethods instanceof Error) {
                return {
                    success: false,
                    status: 400,
                    message: 'Erro ao deletar registro',
                    error: repositoryMethods
                }
            }

            if (!repositoryMethods.affected || repositoryMethods.affected === 0) {
                return {
                    success: true,
                    status: 200,
                    message: 'Nenhum Registro deletado',
                }
            }
            return {
                success: true,
                status: 200,
                message: 'Registro deletado'
            }

        } catch (error: unknown) {
            if((error as any).name == 'QueryFailedError'){               
                if ((error as any).code === 'ER_ROW_IS_REFERENCED_2') {
                    return {
                        success: false,
                        status: 409,
                        message: 'A pessoa não pode ser deletada pois existem registros vinculados!',
                        error: (error as any).code
                    }
                    //adicionar outros erros que queira tratar
                } else {
                    return {
                        success: false,
                        status: 400,
                        message: 'Erro ao Deletar registro',
                        error: (error as any).code
                    }
                }                
            } else{
                return {
                    success: false,
                    status: 400,
                    message: 'Erro desconhecido ocorreu.',
                    error: error
                }
            }
        }
    }
}

