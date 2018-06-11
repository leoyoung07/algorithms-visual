import * as d3 from 'd3';
import React from 'react';
import './index.css';

if (!Array.prototype.swap) {
  Array.prototype.swap = function*<T>(
    i: number,
    j: number
  ): IterableIterator<Array<T>> {
    drawBarChart(this, { [i]: 'blue' });
    yield this;
    drawBarChart(this, { [i]: 'blue', [j]: 'green' });
    yield this;
    const tmp = this[j];
    this[j] = this[i];
    this[i] = tmp;
    drawBarChart(this, { [i]: 'yellow', [j]: 'yellow' });
    yield this;
    drawBarChart(this);
    yield this;
  };
}

function drawBarChart(data: Array<number>, hightLight?: {}) {
  const height = 30;
  const svg = d3.select('svg');
  svg.selectAll('*').remove();
  const g = svg
    .append('g')
    .style('transform', 'translate(0, 50%) rotate(-90deg)');
  const rects = g
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect');
  rects
    .attr('x', 0)
    .attr('y', function(d: number, i: number) {
      return i * height;
    })
    .attr('width', function(d: number) {
      return d * 10;
    })
    .attr('height', height - 5)
    .attr('fill', function(d: number, i: number) {
      return hightLight && hightLight[i] ? hightLight[i] : 'red';
    });
}
function genRenderList(min: number, max: number, size: number) {
  if (typeof min !== 'number') {
    min = parseInt(min, 10);
  }
  if (typeof max !== 'number') {
    max = parseInt(max, 10);
  }
  if (typeof size !== 'number') {
    size = parseInt(size, 10);
  }
  const list = [];
  for (let i = 0; i < size; i++) {
    const rand = min + Math.floor((max - min) * Math.random());
    list.push(rand);
  }
  return list;
}

declare global {
  // tslint:disable-next-line:interface-name
  interface Array<T> {
    swap(i: number, j: number): IterableIterator<Array<T>>;
  }
}

function* bubbleSort(data: Array<number>) {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (data[j] < data[i]) {
        yield* data.swap(i, j);
      }
    }
  }
}

function* selectSort(data: Array<number>) {
  for (let i = 0; i < data.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < data.length; j++) {
      if (data[j] < data[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      yield* data.swap(i, minIndex);
    }
  }
}

function* insertSort(data: Array<number>) {
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j > 0 && data[j] < data[j - 1]; j--) {
      yield* data.swap(j, j - 1);
    }
  }
}

function* quickSort(data: Array<number>) {
  function* sort(l: number, u: number): IterableIterator<Array<number>> {
    if (l >= u) {
      return;
    }
    let m = l;
    for (let i = l + 1; i <= u; i++) {
      if (data[i] < data[l]) {
        m++;
        if (m !== i) {
          yield* data.swap(i, m);
        }
      }
    }
    if (m !== l) {
      yield* data.swap(l, m);
    }
    yield* sort(l, m - 1);
    yield* sort(m + 1, u);
  }
  yield* sort(0, data.length - 1);
}

const sortAlgMap = {
  bubble: bubbleSort,
  select: selectSort,
  insert: insertSort,
  quick: quickSort
};

interface ISortProps {}

interface ISortState {
  running: boolean;
  sortAlg: (data: number[]) => IterableIterator<number[]>;
  sortAlgName: string;

  runningTask: number | null;
}

class Sort extends React.Component<ISortProps, ISortState> {
  constructor(props: ISortProps) {
    super(props);
    this.handleAlgSelectChange = this.handleAlgSelectChange.bind(this);
    this.handleRunCodeBtnClick = this.handleRunCodeBtnClick.bind(this);
    this.handlePauseBtnClick = this.handlePauseBtnClick.bind(this);

    const algName = 'bubble';
    this.state = {
      running: false,
      sortAlgName: algName,
      sortAlg: sortAlgMap[algName],
      runningTask: null
    };
  }

  render() {
    return (
      <div>
        <select
          value={this.state.sortAlgName}
          onChange={this.handleAlgSelectChange}
        >
          {Object.keys(sortAlgMap).map(name => {
            return (
              <option key={name} value={name}>
                {name}
              </option>
            );
          })}
        </select>
        <button onClick={this.handleRunCodeBtnClick}>Run</button>
        <button onClick={this.handlePauseBtnClick}>Pause/Continue</button>
        <svg width="100%" height="100%" />
      </div>
    );
  }

  private handleAlgSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const algName = e.target.value;
    if (algName) {
      this.setState({
        sortAlgName: algName,
        sortAlg: sortAlgMap[algName]
      });
    }
  }

  private handleRunCodeBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (this.state.sortAlg) {
      const data = genRenderList(0, 50, 20);
      if (this.state.runningTask) {
        window.clearTimeout(this.state.runningTask);
        this.setState({
          runningTask: null
        });
      }
      this.runSortCode(this.state.sortAlg, data, 500);
    }
  }

  private runSortCode(
    sort: (data: Array<number>) => IterableIterator<Array<number>>,
    data: Array<number>,
    timeout: number
  ) {
    const iter = sort(data);
    const run = () => {
      if (this.state.running) {
        const currentData = iter.next();
        if (currentData.done) {
          alert('done!');
        } else {
          this.setState({
            runningTask: window.setTimeout(run, timeout)
          });
        }
      } else {
        this.setState({
          runningTask: window.setTimeout(run, timeout)
        });
      }
    };
    this.setState({
      running: true,
      runningTask: window.setTimeout(run, timeout)
    });
  }

  private handlePauseBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      running: !this.state.running
    });
  }
}

export default Sort;
