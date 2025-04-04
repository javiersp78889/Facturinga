import { Factura } from "src/factura/entities/factura.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 60 })
    name: string;
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;
    @Column({ type: 'varchar', length: 100, unique: true })
    ruc: string;
    @Column({ type: 'varchar', length: 200, default: 'default.svg' })
    image: string;
    @Column({ type: 'varchar', length: 6, nullable: true })
    token: string
    @Column({ type: 'boolean', nullable: true, default: true })
    membresia: boolean
    @Column({ type: 'date', nullable: true })
    expDate: Date
    @Column({ type: 'boolean', nullable: true, default: false })
    auth: boolean
    @Column({ type: 'varchar', length: 100 })
    password: string;

    // Relación con Factura (Uno a Muchos)
    @OneToMany(() => Factura, factura => factura.user)
    facturas: Factura[];


}
