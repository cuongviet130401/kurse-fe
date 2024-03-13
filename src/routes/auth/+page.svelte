<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { authenticatedUser } from "$lib/configs/auth";
  import { get } from "svelte/store";
  import type { ActionData } from "./$types";
  import { onMount } from "svelte";

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

<div
  class="w-screen h-screen bg-gray-200 flex items-center content-center justify-center border-solid"
  style="width: 100vw; height: 100vh"
>
  <div class="toast toast-center toast-middle w-1/3 max-w-[560px] m-auto">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form class="flex flex-col space-y-6 gap-4" method="POST">
        <!-- gap dùng để canh khoảng cách giữa 2 element -->
        <h2 class="text-xl font-medium text-gray-900 dark:text-white p-0">
          Kurses
        </h2>

        <label class="label">
          <span>Username</span>
          <input
            class="input"
            type="text"
            name="loginIdentity"
            placeholder="Username/Email/Numberphone"
            required
          />
        </label>

        <label class="label space-y-2">
          <span>Password</span>
          <input
            class="input"
            type="text"
            name="loginIdentity"
            placeholder="********"
            required
          />
        </label>

        <div class="flex items-start justify-between space-y-2">
          <!-- <Checkbox>Ghi nhớ đăng nhập</Checkbox> -->
          <!-- <A href="/auth/password-reset">Quên mật khẩu?</A> -->
        </div>
        <button type="submit" class="btn variant-filled space-y-2"
          >Sign In</button
        >
      </form>
    </div>
  </div>
</div>
