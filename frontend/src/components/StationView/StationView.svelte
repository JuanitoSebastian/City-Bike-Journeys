<!--
 @component
  A view of a single station. StationService is used to retrieve the station
  using the given stationId.
    - stationId: Id of station to view.
-->
<script lang="ts">
  import { useFocus } from 'svelte-navigator';
  import { onMount } from 'svelte';

  import StationService from '../../services/stations';
  import type { Station } from '../../utils/interfaces';
  import StationViewHeader from './StationViewHeader.svelte';
  import StationsViewStatistics from './StationViewStatistics.svelte';
  import Divider from '../Divider.svelte';
  import StationViewStatisticsFilter from './StationViewStatisticsFilter.svelte';

  export let stationId: string;
  let station: Station | undefined = undefined;
  let initialLoading: boolean = true;
  let statsFilterStartDate: string | undefined = undefined;
  let statsFilterEndDate: string | undefined = undefined;

  const focus = useFocus();

  onMount(async () => {
    station = await StationService.getStation(stationId);
    if (station) {
      station.statistics = await StationService.getStationStatistics(
        stationId,
        statsFilterStartDate,
        statsFilterEndDate
      );
    }
    initialLoading = false;
  });

  const updateStatistics = async () => {
    if (
      statsFilterStartDate &&
      statsFilterEndDate &&
      new Date(statsFilterStartDate) < new Date(statsFilterEndDate)
    ) {
      station = {
        ...station,
        statistics: await StationService.getStationStatistics(
          stationId,
          statsFilterStartDate,
          statsFilterEndDate
        ),
      };
    }
  };

  $: statsFilterStartDate, statsFilterEndDate, updateStatistics();
</script>

{#if !initialLoading && station && station.statistics}
  <div class="flex flex-col gap-4">
    <StationViewHeader {station} {focus} />
    <Divider label="Statistics" />
    <StationViewStatisticsFilter
      bind:statsFilterStartDate
      bind:statsFilterEndDate
    />
    <StationsViewStatistics
      {station}
    />
  </div>
{:else if !initialLoading}
  <div class="flex flex-col gap-4 justify-center items-center h-screen">
    <p>Station not found</p>
  </div>
{/if}
