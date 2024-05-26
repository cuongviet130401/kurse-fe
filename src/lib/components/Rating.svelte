<script lang="ts">
    import { Ratings } from "@skeletonlabs/skeleton";

    let value = {
        current: 0,
        max: 5,
    };

    function iconClick(event: CustomEvent<{ index: number }>): void {
        value.current = event.detail.index;
    }
</script>

<Ratings
    class="ratings-container mt-4"
    bind:value={value.current}
    max={value.max}
    interactive
    on:icon={iconClick}
>
    <svelte:fragment slot="empty"><i class="bi bi-star"></i></svelte:fragment>
    <svelte:fragment slot="half"><i class="bi bi-star-half"></i></svelte:fragment>
    <svelte:fragment slot="full"><i class="bi bi-star-fill"></i></svelte:fragment>
</Ratings>

<style>
    .ratings-container {
        display: flex;
        align-items: center;
        justify-content: flex-start; /* Align to the left */
    }
</style>
