import lineData from './sources/linaData.ts'
import { Line } from 'recharts'
import CustomDot, { FuncProps } from './CustomDot.tsx'
import { NewChartData } from './fixtures/lineChartData.ts'

const makeLines = (data: Array<NewChartData>) => {
  return Object.values(lineData).map(
    ({ color, dataKey, value, size, gradientId }) => {
      return (
        <Line
          key={value}
          type={'monotone'}
          dataKey={value}
          stroke={`url(#${gradientId})`}
          dot={(props) => {
            const { key, ...rest } = props
            return (
              <CustomDot
                key={key}
                {...rest}
                color={color}
                data={data}
                dataKey={dataKey}
              />
            )
          }}
          activeDot={(props: unknown) => (
            <CustomDot
              {...(props as FuncProps)}
              color={color}
              data={data}
              dataKey={dataKey}
              size={size}
            />
          )}
        />
      )
    },
  )
}

export default makeLines
