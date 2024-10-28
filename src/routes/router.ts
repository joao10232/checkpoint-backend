import express from 'express'
import { Request, Response } from 'express'
import { usuarioAddControlle, usuarioEditController, usuarioSearchController, usuarioDeleteController } from '../usuario/controllers/usuario.controller'
import { autenticaUserController } from '../login/controllers/usuariosLogin.controller'

export const router = express.Router()

//teste rota publica
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ "server": "Online" })
})

// CRUD USUARIO
router.post('/usuarios/add', usuarioAddControlle) 
router.get('/usuarios/search', usuarioSearchController)
router.put('/usuarios/edit/:id', usuarioEditController)
//router.delete('/usuarios/delete/:id', usuarioDeleteController)


//login
//autenticar (/login)
router.post('/usuario/login', autenticaUserController)
//router.post('/usuario/logout'logoutMiddleware)