<script lang="ts">
  import type { Trip } from '../../utils/interfaces';
  export let trip: Trip;
</script>

<tr
  class="group h-12 border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-75"
>
  <td>{trip.startTime}</td>
  <td>{trip.endTime}</td>
  <td>{trip.startStation}</td>
  <td>{trip.endStation}</td>
  <td>{trip.distanceMeters}</td>
  <td>{trip.durationSeconds}</td>
</tr>
