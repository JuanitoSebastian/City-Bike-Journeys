<script lang="ts">
  import { Link } from 'svelte-navigator';
  import SideBarButton from './SideBarButton.svelte';
  import SideBarSection from './SideBarSection.svelte';
</script>

<aside class="w-80 min-w-fit h-auto min-h-screen bg-white">
  <div class="p-4 sticky top-0">
    <div class="flex flex-col gap-8">
      <Link to="/">
        <h1 class="text-2xl font-bold text-gray-700">City Bike Journeys</h1>
      </Link>
      <SideBarSection sectionTitle="Explore">
        <SideBarButton label="Trips" to="trips" iconType="bolt" />
        <SideBarButton label="Stations" to="stations" iconType="flag" />
      </SideBarSection>
      <SideBarSection sectionTitle="Other">
        <SideBarButton label="About" to="about" iconType="info" />
      </SideBarSection>
    </div>
  </div>
</aside>
