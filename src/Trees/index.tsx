import React from 'react';
import Button from '../Components/Button';
import Select from '../Components/Select';
import TreeChart, { ITree } from '../Components/TreeChart';
import { Queue } from '../DataStructures';
import data from './data.json';

type TreeSearch = (root: ITree, treeNode: ITree) => void;
interface ITreesProps {}

interface ITreesState {
  tree: ITree;
  searchAlg: TreeSearch;
  searchAlgName: string;
}

class Trees extends React.Component<ITreesProps, ITreesState> {
  private treeSearchAlgs: {
    DepthFirstSearch: TreeSearch;
    BreadthFirstSearch: TreeSearch;
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
        <Select
          value={this.state.searchAlgName}
          handleChange={this.handleAlgSelectChange}
        >
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
        // tslint:disable-next-line:no-console
        console.log('Done!');
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
    const queue = new Queue<ITree>(
      (e, q) => {
        if (e) {
          // tslint:disable-next-line:no-console
          console.log('Enqueue: ' + e.value);
        }
      },
      (e, q) => {
        if (e) {
          // tslint:disable-next-line:no-console
          console.log('Dequeue: ' + e.value);
        }
      }
    );
    const search = async (r: ITree, t: ITree) => {
      await this.visitTreeNode(r, t);
      if (t.children) {
        for (const child of t.children) {
          queue.Enqueue(child);
        }
      }
      let node: ITree | undefined;
      while ((node = queue.Dequeue())) {
        await search(r, node);
      }
    };
    await search(root, treeNode);
  }

  private visitTreeNode(root: ITree, treeNode: ITree) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        treeNode.bgColor = 'red';
        // tslint:disable-next-line:no-console
        console.log('Visit: ' + treeNode.value);
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
