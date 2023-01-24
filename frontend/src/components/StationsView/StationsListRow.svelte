<!--
 @component
  A single row of StationsList. Clicking the row takes the user to the desired station page.
  - station: Station object to display
-->

<script lang="ts">
  import type { Station } from '../../utils/interfaces';
  import { useNavigate } from 'svelte-navigator';
  import Icon from '../Icon.svelte';
  export let station: Station;

  const navigate = useNavigate();
</script>

<tr
  on:click={() => navigate(`/stations/${station.id}`)}
  class="group h-12 border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-75"
>
  <td>{station.id}</td>
  <td>{station.name}</td>
  <td>{station.city}</td>
  <td>{station.maximumCapacity}</td>
  <td>
    <div
      class="flex flex-row gap-2 items-center text-sm text-gray-600 group-hover:text-blue-600 transition-all duration-75 group-hover:translate-x-1"
    >
      <p class="">View</p>
      <Icon iconType="chevron-right" />
    </div>
  </td>
</tr>
