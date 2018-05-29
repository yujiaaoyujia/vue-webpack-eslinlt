<template>
  <span>{{formatValue}}</span>
</template>

<script>
const TWEEN = require('@tweenjs/tween.js')

export default {
  name: 'AnimatedInteger',
  props: {
    value: {
      required: true
    },
    format: {
      type: Function
    }
  },

  data() {
    return {
      tweeningValue: 0
    }
  },

  computed: {
    formatValue() {
      if (this.format) {
        return this.format(this.tweeningValue)
      }
      return this.tweeningValue
    }
  },

  mounted() {
    this.tween(0, this.value)
  },

  watch: {
    value(newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },

  methods: {
    tween(startValue, endValue) {
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      // 错误数据返回0
      if (isNaN(+endValue)) {
        return 0
      }

      // 动画数字的位数
      let fixed = 0
      if (parseInt(endValue) !== +endValue) {
        const float = endValue.toString().split('.')[1]
        if (float) {
          fixed = float.length
        }
      }

      new TWEEN.Tween({animateValue: startValue})
        .to({animateValue: endValue}, 1000)
        .onUpdate((item) => {
          this.tweeningValue = item.animateValue.toFixed(fixed)
        })
        .start()

      animate()
    }
  }
}
</script>
