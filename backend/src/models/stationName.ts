import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Station from './station';

@Table({ timestamps: false })
class StationName extends Model {
  @ForeignKey(() => Station)
  @Column
  stationId!: number;

  @BelongsTo(() => Station)
  station!: Station;

  @Column
  name!: string;

  @Column
  language!: string;
}

export default StationName;