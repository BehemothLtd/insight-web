<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link
            to="/"
            class="logo logo-dark"
          >
            <span class="logo-sm">
              <img
                src="@/assets/images/logo-behemoth-lg.png"
                alt
                height="22"
              />
            </span>
            <span class="logo-lg">
              <img
                src="@/assets/images/logo_with_name.svg"
                alt
                height="33"
              />
            </span>
          </router-link>

          <router-link
            to="/"
            class="logo logo-light"
          >
            <span class="logo-sm">
              <img
                src="@/assets/images/logo-behemoth-lg.png"
                alt
                height="22"
              />
            </span>
            <span class="logo-lg">
              <img
                src="@/assets/images/logo_with_name.svg"
                alt
                height="33"
              />
            </span>
          </router-link>
        </div>

        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex align-items-center">
        <ThemeSwitcher />

        <div class="dropdown d-none d-lg-inline-block ml-1">
          <button
            type="button"
            class="btn header-item noti-icon"
            @click="initFullScreen"
          >
            <i class="bx bx-fullscreen"></i>
          </button>
        </div>

        <b-dropdown
          right
          variant="black"
          toggle-class="header-item"
        >
          <template #button-content>
            <UserAvatar
              :user="currentUser"
              avatar-size="header-profile-user"
            />
            <span class="d-none d-xl-inline-block ml-1">{{
              currentUser.fullName
            }}</span>
            <!-- <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i> -->
          </template>
          <!-- item-->
          <router-link to="/profile">
            <b-dropdown-item>
              <i class="bx bx-user font-size-16 align-middle mr-1"></i>
              Profile
            </b-dropdown-item>
          </router-link>

          <router-link to="/tempo">
            <b-dropdown-item>
              <i
                class="bx bx-calendar-check font-size-16 align-middle mr-1"
              ></i>
              Tempo
            </b-dropdown-item>
          </router-link>

          <b-dropdown-divider></b-dropdown-divider>

          <router-link
            class="dropdown-item text-danger"
            to="/login"
            @click="logout"
          >
            <i
              class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"
            ></i>
            Logout
          </router-link>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

import UserAvatar from "@/components/molecules/users/UserAvatar.vue";
const authStore = useAuthStore();

const { currentUser } = storeToRefs(authStore);

// ================DATA=================
const collapsedClassString = "sidebar-enable vertical-collpsed";
const className = collapsedClassString.split(" ");

// ===============REACTIVE===============

// ================METHODS=====================
function initFullScreen() {
  document.body.classList.toggle("fullscreen-enable");
  if (
    !document.fullscreenElement &&
    /* alternative standard method */ !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT,
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

function toggleMenu() {
  const body = document.body;

  if (!body) return;

  if (!body.className.includes(collapsedClassString)) {
    body.classList.add(className[0], className[1]);
  } else {
    body.classList.remove(className[0], className[1]);
  }
}

function logout() {
  authStore.token = null;
}
</script>

<style lang="scss" scoped>
.header-profile-user {
  object-fit: cover;
}

:deep(.header-item) {
  display: flex;
  align-items: center;
}
</style>
