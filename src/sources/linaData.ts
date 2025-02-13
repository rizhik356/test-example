import { Props } from '../CustomDot.tsx'

type Line = {
  color: string
  dataKey: keyof Props['payload']
  value: string
  size: number
  gradientId: string
}

export type LineData = {
  uv: Line
  pv: Line
}

const lineData: LineData = {
  pv: {
    color: '#82ca9d',
    dataKey: 'zScorePv',
    value: 'pv',
    size: 18,
    gradientId: 'colorPv',
  },
  uv: {
    color: '#8884d8',
    dataKey: 'zScoreUv',
    value: 'uv',
    size: 18,
    gradientId: 'colorUv',
  },
}

export default lineData
