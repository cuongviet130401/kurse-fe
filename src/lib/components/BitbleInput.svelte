<script>
  export let fieldName;
  export let value;
  export let placeholder;

  export let type = "text";
  export let required = false;
  export let icon = "";
</script>

<label class="label">
  <span>
    Email
    {#if required}
      <span class="text-red-400">*</span>
    {/if}
  </span>
  <div class="input-group grid grid-cols-[auto_1fr_auto]">
    {#if icon}
      <div><i class="bi {icon}"></i></div>
    {/if}
    <input
      class="input"
      id="txt_{fieldName}"
      name="email"
      {placeholder}
      bind:value
      {required}
      {...$$restProps}
    />
  </div>
  <span class="text-red-400" id="hint_{fieldName}"></span>
</label>
