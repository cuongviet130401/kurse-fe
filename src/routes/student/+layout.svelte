<script>
  import { AppShell, getToastStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import { authStore } from "$lib/globalStates/authAccount";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { triggerErrorToast } from "$lib/utils/CommonUtils";
  import BitbleAppBar from "$lib/components/BitbleAppBar.svelte";

  const toastStore = getToastStore();
  let url = $page.url.pathname;

  function verifyStudentAccount() {
    if (authStore.get().account?.role === "STUDENT_ACCOUNT") {
      return;
    }

    triggerErrorToast(toastStore, "Unauthorized or not a Student account");
    goto("/auth");
  }

  onMount(() => {
    verifyStudentAccount();
  });
</script>

<BitbleAppBar />

<slot />
