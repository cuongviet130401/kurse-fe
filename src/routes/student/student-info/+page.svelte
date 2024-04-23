<script lang="ts">
  import BitbleInput from "$lib/components/BitbleInput.svelte";
  import { onMount } from "svelte";

  let isEditing = false;

  let form_email = "";
  let form_phoneNumber = "";

  let bills = [
    { id: 1, description: "1", amount: 1 },
    { id: 2, description: "2", amount: 1 },
    { id: 3, description: "3", amount: 1 },
  ];

  function toggleDisabled() {
    isEditing = !isEditing;
    updateDisabledState(isEditing);
  }

  function updateDisabledState(disabled) {
    const elements = document.querySelectorAll(".disableable");
    elements.forEach((element) => {
      element.disabled = disabled;
    });
  }

  onMount(() => {
    updateDisabledState(false);
  });

  function downloadBill() {
    // Data for example
    const data =
      "ID,Description,Amount\n1,Electricity,100\n2,Internet,50\n3,Water,30";

    // Create URL for download
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // Create "a" for Download and Click
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "bill.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
</script>

<div class="w-screen h-screen flex justify-between items-center">
  <div
    class="flex mt-10 items-start justify-center p-8 rounded-lg shadow-md w-full lg:w-4/5"
  >
    <!-- Div bên trái -->
    <div class="w-1/3 p-4 flex flex-col space-y-4 gap-4">
      <div class="flex">
        <ol class="breadcrumb">
          <li class="crumb">
            <a class="anchor" href="/">Home</a>
          </li>
          <li class="crumb-separator" aria-hidden>&rsaquo;</li>
          <li class="crumb">
            <a class="anchor" href="/student">Student</a>
          </li>
          <li class="crumb-separator" aria-hidden>&rsaquo;</li>
          <li>Student Information</li>
        </ol>
      </div>
      <div class="billing-statement">
        <h1 class="text-2xl">Billing Statement</h1>
        <!-- Bảng hóa đơn -->
        <table class="table-auto">
          <!-- Tiêu đề bảng -->

          <thead>
            <!-- Các cột -->
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <!-- Dữ liệu bảng -->
          <tbody>
            {#each bills as bill}
              <tr>
                <td class="border px-4 py-2">{bill.id}</td>
                <td class="border px-4 py-2">{bill.description}</td>
                <td class="border px-4 py-2">{bill.amount}</td>
              </tr>
            {/each}
          </tbody>
        </table>

        <!-- Nút download -->
        <button
          on:click={downloadBill}
          class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Bill
        </button>
      </div>
    </div>

    <!-- Div bên phải -->
    <div
      class="card variant-ghost w-1/2 p-4 flex flex-col space-y-4 gap-4 rounded-xl border"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-2xl">Student Name</h1>

        <!-- Disable & Editing Button -->
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
        <input class="w-2/3 input disableable" type="text" placeholder="" />
      </label>

      <!-- Last Name -->
      <label class="flex items-start">
        <span class="w-1/3">Last Name:</span>
        <input class="w-2/3 input disableable" type="text" placeholder="" />
      </label>

      <!-- CheckBox Gender -->
      <div class="flex items-center space-x-4">
        <span class="w-1/3">Gender:</span>
        <label class="flex items-center space-x-4">
          <input
            class="checkbox disableable"
            type="radio"
            name="options"
            checked
          />
          <p>Male</p>
        </label>
        <label class="flex items-center space-x-4">
          <input class="checkbox disableable" type="radio" name="options" />
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
        <span class="w-1/3">Phone Number:</span>
        <div class="w-2/3 input-group grid grid-cols-[auto_2fr_auto]">
          <input
            class="input disableable"
            id="txt_phoneNumber"
            type="tel"
            name="phonenumber"
            placeholder=""
            bind:value={form_phoneNumber}
            required
          />
        </div>
      </label>

      <!-- Street Name -->
      <label class="flex items-start">
        <span class="w-1/3">Street Name:</span>
        <input class="w-2/3 input disableable" type="text" placeholder="" />
      </label>

      <!-- Area Name -->
      <label class="flex items-start">
        <span class="w-1/3">Area Name:</span>
        <input class="w-2/3 input disableable" type="text" placeholder="" />
      </label>

      <!-- City/District -->
      <label class="flex items-start">
        <span class="w-1/3">City/District:</span>
        <input class="w-2/3 input disableable" type="text" placeholder="" />
      </label>

      <!-- Country -->
      <label class="flex items-start">
        <span class="w-1/3">Country:</span>
        <input class="w-2/3 input disableable" type="text" placeholder="" />
      </label>

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn variant-filled"
        class:hidden={isEditing}
        on:click={toggleDisabled}>Done</button
      >
    </div>
  </div>
</div>
