<!--
 @component
  A view providing two dropdowns for user to set the sorting of stations. 
  Values are fetched and saved the store.
-->

<script lang="ts">
  import type { DropDownOption } from '../../utils/interfaces';
  import {
    stationsQueryParameters,
    orderOptions,
    orderByOptions,
  } from '../../stores';
  import DropDown from '../DropDown.svelte';

  const setOrder = (value: DropDownOption) => {
    stationsQueryParameters.set({ ...$stationsQueryParameters, order: value });
  };

  const setOrderBy = (value: DropDownOption) => {
    stationsQueryParameters.set({
      ...$stationsQueryParameters,
      orderBy: value,
    });
  };
</script>

<div
  class="bg-white p-4 rounded-lg w-full flex flex-row items-center justify-end gap-4 h-16"
>
  <DropDown
    dropDownDetails={{ id: 'order_by', label: 'Order by' }}
    options={orderByOptions}
    selected={$stationsQueryParameters.orderBy}
    onChange={setOrderBy}
  />
  <DropDown
    dropDownDetails={{ id: 'order', label: 'Order' }}
    options={orderOptions}
    selected={$stationsQueryParameters.order}
    onChange={setOrder}
  />
</div>
