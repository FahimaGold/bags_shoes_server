import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, DataType, BelongsToMany, AutoIncrement} from 'sequelize-typescript';

import {Product} from '../../product/models/Product'; 
import {Cart} from '../../cart/models/Cart'; 

@Table
export class User extends Model<User> {
  
  @Column(DataType.STRING)
  public email!: string;

  @Column(DataType.STRING)
  public firstname!: string; 

  @Column(DataType.STRING)
  public surname!: string; 

  @Column(DataType.STRING)
  public number!: string; 

  @Column(DataType.STRING)
  public password_hash!: string; 

  @BelongsToMany(() => Product, () => Cart)
    products: Product[];

  short() {
    return {
      email: this.email
    }
  }
}