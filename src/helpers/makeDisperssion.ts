import { AvgData } from './makeAvg.ts'
import { LineChartData } from '../fixtures/lineChartData.ts'

export type Disperssion = { uv: number; pv: number }

const makeDisperssion = (
  avg: AvgData,
  data: Array<LineChartData>,
): Disperssion => {
  const { uv, pv } = data.reduce(
    (acc, { uv, pv }) => {
      const squareDiffUv = Math.pow(uv - avg.uv, 2)
      const squareDiffPv = Math.pow(pv - avg.pv, 2)

      acc.uv += squareDiffUv
      acc.pv += squareDiffPv

      return acc
    },
    { uv: 0, pv: 0 },
  )
  return { uv: uv / (data.length - 1), pv: pv / (data.length - 1) }
}

export default makeDisperssion
