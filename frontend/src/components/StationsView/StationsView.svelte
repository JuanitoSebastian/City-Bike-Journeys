<script lang="ts">
  import StationsList from './StationsList.svelte';
  import { stations, stationsQueryParameters, stationsPaging } from '../../stores';
  import StationService from '../../services/stations';
  import StationsListSorting from './StationsListSorting.svelte';
  import Paging from '../Paging.svelte';

  stationsQueryParameters.subscribe(async updatedParameters => {
    const [pagingFromApi, stationsFromApi] = await StationService.getStations(updatedParameters);
    stations.set(stationsFromApi);
    stationsPaging.set(pagingFromApi);
  });

  const setPage = (value: number) => {
    const offset = value * 20;
    stationsQueryParameters.set({ ...$stationsQueryParameters, offset });
  };

</script>

<div class="flex flex-col gap-4">
  <StationsListSorting />
  <StationsList />
  <Paging paging={$stationsPaging} onChange={setPage} />
</div>
