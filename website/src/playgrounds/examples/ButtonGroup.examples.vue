<template>
	<div class="examples">
		<div class="group">
			<p class="label">Pill</p>
			<div class="row">
				<UiButtonGroup pill>
					<UiButton variant="secondary" size="sm" icon="create_new_folder" rounded>New folder</UiButton>
					<UiButton variant="secondary" size="sm" icon="upload_file" rounded>Upload</UiButton>
				</UiButtonGroup>
			</div>
		</div>
		<div class="group">
			<p class="label">Attached (segmented)</p>
			<div class="row">
				<UiButtonGroup attached>
					<UiButton variant="secondary" size="sm">Day</UiButton>
					<UiButton variant="secondary" size="sm">Week</UiButton>
					<UiButton variant="secondary" size="sm">Month</UiButton>
				</UiButtonGroup>
			</div>
		</div>
		<div class="group">
			<p class="label">Icon group (pill)</p>
			<div class="row">
				<UiButtonGroup pill>
					<UiButton variant="ghost" size="sm" icon="format_bold" rounded aria-label="Bold" />
					<UiButton variant="ghost" size="sm" icon="format_italic" rounded aria-label="Italic" />
					<UiButton variant="ghost" size="sm" icon="format_underlined" rounded aria-label="Underline" />
				</UiButtonGroup>
			</div>
		</div>
	</div>
</template>
