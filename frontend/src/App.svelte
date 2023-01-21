<script lang="ts">
  import { onMount } from 'svelte';
  import StationService from './services/stations';
  import Tailwindcss from './components/Tailwindcss.svelte';
  onMount(async () => {
    const [paging, stations] = await StationService.getStations();
    console.log(stations);
    console.log(paging);
  });
</script>

<main>
  <Tailwindcss />
  <h1 class="font-mono">Hello {name}!</h1>
  <p class="text-sm text-red-500">
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>
