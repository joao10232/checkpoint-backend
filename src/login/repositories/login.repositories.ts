import { DeleteResult, QueryFailedError, Repository, Like } from "typeorm";
import { databaseConnection } from "../../database/connection/connect";
import { UsuarioEntity } from "../../database/entity/usuariosEntity";
import { UsuarioInterface } from "../../usuario/interfaces/usuario.interface";



/**
 *Classe responsável por Integrar com a entidade UsuarioEntity
*/
export class LoginRepository {
    private repository: Repository<UsuarioEntity>

    constructor() {
        this.repository = databaseConnection.getRepository(UsuarioEntity)
    }

    /**
   * Método consultar Login  
   * @param {U} [el={}] - Pode receber um Objeto de consulta ou vazio (Partial<T>)
   * @returns {Promise<[]>} - retorna Objeto(s) da Consulta ou erro.
   */
    async email(el: Pick<UsuarioInterface, 'usuario_email'>): Promise<UsuarioEntity | Error> {
        try {

            const query = await this.repository.findOne({
                where: { usuario_email: el.usuario_email }
            })
            if(!query){
                throw new Error("Usuário não encontrado")
            }
            return query         
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw {
                    name: error.name,
                    message: error.message
                }
            } else {
                throw {
                    name: 'Erro ao consultar Registro!',
                    message: error
                }
            }
        }
    }
}
