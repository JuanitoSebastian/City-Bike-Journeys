import { Language } from "./StringInLanguage";

interface ListRequest {
  limit: number;
  offset: number;
  language: Language;
  sortBy: SortBy;
  order: Order;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum SortBy {
  Id = 'id',
  Name = 'name'
}

export default ListRequest;