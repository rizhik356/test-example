import lineChartData, { NewChartData } from './fixtures/lineChartData.ts'
import {
  LineChart as DefaultLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import makeStandartDeviation from './helpers/makeStandartDeviation.ts'
import makeAvg from './helpers/makeAvg.ts'
import { useEffect, useState } from 'react'
import makeNewData from './helpers/makeNewData.ts'
import Stops from './Stops.tsx'
import lineData from './sources/linaData.ts'
import makeLines from './Lines.tsx'

const LineChart = () => {
  const [data, setData] = useState<Array<NewChartData>>([])

  useEffect(() => {
    const avg = makeAvg(lineChartData)
    const deviation = makeStandartDeviation(lineChartData, avg)
    const newData = makeNewData({ avg, deviation, data: lineChartData })
    setData(newData)
  }, [lineChartData])

  return (
    <ResponsiveContainer className={'chart_container'}>
      <DefaultLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          payload={[
            { color: lineData.pv.color, value: lineData.pv.value },
            { color: lineData.uv.color, value: lineData.uv.value },
          ]}
        />
        <defs>
          <linearGradient
            id={lineData.uv.gradientId}
            x1="0%"
            y1="0"
            x2="100%"
            y2="0"
          >
            <Stops
              key={lineData.uv.dataKey}
              data={data}
              lineKey={lineData.uv.dataKey}
              color={lineData.uv.color}
            />
          </linearGradient>
          <linearGradient
            id={lineData.pv.gradientId}
            x1="0%"
            y1="0"
            x2="100%"
            y2="0"
          >
            <Stops
              key={lineData.pv.dataKey}
              data={data}
              lineKey={lineData.pv.dataKey}
              color={lineData.pv.color}
            />
          </linearGradient>
        </defs>
        {makeLines(data)}
      </DefaultLineChart>
    </ResponsiveContainer>
  )
}

export default LineChart
