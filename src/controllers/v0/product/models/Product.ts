  
import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, ForeignKey, DataType} from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {

    @Column(DataType.TEXT)
    public brand!: string;

    @Column(DataType.DECIMAL)
    public price!: number;

    @Column(DataType.STRING)
    public description!: string;

    @Column(DataType.STRING)
    public imgUrl!: string;

    @Column(DataType.STRING)
    public category!: string;
}

 