import { LineChartData } from '../fixtures/lineChartData.ts'
import { AvgData } from './makeAvg.ts'
import makeDisperssion from './makeDisperssion.ts'

export type Deviation = { uv: number; pv: number }

const makeStandartDeviation = (
  data: Array<LineChartData>,
  avg: AvgData,
): Deviation => {
  const { uv, pv } = makeDisperssion(avg, data)
  return { uv: Math.sqrt(uv), pv: Math.sqrt(pv) }
}

export default makeStandartDeviation
