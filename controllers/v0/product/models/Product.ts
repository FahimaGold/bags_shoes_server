  
import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, ForeignKey} from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {

    @Column
    public brand: string;

    @Column
    public price: number;

    @Column
    public description!: string;

    @Column
    public imgUrl!: string;

    @Column
    public cateogry: string;

  
}

 