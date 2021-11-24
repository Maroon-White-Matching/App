import React from 'react';
import { Bar } from 'react-chartjs-2';

// openness to experience (inventive/curious vs. consistent/cautious)
// conscientiousness (efficient/organized vs. extravagant/careless)
// extraversion (outgoing/energetic vs. solitary/reserved)
// agreeableness (friendly/compassionate vs. critical/rational)
// neuroticism (sensitive/nervous vs. resilient/confident)[4]

const BarChart = (props) => {
  return(
        <Bar
          data = {{
            labels: ['Agreeableness', 'Conscientiousness', 'Extraversion', 'Neuroticism', 'Openness'],
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
