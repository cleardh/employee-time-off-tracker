import React, { Fragment, useEffect } from 'react';
import DonutChart from 'react-google-charts';

const Chart = ({ category, requestDays, org, centerLabel }) => {
  const chartEvents = [
    {
      eventName: 'ready',
      callback: ({ chartWrapper, google }) => {
        const chart = chartWrapper.getChart();
        const chartContainer = chart.container;
        const id = `${chartContainer.id}-label`;
        if (chartContainer.children[id] === undefined) {
          const label = document.createElement('div');
          label.id = id;
          label.classList.add('center-label');
          label.style.top = `${chartContainer.getBoundingClientRect().top}px`;
          label.style.left = `${chartContainer.getBoundingClientRect().left}px`;
          label.innerHTML = centerLabel;
          chartContainer.appendChild(label);
          window.addEventListener('scroll', () => {
            label.style.top = `${chartContainer.getBoundingClientRect().top}px`;
            label.style.left = `${chartContainer.getBoundingClientRect().left}px`;
          });
        }
      }
    }
  ]
  const data = category.isUnlimited
    ? [
        ['Label', 'Days'],
        ['Remaining', 365],
      ]
    : org
    ? [
        ['Label', 'Days'],
        ['Used', requestDays],
        ['Remaining', category.limit * org.members.length - requestDays],
      ]
    : [
        ['Label', 'Days'],
        ['Used', requestDays],
        ['Remaining', category.limit - requestDays],
      ];
  const options = {
    title: category.title,
    pieHole: 0.6,
    is3D: false,
    legend: { position: 'none' },
    colors: category.isUnlimited
      ? [category.color]
      : ['#8e8c84', category.color],
  };
  return (
    <Fragment>
      <DonutChart
        chartType='PieChart'
        width='600px'
        height='600px'
        data={data}
        options={options}
        chartEvents={chartEvents}
      />
    </Fragment>
  );
};

export default Chart;
