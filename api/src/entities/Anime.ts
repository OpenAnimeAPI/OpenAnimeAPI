import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('animes')
class Anime extends BaseEntity {

    constructor(
        id: number,
        title: string,
        description: string,
        format: string,
        episodes: number,
        status: string,
        start_date: Date,
        end_date: Date
    ) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.format = format;
        this.episodes = episodes;
        this.status = status;
        this.start_date = start_date;
        this.end_date = end_date;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    title: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "varchar", nullable: false })
    format: string;

    @Column({ type: "int", nullable: true })
    episodes: number;

    @Column({ type: "varchar", nullable: true })
    status: string;

    @CreateDateColumn()
    start_date: Date;

    @UpdateDateColumn()
    end_date: Date;
};

export default Anime;