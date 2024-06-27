<script lang="ts">
  import { authStore } from "$lib/globalStates/authAccount";
  import coffeeUrl from "$lib/images/coffee.png";
  import emtpyCoffeeUrl from "$lib/images/empty-clipboard.png";
  import {
    Accordion,
    AccordionItem,
    ProgressBar,
  } from "@skeletonlabs/skeleton";
  import {
    _fetchActionItems,
    _fetchActiveCourses,
    _fetchInactiveCourses,
    _fetchRecentCourse,
  } from "./+page";
  import MiniCalendar from "./../../lib/components/panik-lib/MiniCalendar.svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import ActionButton from "$lib/components/ActionButton.svelte";
  import ActionInput from "$lib/components/ActionInput.svelte";
  import { provokePost } from "$lib/utils/ServiceApiConnector";
  import { preparePayload } from "$lib/utils/CommonUtils";

  let authUser = authStore.get();

  let form_firstName: string;
  let form_lastName: string;
  let form_email: string;
  let form_phoneNumber: string;

  let errors: any = {};

  let isEditing = false;

  async function handleCreateAccount() {
    const preparedPayload = preparePayload({
      form_firstName,
      form_lastName,
      form_email,
      form_phoneNumber,
    });

    return await provokePost("v1/accounts/signup", preparedPayload);
  }

  const inactiveCoursesFetcher = _fetchInactiveCourses();

  const handleLoginOnSuccess = async (result: any) => {
    authStore.save(result);
  };

  const handleLoginOnError = async (err: any) => {
    triggerErrorToast(
      toastStore,
      "Unauthorized: " + JSON.stringify(err.description)
    );
  };

  function saveStudent() {
    // Update student data
    students[0] = { ...form };
    console.log("Student data saved:", students[0]);
    toggleEditing();
  }

  function toggleEditing() {
    isEditing = !isEditing;
    updateDisabledState(!isEditing);
  }

  function updateDisabledState(disabled: boolean) {
    // Khai báo kiểu cho parameter disabled
    const elements = document.querySelectorAll(".disableable");
    elements.forEach((element) => {
      (element as HTMLInputElement | HTMLButtonElement).disabled = disabled;
    });
  }
</script>

