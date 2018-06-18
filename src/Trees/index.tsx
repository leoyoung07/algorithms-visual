import React from 'react';
import Button from '../Components/Button';
import Select from '../Components/Select';
import TreeChart, { ITree } from '../Components/TreeChart';
import data from './data.json';
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
    this.handleRunBtnClick = this.handleRunBtnClick.bind(this);
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
        <Button handleClick={this.handleRunBtnClick}>
          Run
        </Button>
        <TreeChart tree={this.state.tree}/>
      </div>
    );
  }
  private handleRunBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.depthFirstSearch(this.state.tree, this.state.tree);
  }

  private depthFirstSearch(root: ITree, tree: ITree) {
    const newRoot = JSON.parse(JSON.stringify(root));
    this.visitTreeNode(tree);
    if (tree.children) {
      tree.children.forEach((child: ITree) => {
        this.depthFirstSearch(root, child);
      });
    }
  }

  private visitTreeNode(treeNode: ITree) {
    treeNode.color = 'red';
  }
}

export default Trees;
