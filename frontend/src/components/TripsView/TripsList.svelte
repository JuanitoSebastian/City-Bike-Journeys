<script lang="ts">
  import { trips } from '../../stores';
  import TripsListHead from './TripsListHead.svelte';
  import TripsListRow from './TripsListRow.svelte';
</script>

<div class="bg-white px-4 rounded-lg">
  {#if $trips !== undefined}
    <table class="table-fixed w-full">
      <TripsListHead />
      <tbody>
        {#each $trips as trip}
          <TripsListRow {trip} />
        {/each}
      </tbody>
    </table>
  {:else}
    <p>Loading</p>
  {/if}
</div>
