<script lang="ts">
  import type { PaginatedResponse, TableHeader } from "$lib/types/kurse";
  import { toPaginationSettings } from "$lib/utils/TypeConverters";
  import { Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";


	export let paginatedResponse: PaginatedResponse;
	export let tableHeaders: TableHeader[];
	export let interactable: boolean = false;

	let settings = toPaginationSettings(paginatedResponse._metadata);

	let colspan = tableHeaders.length + 1 + +interactable;

</script>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th class="table-cell-fit" />
				{#each tableHeaders as header}
				<th>
					{#if !!header.icon}
					<span><i class="bi {header.icon} mr-2"></i></span>
					{/if}
					<strong>{header.columnTitle}</strong>
				</th>
				{/each}
				{#if interactable}
				<th class="table-cell-fit"><strong>Actions</strong></th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each paginatedResponse.records as row, i}
				<tr>
					<td class="table-cell-fit"><span class="text-gray-500">{i + 1}</span></td>
					<td>{row.id}</td>
					<td>{row.title}</td>
					<td>{(row.dueDate).toString()}</td>
					<td>{row.openDate}</td>
					<!-- <slot dataRow={row}>

					</slot>	 -->
					{#if interactable}
					<td class="table-cell-fit">
						<div class="text-right space-x-2">
							<a href="" class=""><i class="bi bi-pencil text-primary-500"></i></a>
							<a href="" class=""><i class="bi bi-trash text-red-500"></i></a>
						</div>
					</td>
					{/if}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="{colspan}">
					<div class="w-full flex">
						<div class="grow">{paginatedResponse._metadata.per_page} / {paginatedResponse._metadata.total_count}</div>
						<div>
							<Paginator
								controlVariant={"variant-ghost-surface"}
								active={"variant-ghost-primary"}
								amountText="items/page"
								bind:settings={settings}
								showFirstLastButtons="{true}"
								showPreviousNextButtons="{true}"
								showNumerals
								maxNumerals={10}
							/>
						</div>
					</div>
				</td>
				<!-- <th colspan="3">Calculated Total Weight</th>
				<td>{totalWeight}</td> -->
			</tr>
		</tfoot>
	</table>
</div>