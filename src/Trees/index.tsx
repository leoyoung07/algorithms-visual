import React from 'react';
import Button from '../Components/Button';
import Select from '../Components/Select';
import data from './data.json';
import TreeChart, { ITree } from './TreeChart';
interface ITreesProps {}

interface ITreesState {
  tree: ITree;
}

const treeSearchAlgs = {
  DepthFirstSearch: 'DepthFirstSearch',
  BreadthFirstSearch: 'BreadthFirstSearch'
};
class Trees extends React.Component < ITreesProps,
ITreesState > {

  constructor(props: ITreesProps) {
    super(props);
    this.state = {
      tree: data as ITree
    };
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
        <TreeChart tree={this.state.tree}/>
      </div>
    );
  }
}

export default Trees;
