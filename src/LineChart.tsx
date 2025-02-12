import lineChartData, { NewChartData } from './fixtures/lineChartData.ts'
import {
  LineChart as DefaultLineChart,
  Line,
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

const LineChart = () => {
  const [data, setData] = useState<Array<NewChartData>>([])
  console.log(data)

  useEffect(() => {
    const avg = makeAvg(lineChartData)
    const deviation = makeStandartDeviation(lineChartData, avg)
    const newData = makeNewData({ avg, deviation, data: lineChartData })
    setData(newData)
  }, [lineChartData])

  return (
    <ResponsiveContainer className={'chart_container'}>
      <DefaultLineChart data={lineChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <defs>
          <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="red" />
            <stop offset="33%" stopColor="red" />
            <stop offset="33%" stopColor="#8884d8" />
            <stop offset={`${100}%`} stopColor="#8884d8" />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="pv"
          stroke="url(#colorUv)"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </DefaultLineChart>
    </ResponsiveContainer>
  )
}

export default LineChart
