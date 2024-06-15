<script>

  import { createCalendar, melt } from "@melt-ui/svelte";
  import { CalendarDate } from '@internationalized/date'

	const currentDate = new Date(Date.now());

  const {
    elements: { calendar, heading, grid, cell, prevButton, nextButton },
    states: { months, headingValue, weekdays },
    helpers: { isDateDisabled, isDateUnavailable },
    options: { locale },
  } = createCalendar({
		defaultValue: new CalendarDate(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			currentDate.getDate()
		),
		locale: 'en',
		weekStartsOn: 1,
		isDateDisabled: (date) => {
      return date.day < currentDate.getDate()
    }
	});

</script>
<div use:melt={$calendar}>
	<header>																																			<!--! CALENDAR HEADER -->
		<button use:melt={$prevButton}>
			<span>Left</span>
		</button>
		<div use:melt={$heading}>
			{$headingValue}
		</div>
		<button use:melt={$nextButton}>
			<span>Right</span>
		</button>
	</header>
	<div>																																					<!--! CALENDAR CELLS -->
		{#each $months as month}
			<table use:melt={$grid}>
				<thead aria-hidden="true">
					<tr class="border-b">
						{#each $weekdays as day}
							<th>
								<div>
									{day}
								</div>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each month.weeks as weekDates}
						<tr>
							{#each weekDates as date}
								<td
									role="gridcell"
									aria-disabled={$isDateDisabled(date) ||
										$isDateUnavailable(date)}
								>
									<div use:melt={$cell(date, month.value)}>
										{date.day}
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		{/each}
	</div>
</div>

<style lang="postcss">
  [data-melt-calendar] {
    @apply w-full rounded-lg variant-ghost-surface p-3 shadow-sm mt-4;
  }

  header {
    @apply flex items-center justify-between pb-2;
  }

  header + div {
    @apply flex items-center gap-8;
  }

  [data-melt-calendar-prevbutton] {
    @apply rounded-lg p-1 transition-all hover:bg-blue-500;
  }

  [data-melt-calendar-nextbutton] {
    @apply rounded-lg p-1 transition-all hover:bg-blue-500;
  }

  [data-melt-calendar-heading] {
    @apply font-semibold;
  }

  th {
    @apply text-sm font-semibold;

    & div {
      @apply flex h-6 w-6 items-center justify-center p-4;
    }
  }

  [data-melt-calendar-grid] {
    @apply w-full text-center;
  }

  [data-melt-calendar-cell] {
    @apply flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-lg p-4
		hover:bg-blue-500 focus:ring
		focus:ring-blue-700
		data-[outside-visible-months]:pointer-events-none
		data-[outside-visible-months]:cursor-default
		data-[range-highlighted]:bg-blue-500
		data-[selected]:bg-blue-500
		data-[selected]:text-white
		data-[disabled]:opacity-40
		data-[outside-visible-months]:opacity-40
		data-[outside-visible-months]:hover:bg-transparent;
  }

  [data-melt-calendar-cell][data-outside-month='true'][data-outside-visible-months='true'] {
    @apply opacity-0;
  }
</style>