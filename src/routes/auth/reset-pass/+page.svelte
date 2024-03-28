<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";
  import { sineInOut } from "svelte/easing";
  import { blur } from "svelte/transition";

</script>

<div class="w-screen h-screen flex flex-row justify-start items-center pl-4">
  <form
    class="card variant-ghost p-8 ml-16 border border-1 rounded h-content w-1/3 min-w-2/5 max-w-[540px]"
    method="POST"
    transition:blur={{easing: sineInOut}}
  >
    <div class="flex flex-col gap-4">
      <div>
        <h1
          class="h1 leading-normal bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
        >
          Kurges
        </h1>
        <p class="text-gray-500 italic mb-6">A Bitble's Product</p>
      </div>

      <label class="label">
        <span>Email</span>
        <div class="input-group grid grid-cols-[auto_1fr_auto]">
          <div><i class="bi bi-envelope-paper-fill"></i></div>
          <input
            class="input"
            type="email"
            name="email"
            placeholder="Adam.Smith@gmail.com"
            required
          />
        </div>
      </label>

			<p class="mb-10"><small>Please provide us your registered email. We will send you an email in your mailbox. Please check and follow the instruction to recover your password</small></p>

			<ActionButton icon="bi-send-fill" label="Send recover email"/>
    </div>
  </form>
</div>
