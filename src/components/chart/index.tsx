import React, { useEffect, useState } from 'react';
import c3, {
  Data, ChartAPI, AxesOptions, LegendOptions
} from 'c3';
import './index.css';

export interface IChartProps {
  id: string;
  data: Data;
  axis?: AxesOptions;
  legend?: LegendOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const Chart = ({
  id, data, axis, legend, ...otherProps
}: IChartProps) => {
  const [chart, setChart] = useState<ChartAPI | null>(null);
  useEffect(() => {
    setChart(
      c3.generate({
        bindto: `#${id}`,
        data,
        axis,
        legend,
        ...otherProps
      })
    );
    return () => {
      chart?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (chart !== null) {
      let isEqual = true;
      chart.data().forEach((entry, index) => {
        if (data.columns !== undefined) {
          if (entry.id !== data.columns[index][0]) {
            isEqual = false;
          }
        }
      });

      if (isEqual) {
        chart.load({ columns: data.columns });
      } else {
        setChart(
          c3.generate({
            bindto: `#${id}`,
            data,
            axis,
            legend,
            ...otherProps
          })
        );
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return <div id={id}></div>;
};

export default Chart;
