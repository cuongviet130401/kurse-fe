<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import ActionButton from "$lib/components/ActionButton.svelte";
  import ActionInput from "$lib/components/ActionInput.svelte";
  import { authStore } from "$lib/globalStates/authAccount";
  import { preparePayload, triggerErrorToast } from "$lib/utils/CommonUtils";
  import { provokePost } from "$lib/utils/ServiceApiConnector";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import { sineInOut } from "svelte/easing";
  import { blur } from "svelte/transition";

  const toastStore = getToastStore();

  let returnUrl = $page.url.searchParams.get("return-target");
  let errors = {};

  let form_loginIdentity: string;
  let form_password: string;

  const handleLogin = async () =>
    await provokePost(
      "v1/accounts/login",
      preparePayload({ form_loginIdentity, form_password })
    );

  const handleLoginOnSuccess = async (result: any) => {
    authStore.save(result);
    redirect();
  };

  const handleLoginOnError = async (err: any) => {
    triggerErrorToast(
      toastStore,
      "Unauthorized: " + JSON.stringify(err.description)
    );
  };

  function redirect() {
    if (!authStore.get()) {
      return;
    }
    window.location.pathname =
      returnUrl ??
      `/${authStore.get().account.role === "STUDENT_ACCOUNT" ? "student" : "teacher"}/`;
  }

  onMount(() => {
    redirect();
  });
</script>

<div class="w-screen h-screen flex justify-center items-center">
  <form
    class="card variant-ghost p-8 ml-16 border border-1 rounded h-content w-1/3 min-w-2/5 max-w-[540px]"
    method="POST"
    transition:blur={{ easing: sineInOut }}
  >
    <div class="flex flex-col gap-4">
      <div>
        <h1
          class="h1 leading-normal bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
        >
          Kurges
        </h1>
      </div>

      <ActionInput
        name="loginIdentifity"
        bind:value={form_loginIdentity}
        {errors}
        icon="bi-person-circle"
        label="Login Identity"
        required={true}
        placeholder="Username / Email / Numberphone"
      />

      <ActionInput
        name="password"
        type="password"
        bind:value={form_password}
        {errors}
        icon="bi-key-fill"
        label="Password"
        required={true}
        placeholder="Username / Email / Numberphone"
      />

      <!-- <label class="label">
        <span>Login identity</span>
        <div class="input-group grid grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-person-circle"></i></div>
          <input
            class="input"
            type="text"
            name="loginIdentity"
            bind:value={form_loginIdentity}
            placeholder="********"
            required={true}
          />
        </div>
      </label> -->

      <!-- <label class="label">
        <span>Password</span>
        <div class="input-group grid grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-key-fill"></i></div>
          <input
            class="input"
            type="password"
            name="loginIdentity"
            bind:value={form_password}
            placeholder="********"
            required
          />
        </div>
      </label> -->

      <div class="flex flex-col gap-4" style="margin-top: 2em">
        <ActionButton
          icon="box-arrow-in-right"
          label="Log in"
          onClick={handleLogin}
          onSuccess={handleLoginOnSuccess}
          onError={handleLoginOnError}
        />
        <!-- <button type="submit" class="btn variant-filled space-y-2"
          >Log In</button
        > -->
        <p class="text-center">
          <span>Forget Password? </span>
          <a class="anchor" href="/auth/reset-pass">Proceed to reset</a>
        </p>
        <hr class="mt-4" />
        <p class="text-center">You don't have your account?</p>
        <a role="button" href="/auth/signup" class="btn variant-ghost">
          <span><i class="bi bi-person-fill-add"></i></span>
          <span>Create new account</span>
        </a>
      </div>
    </div>
    <!-- gap dùng để canh khoảng cách giữa 2 element -->
  </form>

  <div class="">
    <div class=""></div>
  </div>
</div>
