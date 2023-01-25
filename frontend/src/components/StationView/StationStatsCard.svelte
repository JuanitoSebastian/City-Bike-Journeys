<!--
 @component
  A card element for displaying a short statistic. The card displayes the value
  and a a label above it.
    - statistic: A short string to display (such as 20 bikes)
    - label: A descriptive string abotu the value (such as Capacity)
-->
<script lang="ts">
  export let statistic: string;
  export let label: string;
</script>

<div class="bg-white rounded-lg flex flex-col justify-center items-start gap-1 h-24 max-h-24 px-4 shadow-sm">
  <p class="text-gray-600 font-light">{label}</p>
  <p class="text-3xl font-bold">{statistic}</p>
</div>

