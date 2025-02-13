import { NewChartData } from './fixtures/lineChartData.ts'

export type FuncProps = {
  cx: number
  cy: number
  payload: { zScorePv: number; zScoreUv: number }
  index: number
}

export type Props = FuncProps & {
  size?: number
  color: string
  data: Array<NewChartData>
  dataKey: keyof Props['payload']
}

const CustomDot = ({
  cx,
  cy,
  size = 10,
  payload,
  color,
  index,
  data,
  dataKey,
}: Props) => {
  const makeColor = () => {
    const currentValue = payload[dataKey] as number
    const isFirstOrLast = index === 0 || index === data.length - 1
    const prevVal = index > 0 ? data[index - 1][dataKey] : null
    const nextVal = index !== data.length - 1 ? data[index + 1][dataKey] : null

    if (isFirstOrLast) {
      return currentValue > 1 ? (
        <stop offset="100%" style={{ stopColor: 'red', stopOpacity: 1 }} />
      ) : (
        <stop offset="100%" style={{ stopColor: color, stopOpacity: 1 }} />
      )
    }

    const isBigger = currentValue > 1
    const prevBigger = prevVal !== null && prevVal > 1
    const nextBigger = nextVal !== null && nextVal > 1

    if (isBigger && !prevBigger) {
      return (
        <>
          <stop offset="100%" style={{ stopColor: 'red', stopOpacity: 1 }} />
        </>
      )
    }

    if (!isBigger && prevBigger) {
      return (
        <>
          <stop offset="50%" style={{ stopColor: 'red', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: color, stopOpacity: 1 }} />
        </>
      )
    }

    if (!isBigger && nextBigger) {
      return (
        <>
          <stop offset="50%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: 'red', stopOpacity: 1 }} />
        </>
      )
    }
    return (
      <stop
        offset="100%"
        style={{
          stopColor: isBigger ? 'red' : color,
          stopOpacity: 1,
        }}
      />
    )
  }
  return (
    <svg x={cx - size / 2} y={cy - size / 2} width={size} height={size}>
      <defs>
        <linearGradient
          id={`round_${index}_${dataKey}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          {makeColor()}
        </linearGradient>
      </defs>

      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={`url(#round_${index}_${dataKey})`}
      />
    </svg>
  )
}

export default CustomDot
