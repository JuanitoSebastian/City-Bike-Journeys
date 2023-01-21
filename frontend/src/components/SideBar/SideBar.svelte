<script lang="ts">
  import SideBarButton from './SideBarButton.svelte';
  import SideBarSection from './SideBarSection.svelte';
</script>

<aside class="w-80 h-auto min-h-screen bg-white">
  <div class="p-4 sticky top-0">
    <div class="flex flex-col gap-8">
      <h1 class="text-2xl font-bold text-gray-700">City Bikes 2021</h1>
      <SideBarSection sectionTitle="Explore">
        <SideBarButton label="Trips" iconType="bolt" />
        <SideBarButton label="Stations" iconType="flag" />
      </SideBarSection>
      <SideBarSection sectionTitle="Other">
        <SideBarButton label="About" iconType="info" />
      </SideBarSection>
    </div>
  </div>
</aside>
