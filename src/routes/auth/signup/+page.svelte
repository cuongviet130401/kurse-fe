<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";
  import { provokePost } from "$lib/utils/ServiceApiConnector";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { sineInOut } from "svelte/easing";
  import { blur } from "svelte/transition";
  import BitbleInput from "$lib/components/BitbleInput.svelte";

  const toastStore = getToastStore();

  let form_firstName: string;
  let form_lastName: string;
  let form_email: string;
  let form_phoneNumber: string;
  let form_password: string;
  let form_confirmPassword: string;

  let wrp: any;

  async function handleCreateAccount() {
    const preparedPayload = {
      firstName: form_firstName,
      lastName: form_lastName,
      email: form_email,
      phoneNumber: form_phoneNumber,
      password: form_password,
    };

    return await provokePost("/v1/accounts/signup", preparedPayload);
  }

  function handleError(err: any) {
    if (err.httpStatus === 400) {
      wrp.querySelectorAll("[id^='hint_'").forEach((e: HTMLElement) => (e.innerText = ""));
      wrp
        .querySelectorAll("[id^='txt_'")
        .forEach((e: HTMLElement) => e.classList.remove("input-error"));

      Object.keys(err.description).forEach((fieldName) => {
        wrp.querySelector("#txt_" + fieldName).classList.add("input-error");
        wrp.querySelector("#hint_" + fieldName).innerText =
          err.description[fieldName];
      });
      // toastStore.trigger({
      //   message: JSON.stringify(a)
      // })
    }
  }
</script>

<div bind:this={wrp} class="w-screen h-screen flex justify-center items-center">
  <form
    class="card variant-ghost p-8 ml-12 border border-1 rounded h-content w-1/3 min-w-2/5 max-w-[540px]"
    method="POST"
    transition:blur={{ easing: sineInOut }}
  >
    <!-- Các trường form ở đây -->
    <div class="flex flex-col gap-4">
      <div>
        <h2
          class="h2 leading-normal bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
        >
          Welcome, Newcomer
        </h2>
        <p class="text-gray-500 italic">Let us start your learning journey</p>
      </div>

      <hr class="mt-4 mb-4" />

      <div class="grid grid-cols-2 gap-4">
        <label for="" class="label">
          <span>First Name:</span>
          <input
            class="input"
            type="text"
            name=""
            id="txt_firstName"
            bind:value={form_firstName}
          />
        </label>
        <label for="" class="label">
          <span>Last Name:</span>
          <input
            class="input"
            type="text"
            name=""
            id="txt_lastName"
            bind:value={form_lastName}
          />
        </label>
      </div>

      <!-- <label class="label">
        <span>Email</span>
        <div class="input-group grid grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-envelope-paper-fill"></i></div>
          <input
            class="input"
            id="txt_email"
            type="email"
            name="email"
            placeholder="Adam.Smith@gmail.com"
            bind:value={form_email}
            required
          />
        </div>
        <span class="text-red-400" id="hint_email"></span>
      </label> -->

      <label class="label">
        <span>Phone number:</span>
        <div class="input-group grid grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-telephone-fill"></i></div>
          <input
            class="input"
            id="txt_phoneNumber"
            type="tel"
            name="phonenumber"
            placeholder="0987654321"
            bind:value={form_phoneNumber}
            required
          />
        </div>
        <span class="text-red-400" id="hint_phoneNumber"></span>
      </label>

      <label class="label">
        <span>Password</span>
        <div class="input-group grid grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-key-fill"></i></div>
          <input
            class="input"
            id="txt_password"
            type="password"
            name="loginIdentity"
            placeholder="********"
            bind:value={form_password}
            required
          />
        </div>
        <span class="text-red-400" id="hint_password"></span>
      </label>

      <label class="label">
        <span>Confirm your Password</span>
        <div class="input-group grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-key-fill"></i></div>
          <input
            class="input"
            id="txt_confirmPassword"
            type="password"
            name="loginIdentity"
            placeholder="********"
            bind:value={form_confirmPassword}
            required
          />

          <div class="input-group-shim">
            {#if form_password && form_password === form_confirmPassword}
              <i class="bi bi-check-circle-fill text-green-400"></i>
            {:else}
              <i class="bi bi-exclamation-diamond-fill text-red-400"></i>
            {/if}
          </div>
        </div>
        {#if form_password !== form_confirmPassword}
          <p class="align-right">
            <span id="validation-note_confirm-password" class="text-red-400"
              >Does not match original password</span
            >
          </p>
        {/if}
      </label>

      <div class="flex flex-col gap-4" style="margin-top: 2em">
        <!-- <button type="submit" class="btn variant-filled">
          <span><i class="bi bi-person-fill-add"></i></span>
          <span>Create new account</span>
        </button> -->
        <ActionButton
          icon="bi-person-fill-add"
          label="Create new account"
          onClick={handleCreateAccount}
          onError={handleError}
        />
        <hr class="mt-4" />
        <p class="text-center">Already owned your account?</p>
        <a role="button" href="/auth" class="btn variant-ghost">
          <span><i class="bi bi-chevron-left"></i></span>
          <span>Back to log in</span>
        </a>
      </div>
    </div>
    <!-- gap dùng để canh khoảng cách giữa 2 element -->
  </form>

  <div class="">
    <div class=""></div>
  </div>
</div>
