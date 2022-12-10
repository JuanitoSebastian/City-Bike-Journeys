import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Station from './station';

@Table({ timestamps: false })
class Trip extends Model {

  @Column
  startTime!: Date;

  @Column
  endTime!: Date;

  @ForeignKey(() => Station)
  @Column
  startStationId!: number;

  @ForeignKey(() => Station)
  @Column
  endStationId!: number;

  @Column
  distance!: number;

  @Column
  duration!: number;

}

export default Trip;