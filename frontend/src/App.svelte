<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import SideBar from './components/SideBar/SideBar.svelte';;
  import StationsView from './components/StationsView/StationsView.svelte';
  import Tailwindcss from './components/Tailwindcss.svelte';
</script>

<Router>
  <Tailwindcss />
  <div class="flex flex-row w-full">
    <SideBar />
    <Route path="trips">
      <div class="container mx-auto my-4 px-4">
        <p>Trips</p>
      </div>
    </Route>
    <Route path="stations">
      <div class="container mx-auto my-4 px-4">
        <StationsView />
      </div>
    </Route>
    <Route path="about">
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
</Router>
