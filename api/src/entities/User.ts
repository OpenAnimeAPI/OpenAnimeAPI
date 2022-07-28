import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('users')
class User extends BaseEntity {

    constructor(
        id: number,
        email: string,
        password: string,
        created_at: Date,
        updated_at: Date
    ) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
    };

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "varchar", length: 255 })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};

export default User;