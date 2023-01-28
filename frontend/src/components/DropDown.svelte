<!--
 @component
  A DropDown input.
    - dropDrownDetails: Id and label for dropdown
    - options: A list of possible dropdown options
    - selected: Active selection
    - onChange: A function that is called with the selected value when it is changed.
-->

<script lang="ts">
  import type { DropDownDetails, DropDownOption } from '../utils/interfaces';

  export let dropDownDetails: DropDownDetails;
  export let options: DropDownOption[];
  export let selected: DropDownOption;
  export let onChange: (value: DropDownOption) => void;
</script>

<div class="flex flex-row justify-start items-center">
  <label for={dropDownDetails.id} class="text-sm text-gray-600">{dropDownDetails.label}</label>
  <select
    class="text-sm font-semibold border text-blue-600 rounded-lg px-2 border-none appearance-none"
    id={dropDownDetails.id}
    bind:value={selected}
    on:change={() => onChange(selected)}
  >
    {#each options as option}
      <option value={option}>
        <p class="font-mono">{option.label}</p>
      </option>
    {/each}
  </select>
</div>
