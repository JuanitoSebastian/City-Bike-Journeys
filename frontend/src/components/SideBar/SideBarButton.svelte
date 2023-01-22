<script lang="ts">
  import type { IconType } from '../../utils/interfaces';
  import { useNavigate } from 'svelte-navigator';
  import Icon from '../Icon.svelte';

  export let iconType: IconType;
  export let label: string;
  export let to: string;
  
  const navigate = useNavigate();
</script>

<button on:click="{() => navigate(to)}"
  class="text-left px-4 py-3 bg-white rounded-xl text-gray-600 flex flex-row gap-3 h-12 hover:bg-gray-50 transition-colors duration-150"
>
  <Icon {iconType} />
  {label}
</button>
