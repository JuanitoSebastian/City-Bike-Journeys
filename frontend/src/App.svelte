<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-navigator';
  import SeedingsService from './services/seedings';
  import SideBar from './components/SideBar/SideBar.svelte';
  import StationsView from './components/StationsView/StationsView.svelte';
  import StationView from './components/StationView/StationView.svelte';
  import Tailwindcss from './components/Tailwindcss.svelte';
  import TripsView from './components/TripsView/TripsView.svelte';
  import { seeding } from './stores';
  import SeedingView from './components/SeedingView/SeedingView.svelte';

  onMount(async () => {
    await SeedingsService.startPollingSeedingApi();
  });
</script>

<Router>
  <Tailwindcss />
  {#if !$seeding || $seeding.latestSeeding === null}
    <div class="container mx-auto my-4 px-4">
      <SeedingView />
    </div>
  {:else if $seeding && $seeding.latestSeeding !== null}
    <div class="flex flex-row w-full">
      <SideBar />
      <Route path="/trips">
        <div class="container mx-auto my-4 px-4">
          <TripsView />
        </div>
      </Route>
      <Route path="/stations/*">
        <Route path="/">
          <div class="container mx-auto my-4 px-4">
            <StationsView />
          </div>
        </Route>
        <Route path=":id" let:params>
          <div class="container mx-auto my-4 px-4">
            <StationView stationId={params.id} />
          </div>
        </Route>
      </Route>
      <Route path="/about">
        <div class="container mx-auto my-4 px-4">
          <p>App by juan.fi</p>
        </div>
      </Route>
      <Route path="/">
        <div class="container mx-auto my-4 px-4">
          <p>Home</p>
        </div>
      </Route>
    </div>
  {/if}
</Router>
