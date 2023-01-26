<!--
 @component
  A view for filtering stations by date within StationView. Provide dates as bindings
  to component.
    - statsFilterStartDate: Optional start date
    - statsFilterEndDate: Optional end date
-->
<script lang="ts">
  export let statsFilterStartDate: string | undefined;
  export let statsFilterEndDate: string | undefined;
</script>

<div
  class="bg-white p-4 rounded-lg w-full flex flex-row items-center justify-start gap-4"
>
  <form class="flex flex-row gap-4 items-start">
    <div class="flex flex-col gap-1">
      <label for="start" class="text-sm font-light">Start date</label>
      <input
        id="start"
        bind:value={statsFilterStartDate}
        type="datetime-local"
        name="start"
        class="w-auto text-sm h-12 px-4 rounded border-gray-200 border focus:border-blue-500 focus:ring-blue-500 focus:ring-1 invalid:border-red-500 invalid:text-red-500 invalid:ring-red-500"
        max={statsFilterEndDate}
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="start" class="text-sm font-light">End date</label>
      <input
        id="end"
        bind:value={statsFilterEndDate}
        type="datetime-local"
        name="start"
        class="w-auto text-sm h-12 px-4 rounded border-gray-200 border focus:border-blue-500 focus:ring-blue-500 focus:ring-1 invalid:border-red-500 invalid:text-red-500 invalid:ring-red-500"
        min={statsFilterStartDate}
      />
    </div>
  </form>
</div>
