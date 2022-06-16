import { Box, Text } from '@chakra-ui/react';
import React, { PureComponent } from 'react';
import Header from '../components/Header';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  {
    date: '11 2021',
    ['Середня оцінка']: 4,
  },
  {
    date: '12 2021',
    ['Середня оцінка']: 5,
  },
  {
    date: '01 2022',
    ['Середня оцінка']: 3,
  },
];

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }
}

const Chart = () => {
  const list = JSON.parse(localStorage.getItem('result'));

  const listToMap = list.map((i) => ({
    date: i.date,
    ['Оцінка']: i.result,
  }));
  console.log(listToMap);
  return (
    <Header>
      <Box m="20px" p="20px" boxShadow="xl" w="max-content">
        <Text fontSize="20px" mb="20px">
          Показники успішності
        </Text>
        <AreaChart width={730} height={250} data={listToMap}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C4F1F9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0BC5EA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
          <YAxis dataKey="Оцінка" type="number" domain={[1, 5]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip itemStyle={{ color: 'black' }} />
          <Area type="monotone" dataKey="Оцінка" stroke="#0BC5EA" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </Box>
    </Header>
  );
};

export default Chart;
