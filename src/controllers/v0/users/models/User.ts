import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  
  @PrimaryKey
  @Column(DataType.STRING)
  public email!: string;


  @Column(DataType.STRING)
  public firstname!: string; 

  @Column(DataType.STRING)
  public surname!: string; 

  @Column(DataType.STRING)
  public number!: string; 

  @Column(DataType.STRING)
  public password_hash!: string; // for nullable fields

  short() {
    return {
      email: this.email
    }
  }
}