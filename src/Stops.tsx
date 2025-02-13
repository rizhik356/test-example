import { NewChartData } from './fixtures/lineChartData.ts'

type Props = {
  data: Array<NewChartData>
  lineKey: keyof NewChartData
  color: string
}

const Stops = ({ data, lineKey, color }: Props) => {
  return (
    <>
      {data.map((item, index) => {
        const percentByIndex = `${((index / (data.length - 1)) * 100).toFixed(2)}%`
        const currentValue = item[lineKey] as number
        const nextValue = data[index + 1]?.[lineKey] as number
        const prevValue = data[index - 1]?.[lineKey] as number

        const renderStop = (keyOffset: number, stopColor: string) => (
          <stop
            key={index + keyOffset}
            offset={percentByIndex}
            stopColor={stopColor}
          />
        )

        if (nextValue > 1) {
          return (
            <>
              {renderStop(1, color)}
              {renderStop(2, 'red')}
            </>
          )
        }

        if (currentValue > 1) {
          return prevValue < 1 ? null : (
            <>
              {renderStop(3, color)}
              {renderStop(4, 'red')}
            </>
          )
        }

        if (currentValue < 1 && prevValue > 1) {
          return (
            <>
              {renderStop(5, 'red')}
              {renderStop(6, color)}
            </>
          )
        }

        return renderStop(7, color)
      })}
    </>
  )
}

export default Stops
