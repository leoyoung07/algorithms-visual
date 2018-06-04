function drawBarChart(data) {
  var height = 30;
  var svg = d3.select('svg');
  svg
    .selectAll('*')
    .remove();
  var g = svg.append('g');
  var rects = g
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect');
  rects
    .attr('x', 0)
    .attr('y', function (d, i) {
      return i * height;
    })
    .attr('width', function (d) {
      return d * 10;
    })
    .attr('height', height - 5)
    .attr('fill', 'red');
}
function genRenderList(min, max, size) {
  min = parseInt(min, 10);
  max = parseInt(max, 10);
  size = parseInt(size, 10);
  var list = [];
  for (var i = 0; i < size; i++) {
    var rand = min + Math.floor((max - min) * Math.random());
    list.push(rand);
  }
  return list;
}

Array.prototype.swap = async function (i, j) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var tmp = this[j];
      this[j] = this[i];
      this[i] = tmp;
      drawBarChart(this);
      resolve();
    }, 1000);
  });
}

async function bubbleSort(data) {
  for (var i = 0; i < data.length; i++) {
    for (var j = i + 1; j < data.length; j++) {
      if (data[j] < data[i]) {
        await data.swap(i, j);
      }
    }
  }
  return data;
}

async function selectSort(data) {
  for (var i = 0; i < data.length; i++) {
    var minIndex = i;
    for (var j = i + 1; j < data.length; j++) {
      if (data[j] < data[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      await data.swap(minIndex, i);
    }
  }
  return data;
}

async function insertSort(data) {
  for (var i = 0; i < data.length; i++) {
    for (var j = i; j > 0 && data[j] < data[j - 1]; j--) {
      await data.swap(j, j - 1);
    }
  }
  return data;
}

async function quickSort(data) {
  async function sort(l, u) {
    if (l >= u) {
      return;
    }
    var m = l;
    for (var i = l + 1; i <= u; i++) {
      if (data[i] < data[l]) {
        m++;
        await data.swap(m, i);
      }
    }
    await data.swap(l, m);
    await sort(l, m - 1);
    await sort(m + 1, u);
  }
  await sort(0, data.length - 1);
  return data;
}

async function runSortCode(sort, data) {
  window
    .performance
    .clearMarks();
  window
    .performance
    .clearMeasures();
  window
    .performance
    .mark('sort_begin');
  data = await sort(data);
  window
    .performance
    .mark('sort_end');
  window
    .performance
    .measure('sort', 'sort_begin', 'sort_end');
  console.table(window.performance.getEntriesByType('measure'));
  drawBarChart(data);
}