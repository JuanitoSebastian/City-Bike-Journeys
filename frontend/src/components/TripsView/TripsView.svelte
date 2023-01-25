<script lang="ts">
  import { trips, tripsQueryParameters, tripsPaging } from '../../stores';
  import TripService from '../../services/trips';
  import TripsList from './TripsList.svelte';
  import Paging from '../Paging.svelte';

  let loading: boolean = false;

  tripsQueryParameters.subscribe(async (updatedParameters) => {
    loading = true;
    const [pagingFromApi, tripsFromApi] = await TripService.getTrips(
      updatedParameters
    );
    trips.set(tripsFromApi);
    tripsPaging.set(pagingFromApi);
    loading = false;
  });

  const setPage = (value: number) => {
    if (loading) { return; }
    const offset = value * 20;
    tripsQueryParameters.set({ ...$tripsQueryParameters, offset });
  };
</script>

<div class="flex flex-col gap-4">
  <TripsList />
  <Paging paging={$tripsPaging} onChange={setPage} />
</div>
