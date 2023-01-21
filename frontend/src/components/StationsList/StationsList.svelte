<script lang="ts">
  import { onMount } from 'svelte';
  import { stations } from '../../stores';
  import StationListRow from './StationsListRow.svelte';
  import StationListHead from './StationListHead.svelte';
  import StationService from '../../services/stations';
  onMount(async () => {
    const [paging, stationsFromApi] = await StationService.getStations();
    stations.set(stationsFromApi);
  });
</script>

<div class="bg-white px-4 py-2 rounded">
  {#if $stations !== undefined}
    <table class="table-auto w-full">
      <StationListHead />
      <tbody>
        {#each $stations as station}
          <StationListRow {station} />
        {/each}
      </tbody>
    </table>
  {:else}
    <p>Loading</p>
  {/if}
</div>
