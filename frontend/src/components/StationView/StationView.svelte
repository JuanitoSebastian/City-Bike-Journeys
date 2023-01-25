<!--
 @component
  A view of a single station. StationService is used to retrieve the station
  using the given stationId.
    - stationId: Id of station to view.
-->
<script lang="ts">
  import StationService from '../../services/stations';
  import { onMount } from 'svelte';
  import type { Station } from '../../utils/interfaces';
  import StationViewHeader from './StationViewHeader.svelte';
  import StationsViewStatistics from './StationViewStatistics.svelte';
  import { useFocus } from 'svelte-navigator';

  export let stationId: string;
  let station: Station | undefined = undefined;
  let loading: boolean = true;

  const focus = useFocus();

  onMount(async () => {
    station = await StationService.getStation(stationId);
    if (station) {
      station.statistics = await StationService.getStationStatistics(stationId);
    }
    loading = false;
  });
</script>

{#if !loading && station && station.statistics}
  <div class="flex flex-col gap-4">
    <StationViewHeader {station} {focus} />
    <StationsViewStatistics {station} />
  </div>
{:else if !loading}
  <div class="flex flex-col gap-4 justify-center items-center h-screen">
    <p>Station not found</p>
  </div>
{/if}
