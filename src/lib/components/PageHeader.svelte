<script>
  import { AppBar, popup } from "@skeletonlabs/skeleton";
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <div class="flex items-center space-x-4">
      <!-- Logo -->
      <a
        class="lg:!ml-0 w-[32px] lg:w-auto overflow-hidden"
        href="/home"
        title="Go to Homepage"
      >
        (logo)
      </a>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <!-- Explore -->
    <div class="relative lg:block">
      <!-- trigger -->
      <button class="btn hover:variant-soft-primary">
        <span>content1</span>
        <i class="fa-solid fa-caret-down opacity-50" />
      </button>
      <!-- popup -->
      <div class="card p-4 w-60 shadow-xl" data-popup="features">
        <nav class="list-nav">
          <ul>
            <li>
              <a href="/">
                <span class="w-6 text-center"
                  ><i class="fa-solid fa-home" /></span
                >
                <span>Homepage</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span class="w-6 text-center"
                  ><i class="fa-solid fa-book" /></span
                >
                <span>Documentation</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span class="w-6 text-center"
                  ><i class="fa-solid fa-bullhorn" /></span
                >
                <span>Blog</span>
              </a>
            </li>

            <hr class="!my-4" />
            <li>
              <a href="/">
                <span class="w-6 text-center"
                  ><i name="tailwind" width="w-5" height="h-5" /></span
                >
                <span>Tailwind</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span class="w-6 text-center"
                  ><i name="svelte" width="w-6" height="h-6" /></span
                >
                <span>Svelte</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span class="w-6 text-center"
                  ><i class="fa-solid fa-screwdriver-wrench" /></span
                >
                <span>Utilities</span>
              </a>
            </li>
          </ul>
        </nav>
        <!-- <div class="arrow bg-surface-100-800-token" /> -->
      </div>
    </div>
  </svelte:fragment>
</AppBar>
