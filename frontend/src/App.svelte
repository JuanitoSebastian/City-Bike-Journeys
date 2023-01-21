<script lang="ts">
  import SideBar from './components/SideBar/SideBar.svelte';
  import StationsList from './components/StationsList/StationsList.svelte';
  import Tailwindcss from './components/Tailwindcss.svelte';
</script>

<main>
  <Tailwindcss />
  <div class="flex flex-row w-full">
    <SideBar />
    <div class="container mx-auto my-4 px-4">
      <StationsList />
    </div>
  </div>
</main>
