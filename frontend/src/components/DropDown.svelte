<script lang="ts">
  import type { DropDownOption } from '../utils/interfaces';

  export let options: DropDownOption[];
  export let selected: DropDownOption;
  export let onChange: (value: DropDownOption) => void;
</script>

<select class="font-mono h-10 text-sm border border-gray-300 rounded-lg px-2" bind:value={selected} on:change={() => onChange(selected)}>
  {#each options as option}
    <option value={option}>
      <p class="font-mono">{option.label}</p>
    </option>
  {/each}
</select>
