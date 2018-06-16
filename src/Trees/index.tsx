import * as d3 from 'd3';
import React from 'react';
import Button from '../Components/Button';
import Select from '../Components/Select';
interface ITreesProps {}

interface ITreesState {}

const treeSearchAlgs = {
  DepthFirstSearch: 'DepthFirstSearch',
  BreadthFirstSearch: 'BreadthFirstSearch'
};

interface ITree {
  value: number;
  children: Array<ITree> | null;
}

const nodesData: ITree = {
  value: 0,
  children: [{
    value: 1,
    children: [{
      value: 3,
      children: null
    }, {
      value: 4,
      children: null
    }]
  }, {
    value: 2,
    children: [{
      value: 5,
      children: null
    }, {
      value: 6,
      children: null
    }, {
      value: 7,
      children: null
    }, {
      value: 8,
      children: null
    }]
  }]
};

function drawTrees(nodes: Array<ITree>, range: {l: number, r: number}, level: number) {
  const height = 50;
  const margin = (range.r - range.l) / (nodes.length + 1);
  const svg = d3.select('svg');
  const radius = 15;

  const g = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('g');
  const circles = g.append('circle');
  circles
    .attr('cx', function (d: ITree, i: number) {
      return range.l + (i + 1) * margin;
    })
    .attr('cy', function (d: ITree, i: number) {
      return level * height;
    })
    .attr('r', function (d: ITree, i: number) {
      return radius;
    })
    .attr('fill', 'red');
  const text = g.append('text');
  text.attr('dx', function (d: ITree, i: number) {
      return range.l + (i + 1) * margin - 5;
    })
    .attr('dy', function (d: ITree, i: number) {
      return level * height + 5;
    })
    .text(function (d: ITree) {
      return d.value;
    });
  let nodeNum = 0;
  nodes.forEach((node, i) => {
    if (node.children) {
      nodeNum += node.children.length;
    }
  });
  let lastL = range.l;
  nodes.forEach((node, i) => {
    if (node.children) {
      const step = ((range.r - range.l) / nodeNum) * node.children.length;
      drawTrees(node.children, {l: lastL, r: lastL + step}, level + 1);
      lastL = lastL + step;
    }
  });
}

function drawChart(data: ITree) {
  d3.select('svg').selectAll('*').remove();
  drawTrees([data], {l: 0, r: 500}, 1);
}
class Trees extends React.Component < ITreesProps,
ITreesState > {

  componentDidMount() {
    drawChart(nodesData);
  }

  render() {
    return (
      <div>
        <Select>
          {Object
            .keys(treeSearchAlgs)
            .map((text) => {
              return (
                <option key={text} value={text}>{text}</option>
              );
            })}
        </Select>
        <Button>
          Run
        </Button>
        <svg width="100%" height="100%"/>
      </div>
    );
  }
}

export default Trees;
