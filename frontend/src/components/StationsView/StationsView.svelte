<!--
 @component
  A view for displaying stations. When the view mounts, stations are fetched using StationsService.
-->
<script lang="ts">
  import StationsList from './StationsList.svelte';
  import {
    stations,
    stationsQueryParameters,
    stationsPaging,
  } from '../../stores';
  import StationsService from '../../services/stations';
  import StationsListSorting from './StationsListSorting.svelte';
  import Paging from '../Paging.svelte';
  import { DEFAULT_PAGING_ITEMS_LIMIT } from '../../utils/constants';

  stationsQueryParameters.subscribe(async (updatedParameters) => {
    const [pagingFromApi, stationsFromApi] = await StationsService.getStations(
      updatedParameters
    );
    stations.set(stationsFromApi);
    stationsPaging.set(pagingFromApi);
  });

  const setPage = (value: number) => {
    const offset = value * DEFAULT_PAGING_ITEMS_LIMIT;
    stationsQueryParameters.set({ ...$stationsQueryParameters, offset });
  };
</script>

<div class="flex flex-col gap-4">
  <h2 class="text-4xl">Stations</h2>
  <StationsListSorting />
  <StationsList />
  <Paging paging={$stationsPaging} onChange={setPage} />
</div>
