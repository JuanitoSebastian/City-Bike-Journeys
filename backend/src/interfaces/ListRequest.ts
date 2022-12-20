import { Language } from "./StringInLanguage";

interface ListRequest {
  limit: number;
  offset: number;
  language: Language;
  sortBy: string;
  order: string;
}

export default ListRequest;