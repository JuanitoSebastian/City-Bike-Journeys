import { Writable, writable } from 'svelte/store';
import type { DropDownOption, Station } from './utils/interfaces';

export const stations: Writable<Station[]|undefined> = writable([]);

export const sortingDirections: DropDownOption[] = [
  { value: 'ASC', label: 'Ascending' },
  { value: 'DESC', label: 'Descending' }
];