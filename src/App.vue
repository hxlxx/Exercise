<script setup lang="ts">
import { reactive, ref } from 'vue'
import { generateEquationWithCount } from '@/util/task'

const options = reactive({
  operator: 'random',
  min: 1,
  max: 10,
  count: 10,
  number: 3,
  showAnswer: false
})
const tasks = ref<any[]>([])
const history = ref<any[]>([[]])
let historyIndex = 0

const handleAddTask = () => {
  const equation = generateEquationWithCount(
    options.min,
    options.max,
    options.operator,
    options.count,
    options.number
  )
  tasks.value = [...tasks.value, ...equation]

  history.value.push(tasks.value)
  historyIndex++
}

const handleReGenerateEquation = () => {
  tasks.value = []
  options.showAnswer = false

  history.value.push(tasks.value)
  historyIndex++
}

const undo = () => {
  if (historyIndex < 1) return
  tasks.value = history.value[--historyIndex]
}
const redo = () => {
  if (historyIndex >= history.value.length - 1) return
  tasks.value = history.value[++historyIndex]
}
</script>

<template>
  <div class="w-full h-full px-10 py-5">
    <form
      class="w-full h-full flex flex-col justify-center gap-2"
      @submit.prevent
    >
      <div class="px-2 py-1 border-2 rounded-[5px]">
        <label for="count"> 题目数量： </label>
        <input id="count" type="text" v-model.number="options.count" />
      </div>
      <div class="px-2 py-1 border-2 rounded-[5px]">
        <label> 题目范围： </label>
        <input id="min" type="text" v-model.number="options.min" />
        <span>~</span>
        <input id="max" type="text" v-model.number="options.max" />
      </div>
      <div class="flex gap-2 items-center px-2 py-1 border-2 rounded-[5px]">
        <label>题目类型：</label>
        <div class="">
          <input
            id="plus"
            name="operator"
            type="radio"
            value="plus"
            v-model="options.operator"
          />
          <label for="plus">加法</label>
        </div>
        <div class="">
          <input
            id="minus"
            name="operator"
            type="radio"
            value="minus"
            v-model="options.operator"
          />
          <label for="minus">减法</label>
        </div>
        <div class="">
          <input
            id="PM"
            name="operator"
            type="radio"
            value="PM"
            v-model="options.operator"
          />
          <label for="PM">连加减</label>
        </div>
        <div class="">
          <input
            id="random"
            name="operator"
            type="radio"
            value="random"
            checked
            v-model="options.operator"
          />
          <label for="random">随机</label>
        </div>
      </div>
      <div
        class="px-2 py-1 border-2 rounded-[5px] flex items-center"
        v-if="options.operator === 'PM' || options.operator === 'random'"
      >
        <label> 连加减个数： </label>
        <input
          type="number"
          name="number"
          id="number"
          min="3"
          max="6"
          v-model="options.number"
        />
      </div>
      <div class="px-2 py-1 border-2 rounded-[5px] flex items-center">
        <label> 选项： </label>
        <div class="flex items-center gap-2">
          <button @click="handleAddTask">添加题目</button>
          <button @click="options.showAnswer = !options.showAnswer">
            显示答案
          </button>
          <button @click="undo">回退</button>
          <button @click="redo">前进</button>
          <button @click="handleReGenerateEquation">重新生成</button>
        </div>
      </div>
    </form>
    <div
      class="h-[100vh] mt-6 p-4 flex flex-col flex-wrap gap-5 border border-amber-500 rounded-[10px]"
    >
      <div class="" v-for="task in tasks" :key="task.equation">
        {{ task.equation }} =
        <span class="text-red-400" v-show="options.showAnswer">
          {{ task.result }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  text-align: center;
  outline: none;
  border: 1px solid #e23;
  border-radius: 5px;
}
input[type='radio'] {
  cursor: pointer;
}
button {
  padding: 4px 8px;
  border: 1px solid #456;
  border-radius: 5px;
  cursor: pointer;
}
button:active {
  background-color: #eee;
}
</style>
