<script>
  import GlobalFooter from "$lib/components/GlobalFooter.svelte";
  import "$lib/style.css";
  import "$lib/tailwind.css";
  import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    offset,
    shift,
  } from "@floating-ui/dom";
  import { Toast, initializeStores, storePopup } from "@skeletonlabs/skeleton";
  import { slide } from "svelte/transition";

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  initializeStores();

</script>

<Toast
  position="tr"
  spacing="space-4"
  buttonDismiss="btn-icon btn-icon-xs bg-initial"
  transitions={true}
  transitionIn={slide}
  transitionOut={slide}
  transitionInParams={{ duration: 200, axis: 'x' }}
  transitionOutParams={{ duration: 200, axis: 'x' }}
/>

<slot style="max-w-screen overflow-hidden" />

<GlobalFooter />
