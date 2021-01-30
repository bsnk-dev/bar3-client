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
      });
    }
  },

  mounted() {
    this.renderWrapper();
  }
};
</script>