<section class="m-8 p-8 flex flex-row h-screen">
  <section class="grow px-4">
    <section style="padding-bottom: 2rem">
      <p class="h2">👋 Have a good day! {authUser?.account.username}</p>
      <hr class="my-8" />
      <h3 class="h3">Your Information</h3>
    </section>

    <section id="main-content" class="w-full">
      <div id="active-courses" style="margin-bottom: 2rem;" class="w-full">
        <div
          id="recent-course-navigation gap-4"
          style="margin-bottom: 2rem;"
          class="flex justify-center"
        >
          <div class="grid grid-cols-2 gap-4" style="width: 1000px">
            <label class="label mb-4">
              <span>First Name</span>
              <input
                class="input disableable"
                type="text"
                placeholder="Nguyen"
                bind:value={form_firstName}
              />
            </label>

            <label class="label mb-4">
              <span>Last Name</span>
              <input
                class="input disableable"
                type="text"
                placeholder="Van A"
                bind:value={form_lastName}
              />
            </label>

            <ActionInput
              name="email"
              bind:value={form_email}
              {errors}
              label="Email"
              class="disableable"
              icon="bi-envelope-paper-fill"
              placeholder="Adam.Smith@gmail.com"
              required={true}
            />

            <ActionInput
              name="phoneNumber"
              bind:value={form_phoneNumber}
              {errors}
              label="Phone number"
              class="disableable"
              icon="bi-telephone-fill"
              placeholder="098-765-4321"
              required={true}
            />

            <div></div>

            <div class="grid grid-cols-2 gap-4 place-items-start">
              <div>
                <ActionButton
                  icon="bi bi-save"
                  label="Save"
                  style="width: 200px"
                  class="btn disableable bg-gradient-to-br variant-gradient-primary-secondary text-white"
                  onclick={saveStudent}
                  onSuccess={handleLoginOnSuccess}
                  onError={handleLoginOnError}
                />
              </div>
              <div>
                <button
                  type="button"
                  style="width: 200px"
                  class="btn bi bi-pencil-square bg-white text-black gap-2"
                  on:click={toggleEditing}
                >
                  Edit</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="inactive-courses">
        <Accordion>
          <AccordionItem
            open
            padding="p-4"
            regionControl="variant-ghost"
            regionPanel="py-4 my-4"
          >
            <svelte:fragment slot="lead">
              <i class="bi bi-archive"></i>
            </svelte:fragment>
            <svelte:fragment slot="summary"
              >Your Created Courses</svelte:fragment
            >
            <svelte:fragment slot="content">
              {#await inactiveCoursesFetcher}
                <div class="flex flex-row gap-4 flex-wrap w-full">
                  <div
                    class="placeholder animate-pulse rounded-md"
                    style="height: 400px; width: 300px;"
                  ></div>
                  <div
                    class="placeholder animate-pulse rounded-md"
                    style="height: 400px; width: 300px;"
                  ></div>
                  <div
                    class="placeholder animate-pulse rounded-md"
                    style="height: 400px; width: 300px;"
                  ></div>
                  <div
                    class="placeholder animate-pulse rounded-md"
                    style="height: 400px; width: 300px;"
                  ></div>
                </div>
              {:then inactiveCourses}
                {#each inactiveCourses as course}
                  <div
                    class="card m-4 !p-0 card-hover shadow-xl hover:shadow-2xl flex flex-col justify-between"
                    style="height: 400px; width: 300px; max-width: 300px"
                  >
                    <header
                      class="card-header !p-0 overflow-y-hidden rounded-t-lg"
                    >
                      <a href="/student/cre/{course.id}/">
                        <img
                          src={course.imgUrl}
                          class="w-full"
                          style="min-width: 100%;"
                          alt=""
                        />
                      </a>
                    </header>
                    <section class="p-4 grow">
                      <h4 class="h4">
                        <a href="/student/cre/{course.id}/">
                          {course.title}
                        </a>
                      </h4>
                    </section>
                    <footer
                      class="card-footer !p-2 flex flex-row gap-4"
                      style="border-top-width: 1px; border-top-color: darkgray;"
                    >
                      <a href="/student/cre/{course.id}/notifications">
                        {#if course.unreadNotificationsCount}
                          <span class="badge-icon variant-filled-surface"
                            >{course.unreadNotificationsCount}</span
                          >
                        {/if}
                        <i class="bi bi-bell"></i>
                      </a>
                      <a
                        href="/student/cre/{course.id}/action-items"
                        class="btn bg-transparent inline-block p-2 relative"
                      >
                        {#if course.actionItemsCount}
                          <span class="badge-icon variant-filled-surface"
                            >{course.actionItemsCount}</span
                          >
                        {/if}
                        <i class="bi bi-card-checklist"></i>
                      </a>
                    </footer>
                  </div>
                {:else}
                  <div class="w-full flex justify-center items-center">
                    <div
                      class="card variant-soft flex flex-col justify-center items-center p-8"
                      style="max-width: 50%; width: 50%"
                    >
                      <img src={emtpyCoffeeUrl} alt="" width="150" />
                      <p class="mt-4 text-gray-400">Seem like nothing here</p>
                    </div>
                  </div>
                {/each}
              {/await}
            </svelte:fragment>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  </section>

  <section
    id="right-sidebar"
    class="card variant-ghost p-8 flex flex-col gap-8"
    style="width: 25vw;"
  >
    <div>
      <h3 class="h3">
        <i class="bi bi-calendar3"></i>
        Calendar
      </h3>
      <div>
        <MiniCalendar />
      </div>
    </div>
    <hr />
    <div>
      <h3 class="h3">
        <i class="bi bi-list-task"></i>
        Create Assignments
      </h3>
      <div class="pt-4">
        {#await _fetchActionItems()}
          <div class="flex flex-col gap-4">
            <div
              class="placeholder animate-pulse rounded-md"
              style="height: 50px;"
            ></div>
            <div
              class="placeholder animate-pulse rounded-md"
              style="height: 50px;"
            ></div>
            <div
              class="placeholder animate-pulse rounded-md"
              style="height: 50px;"
            ></div>
          </div>
        {:then value}
          {#if value.length}
            <div></div>
          {:else}
            <div
              class="card variant-ghost-success flex flex-col justify-center items-center p-8"
            >
              <img src={coffeeUrl} alt="" width="150" />
              <p class="mt-4">You have no tasks, take a rest</p>
            </div>
          {/if}
        {/await}
      </div>
    </div>
  </section>
</section>

<style>
  footer.card-footer a {
    @apply btn bg-transparent inline-block p-2 relative;
  }

  footer.card-footer a span.badge-icon {
    @apply variant-filled-primary absolute z-10 !text-xs;
    top: 0;
    right: 0;
    color: white !important;
  }

  footer.card-footer a i.bi {
    font-size: 1.5rem;
  }
</style>
