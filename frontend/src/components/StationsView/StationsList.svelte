<!--
 @component
  A table displaying current stations in store.
-->

<script lang="ts">
  import { stations } from '../../stores';
  import StationListRow from './StationsListRow.svelte';
  import StationListHead from './StationListHead.svelte';
</script>

<div class="bg-white rounded-lg overflow-hidden">
  {#if $stations}
    <table class="table-fixed w-full">
      <StationListHead />
      <tbody>
        {#each $stations as station}
          <StationListRow {station} />
        {/each}
      </tbody>
    </table>
  {/if}
</div>
