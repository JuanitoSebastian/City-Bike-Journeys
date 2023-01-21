import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import StationAddress from './stationAddress';
import StationName from './stationName';
import City from './city';
import Trip from './trip';

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

  @Column(DataType.DOUBLE)
  latitude!: number;

  @Column(DataType.DOUBLE)
  longitude!: number;

  @HasMany(() => StationName)
  names!: StationName[];

  @HasMany(() => StationAddress)
  addresses!: StationAddress[];

  @HasMany(() => Trip, 'startStationId')
  departures!: Trip[];

  @HasMany(() => Trip, 'endStationId')
  arrivals!: Trip[];

}

export default Station;