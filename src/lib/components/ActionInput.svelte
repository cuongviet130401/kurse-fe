<script lang="ts">
  export let name: string;
  export let value: any;

  export let label: string;
  export let placeholder: string = "";
  export let type: string = "text";
  export let required = false;
  export let icon = "";
  export let inputClass: string = "input-group grid grid-cols-[auto_1fr_auto]";

  export let errors: any;

  let errorMessage: string = "";
  let invalidClass: string = "";

  $: errorMessage = errors[name] ? errors[name] : "";
  $: invalidClass =
    errorMessage && errorMessage.length > 0 ? "input-error" : "";
  $: if (required && !value && value?.length === 0) {
    errorMessage = "Required field must be filled";
    errors.name = errorMessage;
  } else {
    errorMessage = "";
    delete errors.name;
  }

  $: console.log(errorMessage);
  $: console.log(errors);
</script>

<label class="label">
  <span>
    {label}:
    {#if required}
      <span class="text-red-400">*</span>
    {/if}
  </span>
  <div class={inputClass}>
    {#if icon}
      <div><i class="bi {icon}"></i></div>
    {/if}
    <input
      class="input {invalidClass}"
      id="form_{name}"
      {name}
      {placeholder}
      bind:value
      {required}
      {...{ type }}
      {...$$restProps}
    />
  </div>
  <span class="text-red-400" id="hint_{name}">
    {errorMessage}
  </span>
</label>
