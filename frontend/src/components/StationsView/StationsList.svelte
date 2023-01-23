<script lang="ts">
  import { stations } from '../../stores';
  import StationListRow from './StationsListRow.svelte';
  import StationListHead from './StationListHead.svelte';
</script>

<div class="bg-white px-4 py-2 rounded-lg">
  {#if $stations !== undefined}
    <table class="table-fixed w-full">
      <StationListHead />
      <tbody>
        {#each $stations as station}
          <StationListRow {station} />
        {/each}
      </tbody>
    </table>
  {:else}
    <p>Loading</p>
  {/if}
</div>
