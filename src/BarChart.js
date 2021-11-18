import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
  return(
        <Bar
          data = {{
            labels: ['Easy Going', 'Organized', 'Funny', 'Outdoorsy', 'Intellectual'],
            datasets: [{
              label: 'Top 5 Personality Types',
              data: [props.val1,props.val2,props.val3,props.val4,props.val5],
              backgroundColor: [
                'rgba(0, 99, 132, 1)',
                'rgba(54, 0, 100, 1)',
                'rgba(100, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
            borderWidth: 1
            },
            ],
          }}
        />
  );
}

export default BarChart;
