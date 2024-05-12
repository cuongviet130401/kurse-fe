<script>
  import { AppShell } from "@skeletonlabs/skeleton";
  import PageHeader from "../../lib/components/PageHeader.svelte";
  import PageFooter from "../../lib/components/PageFooter.svelte";
</script>

<AppShell>
  <!-- (header) -->
  <svelte:fragment slot="pageHeader"><PageHeader></PageHeader></svelte:fragment>
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <svelte:fragment slot="pageFooter"><PageFooter></PageFooter></svelte:fragment>
  <!-- (footer) -->
</AppShell>
