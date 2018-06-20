import * as d3 from 'd3';
import React from 'react';

export interface ITree {
  value: number;
  children: Array<ITree> | null;
  x: number;
  y: number;
  r: number;
  color: string;
  bgColor: string;
}

interface ITreeChartProps {
  tree: ITree;
}

interface ITreeChartState {

}
class TreeChart extends React.Component<ITreeChartProps, ITreeChartState> {

  constructor(props: ITreeChartProps) {
    super(props);
  }

  componentDidMount() {
    this.drawChart(this.props.tree);
  }

  componentDidUpdate(prevProps: ITreeChartProps, prevState: ITreeChartState) {
    this.drawChart(this.props.tree);
  }

  render() {
    return (
      <svg width="100%" height="100%"/>
    );
  }

  private drawChart(tree: ITree) {
    d3.select('svg').selectAll('*').remove();
    this.drawTrees([tree], {l: 0, r: 500}, 1);
  }
  private drawTrees(nodes: Array<ITree>, range: {l: number, r: number}, level: number, parent?: ITree) {
    const height = 50;
    const margin = (range.r - range.l) / nodes.length;
    const offset = margin / 2;
    const svg = d3.select('svg');
    let nodeNum = 0;
    nodes.forEach((node, i) => {
      node.x = range.l + offset + i * margin;
      node.y = level * height;
      if (node.children) {
        nodeNum += node.children.length;
      }
    });
    let lastL = range.l;
    nodes.forEach((node, i) => {
      if (node.children) {
        const step = ((range.r - range.l) / nodeNum) * node.children.length;
        this.drawTrees(node.children, {l: lastL, r: lastL + step}, level + 1, node);
        lastL = lastL + step;
      }
    });

    const g = svg.append('g');

    if (parent) {
      const edgeG = g.append('g');
      const edges = edgeG
      .selectAll('line')
      .data(nodes)
      .enter()
      .append('line');
      edges
        .attr('x1', parent.x)
        .attr('y1', parent.y)
        .attr('x2', function (d: ITree, i: number) {
          return range.l + offset + i * margin;
        })
        .attr('y2', function (d: ITree, i: number) {
          return level * height;
        })
        .style('stroke', function (d: ITree, i: number) {
          return d.bgColor;
        })
        .style('stroke-width', '1')
        .style('z-index', '-1');
    }

    const circleG = g.append('g');
    const circles = circleG
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle');
    circles
      .attr('cx', function (d: ITree, i: number) {
        return d.x;
      })
      .attr('cy', function (d: ITree, i: number) {
        return d.y;
      })
      .attr('r', function (d: ITree, i: number) {
        return d.r;
      })
      .attr('fill', function (d: ITree, i: number) {
        return d.bgColor;
      });

    const textG = g.append('g');
    const text = textG
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text');
    text.attr('x', function (d: ITree, i: number) {
        return d.x;
      })
      .attr('y', function (d: ITree, i: number) {
        return d.y;
      })
      .attr('fill', function (d: ITree, i: number) {
        return d.color;
      })
      .attr('dy', '0.1em')
      .text(function (d: ITree) {
        return d.value;
      })
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle');
  }
}

export default TreeChart;
