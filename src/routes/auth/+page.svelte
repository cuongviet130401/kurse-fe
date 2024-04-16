<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { authenticatedUser } from "$lib/configs/auth";
  import { get } from "svelte/store";
  import type { ActionData } from "./$types";
  import { onMount } from "svelte";
  import { blur } from "svelte/transition";
  import { sineInOut } from "svelte/easing";

  export let form: ActionData;
  let returnUrl = $page.url.searchParams.get("return-target");

  onMount(() => {
    // const authUser = get(authenticatedUser);
    // if (authUser) {
    // 	goto(
    // 		returnUrl ??
    // 			`/${
    // 				authUser.roleName === 'STAFF' ? 'showroom-portal' : 'admin-portal'
    // 			}/`
    // 	);
    // }
  });

  $: if (browser) {
    console.log(form);

    if (form?.success) {
      localStorage.setItem(
        "authenticatedUser",
        JSON.stringify(form.authenticatedUser)
      );
      authenticatedUser.set(form.authenticatedUser);
      console.log(
        "[DEBUG store/authUser] " + JSON.stringify(get(authenticatedUser))
      );

      goto(
        returnUrl ??
          `/${
            form.authenticatedUser.roleName === "student"
              ? "teacher"
              : "manager"
          }/`
      );
    }
  }
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

      <label class="label">
        <span class="ml-4">Login identity</span>
        <div class="input-group grid grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-person-circle"></i></div>
          <input
            class="input"
            type="text"
            name="loginIdentity"
            placeholder="Username / Email / Numberphone"
            required
          />
        </div>
      </label>

      <label class="label">
        <span>Password</span>
        <div class="input-group grid grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-key-fill"></i></div>
          <input
            class="input"
            type="text"
            name="loginIdentity"
            placeholder="********"
            required
          />
        </div>
      </label>

      <div class="flex flex-col gap-4" style="margin-top: 2em">
        <button type="submit" class="btn variant-filled space-y-2"
          >Log In</button
        >
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
