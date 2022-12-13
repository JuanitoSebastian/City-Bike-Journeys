import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import StationAddress from './stationAddress';
import StationName from './stationName';
import City from './city';

@Table({ timestamps: false })
class Station extends Model {

  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => City)
  @Column
  cityId!: number;

  @BelongsTo(() => City)
  city!: City;

  @Column
  maximumCapacity!: number;

  @Column(DataType.DECIMAL(8,6))
  latitude!: number;

  @Column(DataType.DECIMAL(9,6))
  longitude!: number;

  @HasMany(() => StationName)
  names!: StationName[];

  @HasMany(() => StationAddress)
  addresses!: StationAddress[];

}

export default Station;