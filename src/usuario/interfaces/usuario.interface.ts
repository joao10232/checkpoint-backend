export interface UsuarioInterface {
    usuario_id?: number
    usuario_nome: string
    usuario_email: string
    usuario_password: string
    usuario_ultimoAcesso?: Date    
    usuario_status?: 'Ativo' | 'Inativo'    
    updated_At?: Date
    created_At?: Date
}

export interface UsuarioResultInterface{
    success: boolean,
    message?: string,   // Mensagem opcional para informações adicionais
    data?: any,  // Dados da pessoa criada, caso tenha sucesso
    error?: string | Error  // Mensagem de erro opcional
    code?: any
}

export type SingleUserProperty<T> = { // tipo que serve para receber apenas uma propriedade do tipo definido
    [K in keyof T]: Pick<T, K>
}[keyof T]
