import { Table, Column, Model, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import Station from './station';

@Table({ timestamps: false })
class StationName extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Station)
  stationId!: number;

  @Column
  name!: string;

  @Column
  language!: string;

}

export default StationName;