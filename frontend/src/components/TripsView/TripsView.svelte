<!--
 @component
  A view for displaying tripss. When the view mounts, trips are fetched using TripsService.
-->

<script lang="ts">
  import { trips, tripsQueryParameters, tripsPaging } from '../../stores';
  import TripService from '../../services/trips';
  import TripsList from './TripsList.svelte';
  import Paging from '../Paging.svelte';
  import { DEFAULT_PAGING_ITEMS_LIMIT } from '../../utils/constants';

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
    if (loading) {
      return;
    }
    const offset = value * DEFAULT_PAGING_ITEMS_LIMIT;
    tripsQueryParameters.set({ ...$tripsQueryParameters, offset });
  };
</script>

<div class="flex flex-col gap-4">
  <h2 class="text-4xl">Trips</h2>
  <TripsList />
  <Paging paging={$tripsPaging} onChange={setPage} />
</div>
