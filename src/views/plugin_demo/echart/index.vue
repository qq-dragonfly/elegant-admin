<script setup lang="ts">
import { onUnmounted } from 'vue'
import {
  barOptions,
  gaugeOptions,
  getPictorialBarOption,
  getScatterOption,
  lineOptions,
  pieOptions,
  radarOptions,
} from './data'
import { useEcharts } from '@/hooks/useEcharts'

const { domRef: pieRef } = useEcharts(() => pieOptions, { onRender() {} })
const { domRef: lineRef } = useEcharts(() => lineOptions, { onRender() {} })
const { domRef: barRef } = useEcharts(() => barOptions, { onRender() {} })
const { domRef: pictorialBarRef } = useEcharts(() => getPictorialBarOption(), { onRender() {} })
const { domRef: radarRef } = useEcharts(() => radarOptions, { onRender() {} })
const { domRef: scatterRef } = useEcharts(() => getScatterOption(), { onRender() {} })
const { domRef: gaugeRef, setOptions: setGaugeOptions } = useEcharts(() => gaugeOptions, { onRender() {} })

let intervalId: NodeJS.Timeout

function initGaugeChart() {
  intervalId = setInterval(() => {
    const date = new Date()
    const second = date.getSeconds()
    const minute = date.getMinutes() + second / 60
    const hour = (date.getHours() % 12) + minute / 60

    setGaugeOptions({
      animationDurationUpdate: 300,
      series: [
        {
          name: 'hour',
          animation: hour !== 0,
          data: [{ value: hour }],
        },
        {
          name: 'minute',
          animation: minute !== 0,
          data: [{ value: minute }],
        },
        {
          animation: second !== 0,
          name: 'second',
          data: [{ value: second }],
        },
      ],
    })
  }, 1000)
}

function clearGaugeChart() {
  clearInterval(intervalId)
}

initGaugeChart()

onUnmounted(() => {
  clearGaugeChart()
})
function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="flex flex-1 flex-col">
    <PageHeader title="Echarts" content="Echarts图表示例">
      <template #content>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add echarts</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://echarts.apache.org/zh/index.html')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        访问 echarts
      </ElButton>
    </PageHeader>
    <div class="mx-8px">
      <el-card class="card-wrapper">
        <div ref="pieRef" class="h-400px" />
      </el-card>
      <el-card :bordered="false" class="card-wrapper">
        <div ref="lineRef" class="h-400px" />
      </el-card>
      <el-card :bordered="false" class="card-wrapper">
        <div ref="barRef" class="h-400px" />
      </el-card>
      <el-card :bordered="false" class="card-wrapper">
        <div ref="radarRef" class="h-400px" />
      </el-card>
      <el-card :bordered="false" class="card-wrapper">
        <div ref="scatterRef" class="h-600px" />
      </el-card>
      <el-card :bordered="false" class="card-wrapper">
        <div ref="pictorialBarRef" class="h-600px" />
      </el-card>
      <el-card :bordered="false" class="card-wrapper">
        <div ref="gaugeRef" class="h-640px" />
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .card-wrapper {
    margin-bottom: 8px;
    position: relative;
  }
</style>
