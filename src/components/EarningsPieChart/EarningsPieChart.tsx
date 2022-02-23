import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export const EarningsPieChart = ({data}: {data: {title: string, value: number}[]}) => {
  const colors = ['#ccebff', '#99d8ff', '#66c4ff', '#33b1ff', '#009dff', '#007ecc', '#005e99', '#003f66', '#001f33']
  const cleanedData = data.reduce((acc: {title: string, value: number}[], point) => {
    if (point.value === 0 || !point.value) return acc
    return [ ...acc, point]
  }, [])
  const remainder = 100 - cleanedData.reduce((total, point) => total += point.value, 0)

  const dataWithColor = [...cleanedData, {title: 'take home', value: remainder}].reduce((acc: {title: string, value: number, color: string}[], point, index) => {
    return [
      ...acc,
      {
        ...point,
        color: colors[index],
      }
    ]
  }, [])
  return (
    <div className="PieChart">
      <PieChart
        label={({dataEntry}) => dataEntry.title}
        labelStyle={{
          fontSize: '6px',
        }}
        labelPosition={70}
        data={dataWithColor}
      />
    </div>
  )
}