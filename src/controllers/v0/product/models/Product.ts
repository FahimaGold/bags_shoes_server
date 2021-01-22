  
import {Table, Column, Model, PrimaryKey, DataType, AutoIncrement, BelongsToMany} from 'sequelize-typescript';

import {User} from '../../users/models/User'; 
import {Cart} from '../../cart/models/Cart'; 

@Table
export class Product extends Model<Product> {

    @Column(DataType.TEXT)
    public brand!: string;

    @Column(DataType.DECIMAL)
    public price!: number;
    
    @Column(DataType.INTEGER)
    public inventory!: number;

    @Column(DataType.STRING)
    public description!: string;

    @Column(DataType.STRING)
    public imgUrl!: string;

    @Column(DataType.STRING)
    public category!: string;

    @BelongsToMany(() => User, () => Cart)
    users: User[];

   
}

 