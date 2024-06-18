<script>
  import success from "$lib/images/success.gif";
</script>

<div class="w-full flex items-center justify-center">
  <div class="card variant-ghost-success rounded-lg my-8 py-8 w-1/2 h-fit">
    <!-- Content -->
    <img class="mx-auto w-64 h-64 object-contain" src={success} alt="success" />
    <div class="mt-10">
      <p class="text-green-500 text-center text-5xl font-bold">
        Payment Successful
      </p>
      <p class="text-white text-center text-5xl py-5">Thank You!</p>
      <div class="p-8 flex justify-center">
        <button
          type="button"
          class="btn variant-filled mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <span><i class="bi bi-arrow-return-right"></i></span>
          <span>Go to My Courses</span>
        </button>
      </div>
    </div>
  </div>
</div>
