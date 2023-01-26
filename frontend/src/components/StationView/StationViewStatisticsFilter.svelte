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

<form>
  <div class="flex flex-row gap-2 items-start">
    <div class="flex flex-col">
      <label for="start">Start date</label>
      <input
        id="start"
        bind:value={statsFilterStartDate}
        type="datetime-local"
        name="start"
        class="w-44"
        max={statsFilterEndDate}
      />
    </div>
    <div class="flex flex-col">
      <label for="end">End date</label>
      <input
        id="end"
        bind:value={statsFilterEndDate}
        type="datetime-local"
        name="start"
        class="w-44"
        min={statsFilterStartDate}
      />
    </div>
  </div>
</form>
