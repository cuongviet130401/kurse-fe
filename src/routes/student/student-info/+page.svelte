<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";

  import { onMount } from "svelte";
  import BitbleAppBar from "$lib/components/BitbleAppBar.svelte";
  import { Avatar } from "@skeletonlabs/skeleton";
  import {
    TreeView,
    TreeViewItem,
    RecursiveTreeView,
    type TreeViewNode,
  } from "@skeletonlabs/skeleton";
  import { authStore } from "$lib/globalStates/authAccount";
  import { students } from "$lib/data/students.js";
  import ActionInput from "$lib/components/ActionInput.svelte";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { preparePayload, triggerErrorToast } from "$lib/utils/CommonUtils";
  import { page } from "$app/stores";
  import BitbleDataTable from "$lib/components/shared/BitbleDataTable.svelte";
  import { _BillStatementDataTableHeaders } from "./+page.js";
  import LoadingPanel from "$lib/components/shared/LoadingPanel.svelte";

  // let authUser = authStore.get();

  let authUser: any;

  try {
    authUser = JSON.parse(authStore.get() ?? "{}");
  } catch (error) {
    authUser = {};
    console.error("Error parsing auth user data:", error);
  }

  let errors: any = {};

  let isEditing = false;

  let returnUrl = $page.url.searchParams.get("return-target");

  const toastStore = getToastStore();

  let form = {
    id: 0,
    avatarUrl: "",
    firstName: "",
    lastName: "",
    gender: "Male",
    email: "",
    phoneNumber: "",
    streetName: "",
    areaName: "",
    city: "",
    country: "",
  };

  //TestLoading
  export let data;
  let billingFetcher = data.billingFetcher();
  console.log(data);

  onMount(() => {
    let student = students[0];
    form = { ...student };
    updateDisabledState(true);
    redirect(); // Initially disable all fields
  });

  const handleLoginOnSuccess = async (result: any) => {
    authStore.save(result);
    redirect();
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
    toggleEditing(); // Disable fields again after saving
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

  function redirect() {
    if (!authStore.get()) {
      return;
    }
    window.location.pathname =
      returnUrl ??
      `/${authStore.get().account.role === "STUDENT_ACCOUNT" ? "student" : "teacher"}/`;
  }

  function downloadBillingInfo() {
    billingFetcher
      .then((value) => {
        const csvContent =
          _BillStatementDataTableHeaders
            .map((header) => header.columnTitle)
            .join(",") +
          "\n" +
          value.records
            .map((row: Record<string, any>) =>
              _BillStatementDataTableHeaders
                .map((header) => JSON.stringify(row[header.columnTitle] ?? ""))
                .join(",")
            )
            .join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "billing-info.csv");
        document.body.appendChild(link); // Required for Firefox
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading billing info:", error);
        triggerErrorToast(toastStore, "Error downloading billing info.");
      });
  }
</script>

<BitbleAppBar />
<div
  style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2% 0; margin-top: 100px;"
>
  <div class="card p-4 shadow-lg" style="width: 1200px">
    <header class="card-header">
      <div class="flex">
        <Avatar
          class="mb-4"
          src={students[0]?.avatarUrl ?? ""}
          width="w-32"
          rounded="rounded-full"
        />

        <!-- <h2 class="h2 ml-4">{authUser?.account.username}</h2> -->

        <h2 class="h2 ml-4">
          {authUser?.account?.studentname ?? "Student Name"}
        </h2>
      </div>
    </header>
    <section class="p-4">
      <h3 class="h3">About</h3>

      <TreeView>
        <TreeViewItem>
          <h4 class="h4">Student Information</h4>
          <svelte:fragment slot="children">
            <TreeViewItem>
              <div class="grid grid-cols-2 gap-2" style="width: 1000px">
                <label class="label mb-4">
                  <span>First Name</span>
                  <input
                    class="input disableable"
                    type="text"
                    placeholder="Nguyen"
                    bind:value={form.firstName}
                  />
                </label>

                <label class="label mb-4">
                  <span>Area Name</span>
                  <input
                    class="input disableable"
                    type="text"
                    placeholder="Input"
                    bind:value={form.areaName}
                  />
                </label>

                <label class="label mb-4">
                  <span>Last Name</span>
                  <input
                    class="input disableable"
                    type="text"
                    placeholder="Van A"
                    bind:value={form.lastName}
                  />
                </label>

                <label class="label mb-4">
                  <span>Street Name</span>
                  <input
                    class="input disableable"
                    type="text"
                    placeholder="Input"
                    bind:value={form.streetName}
                  />
                </label>

                <div class="space-y-2 mb-4">
                  <span>Gender</span>
                  <label class="flex items-center space-x-2">
                    <input
                      class="radio disableable"
                      type="radio"
                      checked
                      name="radio-direct"
                      bind:group={form.gender}
                      value="Male"
                    />
                    <p>Male</p>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      class="radio disableable"
                      type="radio"
                      name="radio-direct"
                      bind:group={form.gender}
                      value="Female"
                    />
                    <p>Female</p>
                  </label>
                </div>

                <label class="label mb-4">
                  <span>City/District</span>
                  <input
                    class="input disableable"
                    type="text"
                    placeholder="Input"
                    bind:value={form.city}
                  />
                </label>

                <ActionInput
                  name="email"
                  bind:value={form.email}
                  {errors}
                  label="Email"
                  class="disableable"
                  icon="bi-envelope-paper-fill"
                  placeholder="Adam.Smith@gmail.com"
                  required={true}
                />
                <!-- <label class="label mb-4">
                  <span>Email</span>
                  <input
                    class="input"
                    type="email"
                    placeholder="nguyenvana@gmail.com"
                    bind:value={form.email}
                  />
                </label> -->

                <label class="label mb-4">
                  <span>Country</span>
                  <input
                    class="input disableable"
                    type="text"
                    placeholder="Input"
                    bind:value={form.country}
                  />
                </label>

                <ActionInput
                  name="phoneNumber"
                  bind:value={form.phoneNumber}
                  {errors}
                  label="Phone number"
                  class="disableable"
                  icon="bi-telephone-fill"
                  placeholder="098-765-4321"
                  required={true}
                />

                <!-- <label class="label mb-4">
                  <span>Phone Number</span>
                  <input
                    class="input"
                    type="text"
                    placeholder="Input"
                    bind:value={form.phoneNumber}
                  />
                </label> -->

                <div class="grid grid-cols-2 gap-4 place-items-end">
                  <div>
                    <!-- <button
                      type="button"
                      style="width: 200px"
                      class="btn disableable bg-gradient-to-br variant-gradient-primary-secondary text-white"
                      on:click={saveStudent}>Save</button
                    > -->
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
            </TreeViewItem>
          </svelte:fragment>
        </TreeViewItem>
        <TreeViewItem
          ><h4 class="h4">Billing Statement</h4>
          <svelte:fragment slot="children">
            <TreeViewItem>
              {#await billingFetcher}
                <LoadingPanel />
              {:then value}
                <BitbleDataTable
                  paginatedResponse={value}
                  tableHeaders={_BillStatementDataTableHeaders}
                  interactable
                />
                <ActionButton
                  icon="bi bi-download"
                  label="Download Bill"
                  style="width: 400px"
                  class="btn bg-gradient-to-br variant-gradient-primary-secondary text-white mt-4"
                  onclick={downloadBillingInfo}
                />
              {/await}
            </TreeViewItem>
          </svelte:fragment>
        </TreeViewItem>
      </TreeView>
    </section>
    <footer class="card-footer"></footer>
  </div>
</div>
