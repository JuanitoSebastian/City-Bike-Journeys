import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import StationNumber from './stationNumber';

@Table({ timestamps: false })
class Trip extends Model {

  @Column
  startTime!: Date;

  @Column
  endTime!: Date;

  @ForeignKey(() => StationNumber)
  @Column
  startStationNumber!: string;

  @BelongsTo(() => StationNumber)
  startStation!: StationNumber;

  @ForeignKey(() => StationNumber)
  @Column
  endStationNumber!: string;

  @BelongsTo(() => StationNumber)
  endStation!: StationNumber;

  @Column
  distanceMeters!: number;

  @Column
  durationSeconds!: number;

}

export default Trip;