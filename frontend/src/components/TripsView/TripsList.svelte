<!--
 @component
  A table displaying current trips in store.
-->

<script lang="ts">
  import { trips } from '../../stores';
  import TripsListHead from './TripsListHead.svelte';
  import TripsListRow from './TripsListRow.svelte';
</script>

<div class="bg-white px-4 rounded-lg">
  {#if $trips}
    <table class="table-fixed w-full">
      <TripsListHead />
      <tbody>
        {#each $trips as trip}
          <TripsListRow {trip} />
        {/each}
      </tbody>
    </table>
  {/if}
</div>
