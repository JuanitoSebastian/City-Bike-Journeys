<script lang="ts">
  import type { DropDownOption } from '../../utils/interfaces';
  import DropDown from '../DropDown.svelte';

  export const sortingDirections: DropDownOption[] = [
    { value: 'ASC', label: 'Ascending' },
    { value: 'DESC', label: 'Descending' },
  ];
  let sortOrder = sortingDirections[0];

  const setOrder = (value: DropDownOption) => {
    console.log(value);
  };
</script>

<div
  class="bg-white p-4 rounded-lg w-full h-20 flex flex-row items-center justify-end"
>
  <DropDown
    options={sortingDirections}
    bind:selected={sortOrder}
    onChange={setOrder}
  />
</div>
