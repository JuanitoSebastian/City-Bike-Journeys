<script lang="ts">
  import StationsList from './StationsList.svelte';
  import { onMount } from 'svelte';
  import { stations } from '../../stores';
  import StationService from '../../services/stations';
  import StationsListSorting from './StationsListSorting.svelte';
  onMount(async () => {
    const [paging, stationsFromApi] = await StationService.getStations();
    stations.set(stationsFromApi);
  });
</script>

<div class="flex flex-col gap-4">
  <StationsListSorting />
  <StationsList />
</div>
