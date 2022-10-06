<template>
  <div
    v-if="hideTooltip"
    class="ellipsis"
  >
    {{ text }}
  </div>
  <v-tooltip
    v-else
    :left="tooltipAlignment === 'left'"
    :top="tooltipAlignment === 'top'"
    :right="tooltipAlignment === 'right'"
    :bottom="tooltipAlignment === 'bottom'"
  >
    <template v-slot:activator="{ on }">
      <div
        class="ellipsis"
        v-on="on"
      >
        {{ text }}
      </div>
    </template>
    <span>
      {{ text }}
    </span>
  </v-tooltip>
</template>

<script src="./ResizableText.ts"/>
