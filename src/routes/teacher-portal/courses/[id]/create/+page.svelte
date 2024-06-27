<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";
  import ActionInput from "$lib/components/ActionInput.svelte";
  import { provokePost } from "$lib/utils/ServiceApiConnector";
  import {
    preparePayload,
    triggerErrorToast,
    triggerSuccessToast,
  } from "$lib/utils/CommonUtils";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { initializeApp } from "firebase/app";
  import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
  } from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyDpiq4Hvv29BNfZxupCSHYTD4r0avIVa0w",
    authDomain: "bitble-kurge-web-9b22f.firebaseapp.com",
    projectId: "bitble-kurge-web-9b22f",
    storageBucket: "bitble-kurge-web-9b22f.appspot.com",
    messagingSenderId: "671935763881",
    appId: "1:671935763881:web:d9cd9679e5912345cce0b8",
    measurementId: "G-SVYH1EB6ZC",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage();
  const toastStore = getToastStore();
  const storageRef = ref(storage, "video-request");

  let form_title: string;
  let form_createAt: string;
  let form_introductoryVideoUrl: string;
  let form_price: number;
  let form_description: string;
  let form_thumbnailUrl: string;

  let errors: any = {};

  async function handleCreateCourse() {
    const preparedPayload = preparePayload({
      form_title,
      form_createAt,
      form_introductoryVideoUrl,
      form_price,
      form_description,
      form_thumbnailUrl,
    });

    return await provokePost(
      "/kurse/api/v1/courses/COURSE_ID/units",
      preparedPayload
    );
  }

  // Handler upload videos to FireBase
  async function handleUpload(file) {
    const storageRef = ref(storage, "video-request/" + file.name);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl;
  }

  function handleError(err: any) {
    if (err.httpStatus === 404) {
      triggerErrorToast(
        toastStore,
        err.message + " : " + JSON.stringify(err.description)
      );
      return;
    }

    if (err.httpStatus === 400) {
      Object.keys(err.description).forEach((fieldName) => {
        console.log(fieldName);
        errors[fieldName] = err.description[fieldName];
      });
    }
  }

  function onSuccess(result: any) {
    console.log("triggered onSuccess()");
    if (result) {
      triggerSuccessToast(
        toastStore,
        "🎉 Your New Course has been added successfully."
      );
      goto("/teacher-portal/courses");
    }
  }
</script>

<div
  style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2% 0; margin-top: 100px;"
>
  <div class="card p-4 shadow-lg" style="width: 1000px">
    <header class="p-4">
      <div class="flex flex-col gap-8">
        <div
          class="placeholder animate-pulse rounded-md flex justify-center h-72 w-1/2"
        ></div>
        <div>
          <h>Intro Video: </h>
          <input type="file" accept="video/*" on:change={handleUpload} />
        </div>
        <ActionInput
          class="bg-transparent"
          name="title"
          bind:value={form_title}
          {errors}
          label="Title"
          placeholder="Course Name"
          required={true}
        />
      </div>
    </header>
    <section class="p-4">
      <div class="flex flex-col gap-8">
        <div>
          <h>Description:</h>
          <textarea
            name="description"
            class="textarea mt-2 mb-2"
            rows="4"
            placeholder="Enter some info about course."
          />
        </div>
        <div class="flex gap-8 mb-4">
          <ActionInput
            name="price"
            bind:value={form_price}
            {errors}
            label="Price $:"
            placeholder="00.000.000 VND"
            required={true}
          />
        </div>
        <div class="flex gap-4 mb-2">
          <h class="content-center">Curriculum :</h>
        </div>
      </div>
    </section>
    <footer class="footer p-4">
      <ActionButton
        class=" btn bg-gradient-to-br variant-gradient-primary-secondary "
        icon="box-arrow-in-right"
        label="CREATE COURSE"
        onClick={handleCreateCourse}
        {onSuccess}
        onError={handleError}
      />
    </footer>
  </div>
</div>

<style>
  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .gap-4 {
    gap: 1rem;
  }

  .placeholder {
    background-color: #e0e0e0;
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .rounded-md {
    border-radius: 0.375rem;
  }

  .content-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .h-72 {
    height: 18rem;
  }
</style>
