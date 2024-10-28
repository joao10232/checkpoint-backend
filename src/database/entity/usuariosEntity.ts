import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('usuarios')
export class UsuarioEntity {
    @PrimaryGeneratedColumn({type:'bigint', unsigned: true})
    usuario_id?: number

    @Column({type: 'varchar', length: 255, nullable: false})
    usuario_nome?: string

    @Column({type: 'varchar', length: 255, nullable: false, unique: true})
    usuario_email?: string    

    @Column({type: 'varchar', length: 255, nullable: false})
    usuario_password?: string

    @Column({type: 'date', nullable: true, default: null})
    usuario_ultimoAcesso?: Date

    @Column ({type: 'enum',  enum: ['Ativo', 'Inativo'], default: 'Inativo'})
    usuario_status?: 'Ativo' | 'Inativo'
    
    @UpdateDateColumn({name: 'updated_At'})
    updated_At?: Date
    
    @CreateDateColumn({name: 'created_At'})
    created_At?: Date    
}