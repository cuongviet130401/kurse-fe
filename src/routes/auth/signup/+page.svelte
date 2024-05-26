<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";
  import { provokePost } from "../../../lib/utils/ServiceApiConnector";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { sineInOut } from "svelte/easing";
  import { blur } from "svelte/transition";
  import Result from "postcss/lib/result";
  import { goto } from "$app/navigation";
  import ActionInput from "$lib/components/ActionInput.svelte";
  import { preparePayload, triggerErrorToast, triggerSuccessToast } from "$lib/utils/CommonUtils";

  const toastStore = getToastStore();

  let form_firstName: string;
  let form_lastName: string;
  let form_email: string;
  let form_phoneNumber: string;
  let form_password: string;
  let form_confirmPassword: string;

  let wrp: any;
  let errors: any = {};

  async function handleCreateAccount() {
    const preparedPayload = preparePayload({
      form_firstName, form_lastName, form_email, form_phoneNumber, form_password
    })

    return await provokePost("v1/accounts/signup", preparedPayload);
  }

  function handleError(err: any) {

    if (err.httpStatus === 404) {
      triggerErrorToast(toastStore, err.message + " : " + JSON.stringify(err.description))
      return;
    }

    if (err.httpStatus === 400) {
      Object.keys(err.description).forEach((fieldName) => {
        console.log(fieldName)
        errors[fieldName] = err.description[fieldName]
      });
    }
  }

  function onSuccess(result: any) {
    console.log("triggered onSuccess()")
    if (result) {
      triggerSuccessToast(toastStore, '🎉 You account has been initialized successfully.')
      goto("/auth");
    }
  }
</script>

<div bind:this={wrp} class="w-screen h-screen flex justify-center items-center">
  <form
    class="card variant-ghost p-8 ml-12 border border-1 rounded h-content w-1/3 min-w-2/5 max-w-[540px]"
    method="POST"
    transition:blur={{ easing: sineInOut }}
  >
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
        <ActionInput
          name="firstName"
          bind:value={form_firstName}
          {errors}
          label="First name"
          required={true}
          inputClass={""}
        />

        <ActionInput
          name="lastName"
          bind:value={form_lastName}
          {errors}
          label="Last name"
          required={true}
          inputClass={""}
        />
      </div>


      <ActionInput
        name="email"
        bind:value={form_email}
        {errors}
        label="Email"
        icon="bi-envelope-paper-fill"
        placeholder="Adam.Smith@gmail.com"
        required={true}
      />

      <!-- <label class="label">
        <span>Email</span>
        <div class="input-group grid grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-envelope-paper-fill"></i></div>
          <input
            class="input"
            id="txt_email"
            type="email"
            name="email"
            bind:value={form_email}
            required
          />
        </div>
        <span class="text-red-400" id="hint_email"></span>
      </label> -->

      <ActionInput
        name="phoneNumber"
        bind:value={form_phoneNumber}
        {errors}
        label="Phone number"
        icon="bi-telephone-fill"
        placeholder="098-765-4321"
        required={true}
      />

      <ActionInput
        name="password"
        type="password"
        bind:value={form_password}
        {errors}
        label="Password"
        icon="bi-key-fill"
        placeholder="********"
        required={true}
      />

      <label class="label">
        <span>Confirm your Password</span>
        <div class="input-group grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-key-fill"></i></div>
          <input
            class="input"
            id="form_confirmPassword"
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
        <ActionButton
          icon="bi-person-fill-add"
          label="Create new account"
          onClick={handleCreateAccount}
          {onSuccess}
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
  </form>
</div>
