<!--
 @component
  A view rendering statistics from a given Station object. Capacity, departures count,
  arrivals count,  avg. arrival distance and avg. departure distance are shown.
  - station: station object to display stats from.
-->
<script lang="ts">
  import type { Station } from '../../utils/interfaces';
  import StationStatsCard from './StationStatsCard.svelte';
  import {
    formatBigNumberToString,
    formatMeters,
  } from '../../utils/numberFormatter';

  export let station: Station;
</script>

<div class="flex flex-row gap-2 items-start justify-start flex-wrap">
  <StationStatsCard
    id="station-capacity"
    label="Capacity"
    statistic={`${station.maximumCapacity} bikes`}
  />
  <StationStatsCard
    id="station-departures-count"
    label="Departures"
    statistic={`${formatBigNumberToString(station.statistics.departuresCount)}`}
  />
  <StationStatsCard
    id="station-arrivals-count"
    label="Arrivals"
    statistic={`${formatBigNumberToString(station.statistics.arrivalsCount)}`}
  />
  {#if station.statistics.departuresAverageDistance !== null}
    <StationStatsCard
      id="station-departures-avg-distance"
      label="Departures Avg. Distance"
      statistic={`${formatMeters(
        station.statistics.departuresAverageDistance
      )}`}
    />
  {/if}
  {#if station.statistics.arrivalsAverageDistance !== null}
    <StationStatsCard
      id="station-arrivals-avg-distance"
      label="Arrival Avg. Distance"
      statistic={`${formatMeters(station.statistics.arrivalsAverageDistance)}`}
    />
  {/if}
</div>
