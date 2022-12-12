import { Table, Column, Model, Unique, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import City from './city';

@Table({ timestamps: false })
class CityName extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => City)
  @Column
  cityId!: number;

  @BelongsTo(() => City)
  city!: City;

  @Unique
  @Column
  cityName!: string;

  @Column
  language!: string;

}

export default CityName;