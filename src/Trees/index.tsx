import React from 'react';
import Button from '../Components/Button';
import Select from '../Components/Select';
import TreeChart, { ITree } from '../Components/TreeChart';
import data from './data.json';
interface ITreesProps {}

interface ITreesState {
  tree: ITree;
  searchAlg: (root: ITree, treeNode: ITree) => void;
  searchAlgName: string;
}

class Trees extends React.Component<ITreesProps, ITreesState> {

  private treeSearchAlgs: {
    DepthFirstSearch: (root: ITree, treeNode: ITree) => void,
    BreadthFirstSearch: (root: ITree, treeNode: ITree) => void
  };
  constructor(props: ITreesProps) {
    super(props);
    this.handleRunBtnClick = this.handleRunBtnClick.bind(this);
    this.handleAlgSelectChange = this.handleAlgSelectChange.bind(this);
    this.depthFirstSearch = this.depthFirstSearch.bind(this);
    this.breadthFirstSearch = this.breadthFirstSearch.bind(this);

    this.treeSearchAlgs = {
      DepthFirstSearch: this.depthFirstSearch,
      BreadthFirstSearch: this.breadthFirstSearch
    };

    const algName = 'DepthFirstSearch';
    this.state = {
      tree: this.getDataCopy(data as ITree),
      searchAlgName: algName,
      searchAlg: this.treeSearchAlgs[algName]
    };
  }
  render() {
    return (
      <div>
        <Select value={this.state.searchAlgName} handleChange={this.handleAlgSelectChange}>
          {Object.keys(this.treeSearchAlgs).map(text => {
            return (
              <option key={text} value={text}>
                {text}
              </option>
            );
          })}
        </Select>
        <Button handleClick={this.handleRunBtnClick}>Run</Button>
        <TreeChart tree={this.state.tree} />
      </div>
    );
  }

  private getDataCopy(d: ITree) {
    return JSON.parse(JSON.stringify(d)) as ITree;
  }
  private handleRunBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState(
      {
        tree: this.getDataCopy(data as ITree)
      },
      async () => {
        await this.state.searchAlg(this.state.tree, this.state.tree);
      }
    );
  }

  private handleAlgSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const algName = e.target.value;
    if (algName) {
      this.setState({
        searchAlgName: algName,
        searchAlg: this.treeSearchAlgs[algName]
      });
    }
  }

  private async depthFirstSearch(root: ITree, treeNode: ITree) {
    await this.visitTreeNode(root, treeNode);
    if (treeNode.children) {
      for (const child of treeNode.children) {
        await this.depthFirstSearch(root, child);
      }
    }
  }

  private async breadthFirstSearch(root: ITree, treeNode: ITree) {
    const queue: Array<ITree> = [];
    const search = async (r: ITree, t: ITree) => {
      await this.visitTreeNode(r, t);
      if (t.children) {
        for (const child of t.children) {
          queue.push(child);
        }
      }
      let node: ITree | undefined;
      while (node = queue.shift()) {
        await search(r, node);
      }
    };
    await search(root, treeNode);
  }

  private visitTreeNode(root: ITree, treeNode: ITree) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        treeNode.bgColor = 'red';
        this.setState(
          {
            tree: root
          },
          () => {
            resolve();
          }
        );
      }, 500);
    });
  }
}

export default Trees;
