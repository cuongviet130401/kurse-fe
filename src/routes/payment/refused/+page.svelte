<script>
  import BitbleAppBar from "$lib/components/BitbleAppBar.svelte";
  import refuse from "$lib/images/refuse.gif";
</script>

<BitbleAppBar />
<div
  class="w-full flex items-center justify-center"
  style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2% 0; margin-top: 200px;"
>
  <div class="card variant-ghost-error rounded-lg my-8 py-8 w-1/2 h-fit">
    <!-- Content -->
    <img class="mx-auto w-64 h-64 object-contain" src={refuse} alt="refuse" />
    <div class="mt-10">
      <p class="text-red-500 text-center text-5xl font-bold">
        Payment Refused !!!
      </p>
      <p class="text-white text-center text-5xl py-5">
        Please Check Your Payment Again
      </p>
      <div class="p-8 flex justify-center">
        <button
          type="button"
          class="btn variant-filled mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <span><i class="bi bi-arrow-return-right"></i></span>
          <span>Go to Courses</span>
        </button>
      </div>
    </div>
  </div>
</div>
