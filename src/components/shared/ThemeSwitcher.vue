<template>
  <div :class="theme">
    <button
      id="switch-theme"
      :aria-label="themeText"
      @click="changeClass"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 472.39 472.39"
      >
        <g class="toggle-sun">
          <path
            d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z"
          />
        </g>
        <g class="toggle-circle">
          <circle
            class="cls-1"
            cx="236.2"
            cy="236.2"
            r="103.78"
          />
        </g>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";

import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();

const { theme } = storeToRefs(globalStore);

onMounted(() => {
  setTheme();
});

const themeText = computed(() => {
  const switchTo = theme.value == "dark" ? "light" : "dark";

  return `Switch to ${switchTo} theme`;
});

function changeClass() {
  if (theme.value == "dark") {
    theme.value = "light";
  } else {
    theme.value = "dark";
  }

  setTheme();
}

function setTheme() {
  // Sidebar
  document.body.setAttribute("data-sidebar", theme.value);
}
</script>

<style scoped>
#switch-theme {
  cursor: pointer;
  background: 0;
  border: 0;
  opacity: 0.8;
  padding: 0.2rem;
  border-radius: 50%;
  position: relative;
  isolation: isolate;
  transform: translateY(-2px);
}

#switch-theme svg {
  width: 22px;
  height: 22px;
  fill: var(--clr-foreground);
}

#switch-theme::before {
  content: "";
  position: absolute;
  inset: 0;
  background: hsl(0 0% 50% / 0.2);
  border-radius: inherit;
  transform: scale(0);
  opacity: 0;
  z-index: -1;
}

.light #switch-theme::before {
  animation: pulseToLight 650ms ease-out;
}

.dark #switch-theme::before {
  animation: pulseToDark 650ms ease-out;
}

#switch-theme::after {
  content: attr(aria-label);
  position: absolute;
  color: var(--clr-background);
  background: var(--clr-foreground);
  width: max-content;
  font-size: 0.8rem;
  right: 95%;
  top: calc(50% - 1rem);
  margin: 0 auto;
  padding: 0.5em 1em;
  border-radius: 0.125em;
  opacity: 0;
  transform: scale(0);
  transform-origin: top;
  transition:
    transform 0ms linear 100ms,
    opacity 100ms linear;
}

#switch-theme:hover,
#switch-theme:focus {
  outline: 0;
  opacity: 1;
  background: hsl(0 0% 50% / 0.15);
}

#switch-theme:hover::after,
#switch-theme:focus-visible::after {
  opacity: 0.7;
  transform: scale(1);
  transition:
    transform 70ms linear,
    opacity 70ms linear;
}

.toggle-circle {
  transition: transform 500ms ease-out;
}

.light .toggle-circle {
  transform: translateX(-15%);
}

.toggle-sun {
  transform-origin: center center;
  transition: transform 750ms cubic-bezier(0.11, 0.14, 0.29, 1.32);
}

.moon-mask,
.sun-core,
.sun-rays {
  transition: 750ms ease-out;
  transform-origin: center center;
}
.dark .moon-mask {
  r: 9;
  cx: 12;
  cy: 4;
}
.light .moon-mask {
  r: 5;
  transform: rotate(-90deg);
  cx: 20;
  cy: 0;
}
.dark .sun-core {
  transform: rotate(-40deg);
}
.dark .sun-rays {
  transform: rotate(-180deg);
  opacity: 0;
}
@keyframes pulseToLight {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  10% {
    transform: scale(1);
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes pulseToDark {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  10% {
    transform: scale(1);
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
.light .toggle-sun {
  transform: rotate(0.5turn);
}
.light .img .toggle-sun {
  transform: rotate(0.5turn);
}
.light .sun-rays,
.light .sun-core {
  color: var(--sun-clr);
  fill: var(--sun-clr);
}
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-content: center;
}
.title {
  display: grid;
  place-content: center;
}
h1 {
  font-weight: 900;
  font-size: clamp(3rem, 1rem + 10vw, 8rem);
  line-height: 0.7;
  letter-spacing: 0.02em;
}
.content {
  padding-top: 2rem;
}
.content p ~ p {
  padding-top: 1rem;
}
</style>
