<script lang="ts">
  import BitbleInput from "$lib/components/BitbleInput.svelte";
  import { writable } from "svelte/store";

  let isDisabled = writable(false);

  let form_email;
  let form_phoneNumber;

  function toggleDisabled() {
    isDisabled.update((prev) => !prev);
  }
</script>

<div class="w-screen h-screen flex justify-center items-center">
  <div
    class="flex mt-10 items-start justify-center p-8 rounded-lg shadow-md w-full lg:w-4/5"
  >
    <!-- Div bên trái -->
    <div class="w-1/3 p-4">
      <div class="flex">
        <ol class="breadcrumb">
          <li class="crumb">
            <a class="anchor" href="/elements/breadcrumbs">Home</a>
          </li>
          <li class="crumb-separator" aria-hidden>&rsaquo;</li>
          <li class="crumb">
            <a class="anchor" href="/elements/breadcrumbs">Student</a>
          </li>
          <li class="crumb-separator" aria-hidden>&rsaquo;</li>
          <li>Student Information</li>
        </ol>
      </div>
    </div>

    <!-- Div bên phải -->
    <class class="w-1/2 p-4 flex flex-col space-y-4 gap-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl">Student Name</h1>

        <!-- Disable Button -->

        <button
          type="button"
          class="btn-icon variant-ghost"
          on:click={toggleDisabled}
        >
          <i class="bi bi-pencil"></i>
        </button>
      </div>

      <!-- ... Các phần tử khác trong thẻ div ... -->

      <!-- First Name -->
      <label class="flex items-start">
        <span class="w-1/3">First Name:</span>
        <input
          class="w-2/3 input"
          type="text"
          placeholder=""
          disabled={$isDisabled}
        />
      </label>

      <!-- Last Name -->
      <label class="flex items-start">
        <span class="w-1/3">Last Name:</span>
        <input class="w-2/3 input" type="text" placeholder="" />
      </label>

      <!-- CheckBox Gender -->
      <div class="flex items-center space-x-4">
        <span class="w-1/3">Gender:</span>
        <label class="flex items-center space-x-4">
          <input class="checkbox" type="radio" name="options" checked />
          <p>Male</p>
        </label>
        <label class="flex items-center space-x-4">
          <input class="checkbox" type="radio" name="options" />
          <p>Female</p>
        </label>
      </div>

      <!-- Email -->
      <div class="flex item_center">
        <BitbleInput
          type="email"
          fieldName="email"
          bind:value={form_email}
          placeholder=""
          required={true}
        />
      </div>

      <!-- Phone Number -->
      <label class="label flex items-start">
        <span class="w-1/3">Phone number:</span>
        <div class="w-2/3 input-group grid grid-cols-[auto_2fr_auto]">
          <input
            class="input"
            id="txt_phoneNumber"
            type="tel"
            name="phonenumber"
            placeholder=""
            bind:value={form_phoneNumber}
            required
          />
        </div>
        <span class="text-red-400" id="hint_phoneNumber"></span>
      </label>

      <!-- Street Name -->
      <label class="flex items-start">
        <span class="w-1/3">Street Name:</span>
        <input class="w-2/3 input" type="text" placeholder="" />
      </label>

      <!-- Area Name -->
      <label class="flex items-start">
        <span class="w-1/3">Area Name:</span>
        <input class="w-2/3 input" type="text" placeholder="" />
      </label>

      <!-- City/District -->
      <label class="flex items-start">
        <span class="w-1/3">City/District:</span>
        <input class="w-2/3 input" type="text" placeholder="" />
      </label>

      <!-- Country -->
      <label class="flex items-start">
        <span class="w-1/3">Country:</span>
        <input class="w-2/3 input" type="text" placeholder="" />
      </label>

      <!-- Submit Button -->
      <button type="submit" class="btn variant-filled">Done</button>
    </class>
  </div>
</div>
