<script>
  import { page } from "$app/stores";
  import BitbleMarkdown from "$lib/components/shared/BitbleMarkdown.svelte";
  import LoadingPanel from "$lib/components/shared/LoadingPanel.svelte";
  import {
    ProgressRadial,
    tocCrawler,
    TableOfContents,
  } from "@skeletonlabs/skeleton";
  import snarkdown from "snarkdown";
  import { afterUpdate, onMount } from "svelte";
  import { _renderTableOfContent } from "./+page";

  export let data;

  const courseId = $page.params["id"];
  const unitId = Number($page.params["unit_id"]);
  const unitFetcher = data.unitFetcher();

  let renderedContentElement;
  let unitContentElement;
  let renderedTocElement;
  let renderedToc;
  let y;
  let headingPositions;

  function handleScroll(y) {
    // const ;
  }

  $: handleScroll(y);

  afterUpdate(async () => {
    renderedToc = _renderTableOfContent(unitContentElement);
    let headings = Array.from(
      renderedContentElement.querySelectorAll("h1, h2, h3, h4")
    );
    let headingPositions = headings.map(
      (item) => item.getBoundingClientRect().top
    );

    for (let i = 0; i < headingPositions.length; i++) {
      if (headingPositions[i] >= 200 && headingPositions[i] <= 250) {
        // 1. reset active state for all components
        let tocrefDivs = Array.from(
          renderedTocElement.querySelectorAll("div.tocref")
        );
        tocrefDivs.forEach((divElement) => {
          divElement.classList.remove("active");
          divElement.querySelector("a.tocref").classList.remove("active");
        });

        headings.forEach((h) => h.classList.remove());
        tocrefDivs[i].classList.add("active");
        tocrefDivs[i].querySelector("a.tocref").classList.add("active");
      }
    }
  });
</script>

<svelte:window bind:scrollY={y} />

<section class="w-full p-4 flex flex-row">
  {#await unitFetcher}
    <div>
      <ProgressRadial value={undefined} width={"w-14"} strokeLinecap="round" />
    </div>
  {:then value}
    <div class="flex w-full align-center justify-center items-center">
      <div class="grow">
        <h1 class="h1 toc-exclude">{value.title}</h1>
      </div>
      <div class="space-x-2 grow-0">
        <div class="flex justify-center align-center items-center h-full">
          <a
            href={`/student/cre/${courseId}/programme/unit/${unitId - 1}`}
            target="_self"
            class="btn bg-transparent"
          >
            <i class="bi bi-chevron-left mr-2"></i>
            <span>Prev Unit</span>
          </a>
          <a
            href={`/student/cre/${courseId}/programme/unit/${unitId + 1}`}
            target="_self"
            class="btn variant-filled-primary text-white"
          >
            <span>Next Unit</span>
            <i class="bi bi-chevron-right ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  {/await}
</section>

<hr class="border-primary-500 my-4" />

<section class="w-full p-4 m-4 relative">
  {#await unitFetcher}
    <LoadingPanel />
  {:then value}
    <div class="w-full flex relative">
      <section id="course-description" class="grow px-4">
        <div bind:this={renderedContentElement}>
          <BitbleMarkdown md={value.description} />
        </div>
      </section>

      <main
        class="hidden"
        bind:this={unitContentElement}
        use:tocCrawler={{ mode: "generate", scrollTarget: "#page" }}
      >
        {@html snarkdown(value.description)}
      </main>

      <section class="side-toc relative" bind:this={renderedTocElement}>
        {@html renderedToc}
      </section>
    </div>
  {/await}
</section>

<style>
  section.side-toc {
    max-width: 15%;
    width: 15%;
  }
</style>
