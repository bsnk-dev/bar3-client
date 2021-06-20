<script>
import {Line} from 'vue-chartjs';

export default {
  name: 'line-chart',
  extends: Line,

  props: {
    data: Object,
  },

  watch: {
    data: {
      handler(value) {
        this.renderWrapper(value);
      },

      deep: true,
    },
  },

  methods: {
    renderWrapper(value) {
      this.renderChart(value || this.data, {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              //max: 1,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
             id: 'ScartCharxAxes',
              type: 'time',
              time: {
                unit: 'day',
              }
          }]
        },
        legend: {
          display: true,
          labels: {
            fontSize: 11,
            boxWidth: 20,
            padding: 5,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      });
    }
  },

  mounted() {
    this.renderWrapper();
  }
};
</script>
