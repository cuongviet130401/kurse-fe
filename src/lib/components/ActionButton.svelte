<script>
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import { quadInOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  export let icon;
  export let label;
  export let successIcon = "bi-check-circle-fill";
  export let disabled = false;
  export let styleClasses = "variant-filled";
  export let submitBtn = false;

  export let onClick = async () => {};
  export let onSuccess = (result) => {
    console.log(result);
    isSuccess = false;
  };
  export let onError = (err) => {
    console.error(err);
  };

  let isLoading = false;
  let isSuccess = false;
  let isValidationError = false;
  let error;

  function handleClick() {
    isLoading = true;
    try {
      onClick()
        .then((result) => {

          if (result?.status >= 400) {
            throw { ...result };
          }

          isSuccess = true;
					isLoading = false;
					onSuccess(result);
        })
        .catch((err) => {
          console.log("INSIDE ASYNC ERROR");

          onError(err);
        })
        .finally(() => {
          isLoading = false;
        });
    } catch (err) {
      console.log("OUTSIDE ASYNC ERROR");
      console.log(err);
      if (err === "ValidationError") {
        isValidationError = true;
        return;
      }
      error = JSON.parse(JSON.stringify(err));
      console.log(err);
      if (Object.entries(error).length === 0) {
        error = {
          message: `${err}`,
        };
      }
      console.error(error);
    }
  }
</script>

<button
  type="{ submitBtn ? 'submit' : 'button' }"
  class="btn {styleClasses}"
  on:click={handleClick}
  on:submit={handleClick}
  {...$$props}
  {...$$restProps}
  disabled="{disabled || isLoading}"
>
  {#if isLoading}
	<div transition:slide={{axis: 'x', easing: quadInOut}}>
    <ProgressRadial value={undefined} width="w-4" strokeLinecap="round" />
	</div>
  {:else if icon}
    <span transition:slide={{axis: 'x', easing: quadInOut}}><i class="bi {icon}"></i></span>
  {/if}
  <span>{label}</span>
  {#if isLoading}
    ...
  {/if}
</button>
