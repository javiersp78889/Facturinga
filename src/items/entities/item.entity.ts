import { Factura } from "src/factura/entities/factura.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: 'varchar', length: 60 })
    name: string;
    @Column({ type: 'varchar', length: 200 })
    description: string;
    @Column({ type: 'int' })
    quantity: number;
    @Column({ type: 'int' })
    price: number;

    @ManyToOne(() => Factura, factura => factura.items)
    @JoinColumn({ name: 'facturaId' }) // Clave foránea en Factura
    factura: Factura;

    @Column({ type: 'int' }) // Clave foránea explícita
    facturaId: number;

}
