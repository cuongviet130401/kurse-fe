<script>
  import KurseAppBar from "../../lib/components/modules/kurse/KurseAppBar.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { authStore } from "$lib/globalStates/authAccount";
  import { triggerErrorToast } from "$lib/utils/CommonUtils";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  const toastStore = getToastStore();
  let url = $page.url.pathname;

  function verifyTeacherAccount() {
    if (authStore.get().account?.role === "TEACHER_ACCOUNT") {
      return;
    }

    triggerErrorToast(toastStore, "Unauthorized or not a Teacher account");
    goto("/auth");
  }

  onMount(() => {
    verifyTeacherAccount();
  });
</script>

<KurseAppBar />

<slot />
