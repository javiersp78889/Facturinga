import { Item } from "src/items/entities/item.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Factura {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 60 })
    name: string;
    @Column({ type: 'varchar', length: 60 })
    cedula: string;
    @Column({ type: 'varchar', length: 60, nullable: true , default:''})
    email: string;
    @Column({ type: 'varchar', length: 200 })
    motivo: string;
    @Column({ type: 'int' })
    total: number;
    // Relación con User (Muchos a Uno)
    @ManyToOne(() => User, user => user.facturas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' }) // Clave foránea en Factura
    user: User;

    @Column({ type: 'int' }) // Clave foránea explícita
    userId: number;

    // Relación con Items (Uno a Muchos)
    @OneToMany(() => Item, item => item.factura)
    items: Item[];

}
