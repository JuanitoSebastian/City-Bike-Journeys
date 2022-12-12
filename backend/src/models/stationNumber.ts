import { Table, Model, Column, ForeignKey, BelongsTo, PrimaryKey } from "sequelize-typescript";
import Station from "./station";

@Table({ timestamps: false })
class StationNumber extends Model {

  @PrimaryKey
  @Column
  stationNumber!: string;

  @ForeignKey(() => Station)
  stationId!: number;

  @BelongsTo(() => Station)
  station!: Station;

}

export default StationNumber;