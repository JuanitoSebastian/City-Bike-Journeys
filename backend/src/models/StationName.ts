import { Table, Column, Model, ForeignKey, PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript';
import Station from './Station';

@Table({ timestamps: false })
class StationName extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Station)
  stationId!: string;

  @BelongsTo(() => Station)
  station!: Station;

  @Column
  name!: string;

  @Column
  language!: string;

}

export default StationName;