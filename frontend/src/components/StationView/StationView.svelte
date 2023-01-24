<script lang="ts">
  import { Link } from 'svelte-navigator';
  import StationService from '../../services/stations';
  import { onMount } from 'svelte';
  import type { Station, StationStatistics } from '../../utils/interfaces';
  export let stationId: string;
  let station: Station | undefined = undefined;
  let loading: boolean = true;

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
    <Link to="/stations">
      <p class="text-gray-600 font-mono text-sm">Stations</p>
    </Link>
    <h1 class="text-4xl">{station.id} {station.name}</h1>
    <div
      class="bg-white p-4 rounded-lg w-full flex flex-col items-start justify-start gap-4"
    >
      <p>Address: {station.address}</p>
      <p>City: {station.city}</p>
      <p>Capacity: {station.maximumCapacity}</p>
      <p>Departures: {station.statistics.departuresCount}</p>
      <p>Arrivals: {station.statistics.arrivalsCount}</p>
    </div>
  </div>
{:else if !loading}
<div class="flex flex-col gap-4 justify-center items-center h-screen">
  <p>Station not found</p>
</div>
{/if}
