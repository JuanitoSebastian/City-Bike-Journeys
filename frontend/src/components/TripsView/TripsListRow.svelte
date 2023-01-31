<!--
 @component
  A single row of TripsList. 
  - trip: Trip object to display
-->
<script lang="ts">
  import type { Trip } from '../../utils/interfaces';
  import {
    formatMeters,
    formatSecondsToMinutes,
  } from '../../utils/numberFormatter';
  export let trip: Trip;

  $: startDate = new Date(trip.startTime);
  $: endDate = new Date(trip.endTime);
  $: distanceFormatted = formatMeters(trip.distanceMeters);
  $: durationFormatted = formatSecondsToMinutes(trip.durationSeconds);
  const optionsTime = { timeStyle: 'short' };
  const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
</script>

<tr class="h-16 border-t border-gray-100">
  <td>
    <div class="flex flex-col justify-center items-start">
      <p class="text-sm">
        {startDate.toLocaleTimeString('fi-FI', optionsTime)}
      </p>
      <p class="text-xs">
        {startDate.toLocaleDateString('fi-FI', optionsDate)}
      </p>
    </div>
  </td>
  <td>
    <div class="flex flex-col justify-center items-start text-sm">
      <p class="text-sm">{endDate.toLocaleTimeString('fi-FI', optionsTime)}</p>
      <p class="text-xs">{endDate.toLocaleDateString('fi-FI', optionsDate)}</p>
    </div>
  </td>
  <td>{trip.startStation}</td>
  <td>{trip.endStation}</td>
  <td>{distanceFormatted}</td>
  <td>
    <div class="flex flex-col justify-center items-start text-sm">
      <p>{durationFormatted[0]} minutes</p>
      <p>{durationFormatted[1]} seconds</p>
    </div>
  </td>
</tr>
