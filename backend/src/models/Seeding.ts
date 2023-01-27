import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

@Table({ timestamps: false })
class Seeding extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;
  
  @Column
  started!: Date;

  @AllowNull
  @Column
  finished!: Date;

}

export default Seeding;