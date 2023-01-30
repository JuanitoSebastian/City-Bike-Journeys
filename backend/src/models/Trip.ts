import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import Station from './Station';

@Table({ timestamps: false })
class Trip extends Model {

  @Column
  startTime!: Date;

  @Column
  endTime!: Date;

  @ForeignKey(() => Station)
  @Column
  startStationId!: string;

  @BelongsTo(() => Station)
  startStation!: Station;

  @ForeignKey(() => Station)
  @Column
  endStationId!: string;

  @BelongsTo(() => Station)
  endStation!: Station;

  @Column(DataType.FLOAT)
  distanceMeters!: number;

  @Column
  durationSeconds!: number;

}

export default Trip;