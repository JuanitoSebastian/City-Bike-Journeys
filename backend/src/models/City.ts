import { Table, Model, HasMany, PrimaryKey, AutoIncrement, Column } from 'sequelize-typescript';
import CityName from './CityName';
import Station from './Station';

@Table({ timestamps: false })
class City extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @HasMany(() => CityName, 'cityId')
  names!: CityName[];

  @HasMany(() => Station, 'cityId')
  stations!: Station[];

}

export default City;