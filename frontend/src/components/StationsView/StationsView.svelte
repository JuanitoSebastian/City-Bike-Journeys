<script lang="ts">
  import StationsList from './StationsList.svelte';
  import { onMount } from 'svelte';
  import { stations, stationsQueryParameters } from '../../stores';
  import StationService from '../../services/stations';
  import StationsListSorting from './StationsListSorting.svelte';

  stationsQueryParameters.subscribe(async updatedParameters => {
    const [paging, stationsFromApi] = await StationService.getStations(updatedParameters);
    stations.set(stationsFromApi);
  });

</script>

<div class="flex flex-col gap-4">
  <StationsListSorting />
  <StationsList />
</div>
