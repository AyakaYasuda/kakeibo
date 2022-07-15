import React from 'react';
import { VictoryPie } from 'victory';

const PieChart = ({ data }) => {
  return (
    <VictoryPie
      width={550}
      colorScale={[
        '#184e77',
        '#1e6091',
        '#1a759f',
        '#168aad',
        '#34a0a4',
        '#52b69a',
        '#76c893',
        '#99d98c',
        '#b5e48c',
        '#d9ed92',
        '#ffdd00',
        '#ffc300',
      ]}
      data={data}
      innerRadius={50}
      events={[
        {
          target: 'data',
          eventHandlers: {
            onClick: () => {
              return [
                {
                  target: 'data',
                  mutation: ({ style }) => {
                    return style.fill === '#f07167'
                      ? null
                      : { style: { fill: '#f07167' } };
                  },
                },
                {
                  target: 'labels',
                  mutation: ({ text, datum }) => {
                    return text === `$${datum.y.toFixed(2).toLocaleString()}`
                      ? null
                      : { text: `$${datum.y.toFixed(2).toLocaleString()}` };
                  },
                },
              ];
            },
          },
        },
      ]}
    />
  );
};

export default PieChart;
