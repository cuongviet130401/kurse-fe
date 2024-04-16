<script>
  import "$lib/tailwind.css";
  import "$lib/style.css";
  import { Toast, initializeStores } from "@skeletonlabs/skeleton";

  initializeStores();
</script>

<Toast />
<slot />
