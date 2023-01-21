import { Writable, writable } from 'svelte/store';
import type { Station } from './utils/interfaces';

export const stations: Writable<Station[]|undefined> = writable([]);