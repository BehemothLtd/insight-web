<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          {{ new Date().getFullYear() }} ©
          <a
            href="https://behemoth.vn"
            target="_blank"
          >
            Behemoth.vn
          </a>
        </div>
        <div class="col-sm-6">
          <div class="text-sm-right d-none d-sm-block">
            Design & Develop by Behemoth
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- end footer -->
</template>
<style>
.footer {
  padding: 10px calc(24px / 2);
  height: 40px;
}
</style>
