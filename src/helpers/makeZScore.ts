import { AvgData } from './makeAvg.ts'
import { Deviation } from './makeStandartDeviation.ts'

type Props = {
  num: number
  avg: AvgData
  deviation: Deviation
  key: 'pv' | 'uv'
}

const makeZScore = ({ num, avg, deviation, key }: Props) => {
  const currentAvg = avg[key as keyof AvgData]
  const currentDeviation = deviation[key as keyof Deviation]
  return (num - currentAvg) / currentDeviation
}

export default makeZScore
