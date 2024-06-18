<script>
  import { AppShell, getToastStore } from "@skeletonlabs/skeleton";
  import PageHeader from "../../lib/components/PageHeader.svelte";
  import PageFooter from "../../lib/components/PageFooter.svelte";
  import { onMount } from "svelte";
  import { authStore } from "$lib/globalStates/authAccount";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { triggerErrorToast } from "$lib/utils/CommonUtils";
  import KurseAppBar from "$lib/components/modules/kurse/KurseAppBar.svelte";

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

<KurseAppBar />

<slot />
