interface StringInLanguage {
  string: string;
  langugage: Language;
}

export enum Language {
  Finnish = 'fi',
  English = "en",
  Swedish = "sv"
}

export default StringInLanguage;