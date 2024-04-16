<script>
  import BitbleInput from "$lib/components/BitbleInput.svelte";
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
    <div class="w-1/2 p-4 flex flex-col space-y-4 gap-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl">Student Name</h1>
        <button type="button" class="btn-icon variant-ghost">
          <i class="bi bi-pencil"></i>
        </button>
      </div>
      <!-- ... Các phần tử khác trong thẻ div ... -->

      <!-- First Name -->
      <div class="flex items-start">
        <span class="w-1/3">First Name:</span>
        <input class="w-2/3 input" type="text" placeholder="Input" />
      </div>

      <!-- Last Name -->
      <div class="flex items-start">
        <span class="w-1/3">Last Name:</span>
        <input class="w-2/3 input" type="text" placeholder="Input" />
      </div>

      <!-- Gender -->
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
      <div class="flex items-start">
        <BitbleInput
          type="email"
          fieldName="email"
          bind:value={form_email}
          placeholder="Adam.Smith@gmail.com"
          required={true}
        />
      </div>

      <!-- Street Name -->
      <div class="flex items-start">
        <span class="w-1/3">Street Name:</span>
        <input class="w-2/3 input" type="text" placeholder="Input" />
      </div>

      <!-- Area Name -->
      <div class="flex items-start">
        <span class="w-1/3">Area Name:</span>
        <input class="w-2/3 input" type="text" placeholder="Input" />
      </div>

      <!-- City/District -->
      <div class="flex items-start">
        <span class="w-1/3">City/District:</span>
        <input class="w-2/3 input" type="text" placeholder="Input" />
      </div>

      <!-- Country -->
      <div class="flex items-start">
        <span class="w-1/3">Country:</span>
        <input class="w-2/3 input" type="text" placeholder="Input" />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn variant-filled">Submit</button>
    </div>
  </div>
</div>
