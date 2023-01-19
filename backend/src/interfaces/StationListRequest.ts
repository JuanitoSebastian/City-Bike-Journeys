import { Language } from './StringInLanguage';

interface StationListRequest {
  limit: number;
  offset: number;
  language: Language;
  sortBy: StationListSortBy;
  order: StationListOrder;
}

export enum StationListOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum StationListSortBy {
  Id = 'id',
  Name = 'name'
}

export default StationListRequest;