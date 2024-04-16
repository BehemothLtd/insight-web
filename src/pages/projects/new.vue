<template>
  <div class="row">
    {{ project }}
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="container">
            <el-steps
              :active="createCurrentStep"
              direction="vertical"
              finish-status="success"
            >
              <el-step>
                <template #title>
                  <div class="custom-step-description">
                    <i class="step-icon bx bx-spreadsheet"></i>
                    <div class="step-info">
                      <div class="step-count">Step 1</div>
                      <div class="description">Basic Information</div>
                    </div>
                  </div>
                </template>
              </el-step>
              <el-step>
                <template #title>
                  <div class="custom-step-description">
                    <i class="step-icon bx bx-cog"></i>
                    <div class="step-info">
                      <div class="step-count">Step 2</div>
                      <div class="description">Project Statuses</div>
                    </div>
                  </div>
                </template>
              </el-step>
              <el-step>
                <template #title>
                  <div class="custom-step-description">
                    <i class="step-icon bx bx-group"></i>
                    <div class="step-info">
                      <div class="step-count">Step 3</div>
                      <div class="description">Members Management</div>
                    </div>
                  </div>
                </template>
              </el-step>
            </el-steps>

            <div class="box-card">
              <transition name="slide-fade">
                <component
                  :is="stepComponent.component"
                  :issueStatusOptions="issueStatusOptions"
                  v-model="project"
                >
                  <div class="step-title">
                    <div class="step-count">Step {{ createCurrentStep }}</div>
                    <div class="step-info">{{ stepComponent.title }}</div>
                  </div>
                </component>
              </transition>
            </div>

            <div></div>
            <div class="d-flex justify-content-end w-100">
              <b-button
                class="btn mr-2"
                :disabled="createCurrentStep <= 1"
                @click="prevStep"
              >
                Prev Step
              </b-button>

              <b-button
                v-if="createCurrentStep !== totalSteps"
                variant="primary"
                class="btn"
                @click="nextStep"
              >
                Next Step
              </b-button>

              <b-button
                v-if="createCurrentStep === totalSteps"
                variant="primary"
                class="btn"
                @click="submit"
              >
                Create Project
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import CreateProjectStep1 from "@/components/projects/create/CreateProjectStep1.vue";
import CreateProjectStep2 from "@/components/projects/create/CreateProjectStep2.vue";
import CreateProjectStep3 from "@/components/projects/create/CreateProjectStep3.vue";

import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

const project = ref({});
const issueStatusOptions = ref([]);

import { FetchSelectOptions } from "@/apis/repositories";

setBreadcrumb({
  title: "Create Project",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Projects List",
      href: "/projects",
    },
    {
      text: "New",
      active: true,
    },
  ],
});

onMounted(async () => {
  const result = await FetchSelectOptions(["issueStatus"]);

  if (result.SelectOptions) {
    issueStatusOptions.value = result.SelectOptions.IssueStatusOptions;
  }
});

const createCurrentStep = ref(1);
const totalSteps = ref(3);

const stepComponent = computed(() => {
  const currentStep = createCurrentStep.value;

  switch (currentStep) {
    case 2:
      return {
        title: "Project Statuses",
        component: CreateProjectStep2,
      };
    case 3:
      return {
        title: "Members Management",
        component: CreateProjectStep3,
      };
    default:
      return {
        title: "Basic Information",
        component: CreateProjectStep1,
      };
  }
});

function prevStep() {
  if (createCurrentStep.value <= 1) return;
  createCurrentStep.value -= 1;
}

function nextStep() {
  if (createCurrentStep.value >= totalSteps.value) return;
  createCurrentStep.value += 1;
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 350px auto;
  gap: 50px;
  align-items: center;
}

:deep(.el-steps--vertical) {
  height: 300px;

  .el-step.is-vertical {
    flex-direction: row-reverse;
  }
  .el-step__main {
    margin-top: -20px;
  }
  .el-step__title.is-success {
    color: #556ee6;
  }
  .el-step__head.is-success {
    color: #556ee6;
    border-color: #556ee6;
  }
}

.box-card {
  height: 45vh;
  min-height: 550px;
  width: 100%;
  overflow: hidden;
  margin: 30px 0;
  padding: 0 10px;

  .step-title {
    margin: 20px 0;
    font-weight: bold;
    height: 70px;
    .step-count {
      font-size: 16px;
      color: #556ee6;
    }
    .step-info {
      font-size: 21px;
    }
  }
}
.custom-step-description {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  .step-icon {
    font-size: 48px;
  }
  .step-info {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    .step-count {
      font-weight: 100;
    }
    .description {
      font-weight: 500;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
