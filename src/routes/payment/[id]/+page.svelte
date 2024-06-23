<script lang="ts">
  import BitbleAppBar from "$lib/components/BitbleAppBar.svelte";
  import { TabGroup, Tab, TabAnchor } from "@skeletonlabs/skeleton";
  import Course from "$lib/components/Course.svelte";
  import ActionButton from "$lib/components/ActionButton.svelte";
  import { authStore } from "$lib/globalStates/authAccount";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { preparePayload, triggerErrorToast } from "$lib/utils/CommonUtils";
  import { provokePost } from "$lib/utils/ServiceApiConnector";
  import QRCODE from "$lib/images/QR_CODE_EX.svg";

  let tabSet: number = 0;

  const toastStore = getToastStore();

  export let data;

  let form_loginIdentity: string;
  let form_password: string;

  const handleLogin = async () =>
    await provokePost(
      "v1/accounts/login",
      preparePayload({ form_loginIdentity, form_password })
    );

  const handleLoginOnSuccess = async (result: any) => {
    authStore.save(result);
  };

  const handleLoginOnError = async (err: any) => {
    triggerErrorToast(
      toastStore,
      "Unauthorized: " + JSON.stringify(err.description)
    );
  };
</script>

<BitbleAppBar />
<div
  style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2% 0; margin-top: 100px;"
>
  <div class="card p-4 shadow-lg" style="width: 1200px">
    <header class="card-header flex justify-center">
      <h2 class="h2">
        <span
          class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone mr-4"
          >Check Out</span
        > Kurge
      </h2>
    </header>
    <section class="p-4">
      <div class="grid grid-cols-2 gap-4">
        <TabGroup>
          <Tab bind:group={tabSet} name="qrcode" value={0}>
            <svelte:fragment slot="lead"></svelte:fragment>
            <i class="bi bi-qr-code"></i><span class="ml-2">QR Pay</span>
          </Tab>
          <Tab bind:group={tabSet} name="paymentcard" value={1}>
            <i class="bi bi-credit-card-fill"></i><span class="ml-2"
              >Payment Card</span
            >
          </Tab>
          <!-- Tab Panels --->
          <svelte:fragment slot="panel">
            {#if tabSet === 0}
              <div class="w-full grid grid-cols-1" style="height: 500px">
                <div class="p-4 border-2 bg-white" style="height: 350px">
                  <div class="flex justify-center size-48">
                    <img src={QRCODE} alt="qrexample" />
                  </div>
                </div>
                <div class="content-start mb-4">
                  <select class="select">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                    <option value="5">Option 5</option>
                  </select>
                </div>
              </div>
              <ActionButton
                icon="bi bi-qr-code-scan"
                label="Purchase Now"
                style="width: 540px"
                class="btn disableable bg-gradient-to-br variant-gradient-primary-secondary text-white"
                onclick={handleLogin}
                onSuccess={handleLoginOnSuccess}
                onError={handleLoginOnError}
              />
            {:else if tabSet === 1}
              <div class="w-full grid grid-cols-1" style="height: 500px">
                <div>01</div>
                <div>02</div>
              </div>
              <ActionButton
                icon="bi bi-credit-card"
                label="Purchase Now"
                style="width: 550px"
                class="btn disableable bg-gradient-to-br variant-gradient-primary-secondary text-white"
                onclick={handleLogin}
                onSuccess={handleLoginOnSuccess}
                onError={handleLoginOnError}
              />
            {/if}
          </svelte:fragment>
        </TabGroup>

        <div class="card p-4 shadow-lg">
          <section class="p-4">
            <div class="flex justify-center">
              {#if data.course}
                <div class="shadow-lg">
                  <Course
                    id={data.course.id}
                    title={data.course.title}
                    thumbnailUrl={data.course.thumbnailUrl}
                    price={data.course.price}
                    numberOfEnrolled={data.course.numberOfEnrolled}
                    numberOfLiked={data.course.numberOfLiked}
                  />
                </div>
              {:else}
                <p>No Course</p>
              {/if}
            </div>
          </section>
          <footer class="card-footer p-4 border-t-2 flex justify-center">
            <h3 class="h3 mt-8">Price : {data.course?.price}</h3>
          </footer>
        </div>
      </div>
    </section>
  </div>
</div>
