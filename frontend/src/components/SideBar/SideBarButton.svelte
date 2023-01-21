<script lang="ts">
  import type { IconType } from '../../utils/interfaces';
  import Icon from '../Icon.svelte';

  export let iconType: IconType;
  export let label: string;
</script>

<button
  class="text-left px-4 py-3 bg-white rounded-xl text-gray-600 flex flex-row gap-3 h-12 hover:bg-gray-50 transition-colors duration-150"
>
  <Icon {iconType} />
  {label}
</button>
