<script lang="ts">
  import { trips, tripsQueryParameters, tripsPaging } from '../../stores';
  import TripService from '../../services/trips';
  import TripsList from './TripsList.svelte';
  import Paging from '../Paging.svelte';

  tripsQueryParameters.subscribe(async (updatedParameters) => {
    const [pagingFromApi, tripsFromApi] = await TripService.getTrips(
      updatedParameters
    );
    trips.set(tripsFromApi);
    tripsPaging.set(pagingFromApi);
  });

  const setPage = (value: number) => {
    const offset = value * 20;
    tripsQueryParameters.set({ ...$tripsQueryParameters, offset });
  };
</script>

<div class="flex flex-col gap-4">
  <TripsList />
  <Paging paging={$tripsPaging} onChange={setPage} />
</div>
