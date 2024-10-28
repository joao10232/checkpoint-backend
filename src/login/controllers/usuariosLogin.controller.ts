import { Request, Response } from "express"
import { databaseConnection } from "../../database/connection/connect"
import { UsuarioEntity } from "../../database/entity/usuariosEntity"
import { CryptoData } from "../../utility/bcrypt/cryptoData"
import { promises } from "dns"
import { loginService } from "../services/usuariosLogin.service"


export const autenticaUserController = async (req: Request, res: Response) => {
    //ajustar para realizar o search
    const { usuario_email, usuario_password } = req.body
    const service = new loginService()    
    try {
        const response = await service.verificaLogin(usuario_email, usuario_password)
        if (response.success == false) {
            res.status(400).json(response)
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
