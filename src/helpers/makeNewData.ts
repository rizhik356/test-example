import { LineChartData } from '../fixtures/lineChartData.ts'
import { AvgData } from './makeAvg.ts'
import { Deviation } from './makeStandartDeviation.ts'
import makeZScore from './makeZScore.ts'

type Props = {
  data: Array<LineChartData>
  avg: AvgData
  deviation: Deviation
}

const makeNewData = ({ data, avg, deviation }: Props) => {
  return data.map(({ uv, pv, ...rest }) => {
    const zScoreUv = makeZScore({ num: uv, avg, deviation, key: 'uv' })
    const zScorePv = makeZScore({ num: pv, avg, deviation, key: 'pv' })
    return { ...rest, uv, pv, zScorePv, zScoreUv }
  })
}

export default makeNewData
