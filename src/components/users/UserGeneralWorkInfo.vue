    <template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">Monthly Stats</h4>

      <div class="row">
        <apexchart
          type="polarArea"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>

      <div
        v-if="currentUser.thisMonthWorkingHours"
        class="row mt-2"
      >
        <p class="text-muted col-sm-12">This month working hours</p>

        <div class="row">
          <div class="col-sm-6">
            <h3>
            ~ {{ currentUser.thisMonthWorkingHours.hours }} hours
            </h3>

            <span
              :class="
                currentUser.thisMonthWorkingHours.upFromLastMonth
                  ? 'text-success'
                  : 'text-danger'
              "
            >
              {{
                currentUser.thisMonthWorkingHours.percentCompareToLastMonth.toFixed(1)
              }}%
              <i
                class="mdi"
                :class="
                  currentUser.thisMonthWorkingHours.upFromLastMonth
                    ? 'mdi-arrow-up'
                    : 'mdi-arrow-down'
                "
              ></i>
            </span>
            From last month
          </div>

          <p class="text-muted col-sm-6">
            <div class="mt-1 text-right">
              <router-link
                to="/timesheets"
                class="btn btn-primary waves-effect waves-light btn-sm"
              >
                View More <i class="mdi mdi-arrow-right ms-1"></i>
              </router-link>
            </div>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const series = computed(() => {
  return currentUser.value?.thisMonthWorkingHours?.timeGraphOnProjects?.series || [];
});

const yaxisMax = computed(() => {
  const result = Math.max(series.value) == 0 ?  180 : Math.max(series.value);

  return (result < 5) ? 5 : result;
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "polarArea",
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    yaxis: {
      min: 10,
      max: yaxisMax.value,
    },
    labels: currentUser.value?.thisMonthWorkingHours?.timeGraphOnProjects?.labels || [],
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val + " hours"];
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
});

import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const { currentUser } = storeToRefs(authStore);
</script>
