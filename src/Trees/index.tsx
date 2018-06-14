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
    }]
  }]
};

function drawTrees(nodes: Array<ITree>, range: {l: number, r: number}, level: number) {
  const height = 50;
  const margin = (range.r - range.l) / 2;
  const svg = d3.select('svg');
  const radius = 10;
  // svg
  //   .selectAll('*')
  //   .remove();
  const g = svg.append('g');
  const circles = g
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle');
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
  nodes.forEach((node, i) => {
    if (node.children) {
      drawTrees(node.children, {l: range.l + i * margin, r: range.l + (i + 1) * margin}, level + 1);
    }
  });
}
class Trees extends React.Component < ITreesProps,
ITreesState > {

  componentDidMount() {
    drawTrees([nodesData], {l: 0, r: 500}, 1);
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
