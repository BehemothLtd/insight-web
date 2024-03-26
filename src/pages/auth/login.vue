<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">
                    Welcome Back !
                  </h5>
                  <p>Sign in to continue to Skote.</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img
                  src="@/assets/images/profile-img.png"
                  alt
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link
                tag="a"
                to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img
                      src="@/assets/images/logo.svg"
                      alt
                      height="34" />
                  </span>
                </div>
              </router-link>
            </div>

            <b-form
              class="p-2"
              @submit.prevent="signIn">
              <FormValidator
                class="mb-3"
                label="Email"
                name="email"
                required>
                <b-form-input
                  id="input-1"
                  v-model="formLogin.email"
                  type="text"
                  placeholder="Enter email"
                ></b-form-input>
              </FormValidator>

              <FormValidator
                class="mb-3"
                label="Password"
                name="password"
                required
              >
                <b-form-input
                  id="input-2"
                  v-model="formLogin.password"
                  type="password"
                  placeholder="Enter password"
                ></b-form-input>
              </FormValidator>

              <div class="custom-control custom-checkbox">
                <input
                  id="customControlInline"
                  v-model="formLogin.rememberMe"
                  type="checkbox"
                  class="custom-control-input"
                />
                <label
                  class="custom-control-label"
                  for="customControlInline">
                  Remember me
                </label>
              </div>
              <div class="mt-3">
                <b-button
                  type="submit"
                  variant="primary"
                  class="btn-block">
                  Log In
                </b-button>
              </div>
              <div class="mt-4 text-center">
                <router-link
                  tag="a"
                  to="/forgot-password"
                  class="text-muted">
                  <i class="mdi mdi-lock mr-1"></i> Forgot your password?
                </router-link>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            Don't have an account ?
            <router-link
              tag="a"
              to="/register"
              class="font-weight-medium text-primary"
            >
              Signup now
            </router-link
            >
          </p>
          <p>
            © {{ new Date().getFullYear() }} Skote. Crafted with
            <i class="mdi mdi-heart text-danger"></i> by Themesbrand
          </p>
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<script setup>
import { reactive } from "vue";

import Layout from "@/layouts/auth.vue";
// import 'simplebar/dist/simplebar.min.css';
import { useAuthStore } from "@/stores/auth";

/**
 * Login component
 */
const formLogin = reactive({
  email: null,
  password: null,
  rememberMe: false,
});

// =============STORE=================
const authStore = useAuthStore();

// =============METHODS=================
function signIn() {
  authStore.signInAction({
    email: formLogin.email,
    password: formLogin.password,
    rememberMe: formLogin.rememberMe,
  });
}
</script>

<style lang="scss" module></style>
