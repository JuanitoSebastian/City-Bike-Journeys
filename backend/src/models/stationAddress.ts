import { Table, Column, Model, ForeignKey, PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript';
import Station from './station';

@Table({ timestamps: false })
class StationAddress extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;
  
  @ForeignKey(() => Station)
  stationId!: string;

  @BelongsTo(() => Station)
  station!: Station;

  @Column
  address!: string;

  @Column
  language!: string;

}

export default StationAddress;