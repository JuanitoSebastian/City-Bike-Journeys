<script lang="ts">
  import type { Station } from '../../utils/interfaces';
  export let station: Station;
</script>

<tr class="h-12 border-t border-gray-100">
  <td>{station.id}</td>
  <td>{station.name}</td>
  <td>{station.city}</td>
  <td>{station.maximumCapacity}</td>
  <td>View</td>
</tr>
