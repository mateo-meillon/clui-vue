<template>
	<div class="examples">
		<div class="group">
			<p class="label">Triggers</p>
			<div class="droprow">
				<UiDropdown align="start">
					<template #trigger="{ isOpen, toggle }">
						<UiButton variant="secondary" size="sm" :active="isOpen" @click="toggle">Align start</UiButton>
					</template>
					<template #default="{ close }">
						<button type="button" class="ui-dropdown-item" @click="close">Profile</button>
						<button type="button" class="ui-dropdown-item" @click="close">Sign out</button>
					</template>
				</UiDropdown>
				<UiDropdown align="end">
					<template #trigger="{ isOpen, toggle }">
						<UiButton variant="ghost" size="sm" :active="isOpen" @click="toggle">Align end</UiButton>
					</template>
					<template #default="{ close }">
						<button type="button" class="ui-dropdown-item" @click="close">Copy</button>
						<button type="button" class="ui-dropdown-item" @click="close">Paste</button>
					</template>
				</UiDropdown>
			</div>
		</div>

		<div class="group">
			<p class="label">Viewport flip (corners)</p>
			<p class="hint">Open menus near viewport edges — panel flips to stay visible.</p>
			<div class="corner-demo">
				<UiDropdown align="start" class="corner-demo__bl">
					<template #trigger="{ isOpen, toggle }">
						<UiButton variant="secondary" size="sm" :active="isOpen" @click="toggle">Bottom left</UiButton>
					</template>
					<template #default="{ close }">
						<button type="button" class="ui-dropdown-item" @click="close">Item one</button>
						<button type="button" class="ui-dropdown-item" @click="close">Item two</button>
						<button type="button" class="ui-dropdown-item" @click="close">Item three</button>
					</template>
				</UiDropdown>
				<UiDropdown align="end" class="corner-demo__br">
					<template #trigger="{ isOpen, toggle }">
						<UiButton variant="secondary" size="sm" :active="isOpen" @click="toggle">Bottom right</UiButton>
					</template>
					<template #default="{ close }">
						<button type="button" class="ui-dropdown-item" @click="close">Item one</button>
						<button type="button" class="ui-dropdown-item" @click="close">Item two</button>
						<button type="button" class="ui-dropdown-item" @click="close">Item three</button>
					</template>
				</UiDropdown>
			</div>
		</div>

		<div class="group">
			<p class="label">Overflow container (portal)</p>
			<p class="hint">Panel teleports to body and is not clipped by overflow:hidden.</p>
			<div class="overflow-box">
				<div class="overflow-box__scroll">
					<p class="overflow-box__spacer">Scroll down</p>
					<UiDropdown align="end">
						<template #trigger="{ isOpen, toggle }">
							<UiButton variant="secondary" size="sm" :active="isOpen" @click="toggle">Menu in scroll</UiButton>
						</template>
						<template #default="{ close }">
							<button type="button" class="ui-dropdown-item" @click="close">Action A</button>
							<button type="button" class="ui-dropdown-item" @click="close">Action B</button>
							<button type="button" class="ui-dropdown-item" @click="close">Action C</button>
						</template>
					</UiDropdown>
					<p class="overflow-box__spacer">More content below</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.droprow {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: $space-4;
}

.hint {
	margin: 0 0 $space-3;
	font-size: $text-sm;
	color: var(--color-text-muted, #{$color-gray-500});
}

.corner-demo {
	position: relative;
	min-height: 12rem;
}

.corner-demo__bl {
	position: absolute;
	bottom: $space-4;
	left: $space-4;
}

.corner-demo__br {
	position: absolute;
	bottom: $space-4;
	right: $space-4;
}

.overflow-box {
	overflow: hidden;
	max-width: 16rem;
}

.overflow-box__scroll {
	max-height: 8rem;
	overflow-y: auto;
	padding: $space-3;
	display: flex;
	flex-direction: column;
	gap: $space-3;
}

.overflow-box__spacer {
	margin: 0;
	font-size: $text-sm;
	color: var(--color-text-muted, #{$color-gray-500});
}
</style>
