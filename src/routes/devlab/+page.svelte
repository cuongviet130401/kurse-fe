<script>
  import ActionButton from "$lib/components/ActionButton.svelte";
</script>

<div class="w-screen h-screen flex justify-center align-middle items-center">
  <ActionButton
    icon=""
    label="Heheboiz"
    onClick={async () => {
      return new Promise(function (resolve, reject) {
					setTimeout(resolve, 2000);
			})
    }}
		onSuccess={(result) => {
			console.log("Success");
		}}
  />
</div>
