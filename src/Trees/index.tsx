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
      tree: this.getDataCopy(data as ITree)
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

  private getDataCopy(d: ITree) {
    return JSON.parse(JSON.stringify(d)) as ITree;
  }
  private handleRunBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      tree: this.getDataCopy(data as ITree)
    }, async () => {
      await this.depthFirstSearch(this.state.tree, this.state.tree);
    });
  }

  private async depthFirstSearch(root: ITree, treeNode: ITree) {
    await this.visitTreeNode(root, treeNode);
    if (treeNode.children) {
      for (const child of treeNode.children) {
        await this.depthFirstSearch(root, child);
      }
    }
  }

  private visitTreeNode(root: ITree, treeNode: ITree) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        treeNode.bgColor = 'red';
        this.setState({
          tree: root
        }, () => { resolve(); });
      }, 1000);
    });
  }
}

export default Trees;
