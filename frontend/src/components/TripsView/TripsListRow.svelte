<!--
 @component
  A single row of TripsList. 
  - trip: Trip object to display
-->

<script lang="ts">
  import type { Trip } from '../../utils/interfaces';
  export let trip: Trip;

  $: startDate = new Date(trip.startTime);
  $: endDate = new Date(trip.endTime);
  const optionsTime = { timeStyle: 'short' };
  const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
</script>

<tr class="h-16 border-t border-gray-100">
  <td>
    <div class="flex flex-col justify-center items-start">
      <p class="text-sm">{startDate.toLocaleTimeString('fi-FI', optionsTime)}</p>
      <p class="text-xs">{startDate.toLocaleDateString('fi-FI', optionsDate)}</p>
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
  <td>
    <div class="flex flex-col justify-center items-start text-sm">
      <p class="text-sm">{trip.distanceMeters}</p>
      <p class="text-xs">meters</p>
    </div>
  </td>
  <td><div class="flex flex-col justify-center items-start text-sm">
    <p class="text-sm">{trip.durationSeconds}</p>
    <p class="text-xs">seconds</p>
  </div></td>
</tr>
