//注册全局组件
Vue.component(
  'input-component',
  Vue.extend({
    template: `
      <div class="input-number" style="display:inline-block;">
        <input type="text" :value="num_child" @change="changeInput($event)" @keyup.up="handleAdd" @keyup.down="handleSub" />
        <button @click="handleAdd" :disabled="num_child>=max_num_child">+</button>
        <button @click="handleSub" :disabled="num_child<=min_num_child">-</button>
      </div>`,
    data: function() {
      return {
        num_child: this.value
      };
    },
    props: {
      value: {
        type: Number, //数字
        default: 0
      },
      step_child: {
        type: Number, //数字
        default: 1
      },
      max_num_child: {
        type: Number,
        default: Infinity //无穷大
      },
      min_num_child: {
        type: Number,
        default: -Infinity //无穷小
      }
    },
    watch: {
      num_child: function(newValue) {
        console.log('watch num_child:', newValue);
        this.$emit('change', newValue);
      },
      value: function(newValue) {
        console.log('watch value:', newValue);
        this.updateValue(newValue);
      }
    },
    methods: {
      changeInput: function(event) {
        console.log('changeInput event:', event); //测试
        let input_value = event.target.value.trim(); //去除空格
        if (isNumber(input_value)) {
          input_value = parseFloat(input_value);
          if (input_value >= this.max_num_child) {
            this.num_child = this.max_num_child;
          } else if (input_value <= this.min_num_child) {
            this.num_child = this.min_num_child;
          } else {
            this.num_child = input_value;
          }
        } else {
          console.log('object :', this.num_child);
          event.target.value = this.num_child; //复原
        }
      },
      handleAdd: function() {
        console.log('执行handleAdd');
        if (this.num_child >= this.max_num_child) {
          console.log('超过最大值');
          return;
        } else {
          this.num_child += this.step_child;
        }
      },
      handleSub: function() {
        console.log('执行handleSub');
        if (this.num_child <= this.min_num_child) {
          console.log('低于最小值');
          return;
        } else {
          this.num_child -= this.step_child;
        }
      },
      updateValue: function(val) {
        if (val >= this.max_num_child) {
          this.num_child = this.max_num_child;
        } else if (val <= this.min_num_child) {
          this.num_child = this.min_num_child;
        } else {
          this.num_child = val;
        }
      }
    },
    mounted() {
      this.updateValue(this.value);
    }
  })
);

function isNumber(value) {
  if (isNaN(value)) {
    console.log('输入非数字');
    return false;
  } else if (value === '') {
    console.log('输入空值');
    return false;
  } else {
    console.log('输入数字');
    return true;
  }
}
