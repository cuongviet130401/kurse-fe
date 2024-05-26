<script>
  import "$lib/tailwind.css";
  import "$lib/style.css";
  import { Toast, initializeStores } from "@skeletonlabs/skeleton";
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  import GlobalFooter from "$lib/components/GlobalFooter.svelte";

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  initializeStores();
</script>

<Toast />
<slot />

<GlobalFooter/>