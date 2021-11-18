import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {
  return(
        <Pie
          data = {{
            labels: ['Coach', 'Student'],
            datasets: [{
              label: 'Total Students & Classifications',
              data: [props.val1,props.val2],
              backgroundColor: [
                'rgba(0, 99, 132, 1)',
                'rgba(54, 0, 100, 1)',
              ],
              hoverOffset: 4
            },
            ],
          }}
          options={{ maintainAspectRatio: false}}
        />
  );
}

export default PieChart;
