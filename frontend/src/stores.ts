import { Writable, writable } from 'svelte/store';
import type { DropDownOption, Station, StationsQueryParameters } from './utils/interfaces';

export const languageOptions: DropDownOption[] = [
  { value: 'fi', label: 'Finnish'},
  { value: 'en', label: 'English'},
  { value: 'sv', label: 'Swedish'}
];

export const orderByOptions: DropDownOption[] = [
  { value: 'id', label: 'Id'},
  { value: 'name', label: 'Name'}
];

export const orderOptions: DropDownOption[] = [
  { value: 'ASC', label: 'Ascending'},
  { value: 'DESC', label: 'Descending'}
];

const stationsDefaultQueryParameters: StationsQueryParameters = {
  limit: 20,
  offset: 0,
  language: languageOptions[0],
  orderBy: orderByOptions[0],
  order: orderOptions[0]
};

export const stations: Writable<Station[]|undefined> = writable([]);
export const stationsQueryParameters: Writable<StationsQueryParameters> = writable(stationsDefaultQueryParameters);