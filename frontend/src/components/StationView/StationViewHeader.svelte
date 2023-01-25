<!--
 @component
  A header for a StationView. Displayes the name, address and city of a given station.
    - station: Station object to display
-->
<script lang="ts">
  import { Link } from 'svelte-navigator';
  import Icon from '../Icon.svelte';
  import type { Station } from '../../utils/interfaces';
  import type { LocalAction } from 'svelte-navigator/types/SvelteInternal';
  
  export let station: Station;
  export let focus: LocalAction<undefined>;
</script>

<div class="flex-col flex gap-2">
  <Link to="/stations">
    <div
      class="flex flex-row items-center text-gray-600 gap-2 hover:text-blue-600 transition-all duration-75"
    >
      <Icon iconType="arrow-left" />
      <p class="text-sm uppercase">Stations</p>
    </div>
  </Link>
  <div class="flex flex-col">
    <h2 use:focus class="text-4xl">{station.id} {station.name}</h2>
    <p class="font-light">{station.address}, {station.city}</p>
  </div>
</div>
