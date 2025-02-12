import { LineChartData } from '../fixtures/lineChartData.ts'

export type AvgData = {
  uv: number
  pv: number
}

const makeAvg = (data: Array<LineChartData>): AvgData => {
  const { uv, pv } = data.reduce(
    (acc, { uv, pv }) => {
      acc.uv += uv
      acc.pv += pv
      return acc
    },
    { uv: 0, pv: 0 },
  )
  return { uv: uv / data.length, pv: pv / data.length }
}

export default makeAvg
