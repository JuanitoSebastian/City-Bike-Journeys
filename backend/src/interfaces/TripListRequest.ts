import { Language } from './StringInLanguage';

interface TripListRequest {
  limit: number;
  offset: number;
  language: Language;
}

export default TripListRequest;