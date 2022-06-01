import createG2 from 'g2-react';
import {Stat} from 'g2';
import React, { Component } from 'react';


const Pie = createG2((chart) => {
  chart.coord('theta', {
    radius: 0.8,
  });
  chart.legend('name', {position: 'bottom'});
  chart.tooltip({
    title: null,
    map: {
      value: 'value',
    },
  });
  chart
        .intervalStack()
        .position(Stat.summary.percent('value'))
        .color('name')
  chart.render();
});

export default class PieChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      width: this.props.width,
      height: this.props.height,
      plotCfg: {
        margin: [50, 100, 80, 60],
      },
    };
  }

  render() {
    return (
      <div>
        <Pie
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
          forceFit={this.state.forceFit}
          plotCfg={this.state.plotCfg}
        />

      </div>
    );
  }
}
