import {Table, Column, Model, HasMany, PrimaryKey, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { Product } from '../../product/models/Product';
import { User } from '../../users/models/User';

@Table

export class Cart extends Model<Cart>{

    @ForeignKey(() => User)
    @PrimaryKey
    @Column(DataType.INTEGER)
    public userId: number;

    @ForeignKey(() => Product)
    @PrimaryKey
    @Column(DataType.INTEGER)
    public productId: number;
   
    

}