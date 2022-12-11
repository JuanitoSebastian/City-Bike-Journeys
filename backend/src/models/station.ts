import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import StationAddress from './stationAddress';
import StationName from './stationName';

@Table({ timestamps: false })
class Station extends Model {

  @HasMany(() => StationName)
  names!: StationName[];

  @HasMany(() => StationAddress)
  addresses!: StationAddress[];

  @Column
  maximumCapicity!: number;

  @Column
  operator!: string;

  @Column(DataType.DECIMAL(8,6))
  latitude!: number;

  @Column(DataType.DECIMAL(9,6))
  longitude!: number;

}

export default Station;