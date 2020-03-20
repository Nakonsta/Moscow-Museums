<template>
    <div class="container">
        <div
            class="museums__select"
            @blur="open = false"
        >
            <div
            class="museums__select-selected"
            :class="{open: open}"
            @click="open = !open"
            >
            {{ selected }}
            </div>
            <div
            class="items"
            :class="{selectHide: !open}"
            >
            <div
                class="item"
                v-for="(option, i) of options"
                :key="i"
                @click="selected=option; open=false; $emit('input', option)"
            >
                {{ option }}
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:{
    options:{
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: this.options.length > 0 ? this.options[0] : null,
      open: false
    };
  },
  mounted(){
    this.$emit('input', this.selected);
  }
};
</script>

<style scoped>

.museums__select {
  position: relative;
  width: 20%;
  text-align: left;
  outline: none;
  height: 30px;
  line-height: 30px;
  margin-bottom: 30px;
}

.museums__select-selected {
  border-radius: 6px;
  border: 1px solid #858586;
  color: #000;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.museums__select-selected.open{
  border: 1px solid #17a2b8;
  border-radius: 6px 6px 0px 0px;
}

.museums__select-selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-color: #17a2b8 transparent transparent transparent;
}

.items {
  color: #000;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #17a2b8;
  border-left: 1px solid #17a2b8;
  border-bottom: 1px solid #17a2b8;
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  position: relative;
  z-index: 5;
}

.item{
  color: #000;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.item:hover{
  background-color: #138496;
  color: #fff;
}

.selectHide {
  display: none;
}
</style>