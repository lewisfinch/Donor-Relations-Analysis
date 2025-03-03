import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Mini-Project 3 (Networks)`
)}

function _2(md){return(
md`## Data

Here we load a [simplified and reduced version](https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/) of the [AidData dataset](https://www.aiddata.org/data/aiddata-core-research-release-level-1-3-1). You are free to change this code as you wish. If you don't want to preprocess your data on Observable, then you can do the preprocessing using whatever languages or tools you'd like and then [upload](/@observablehq/file-attachments) your preprocessed data to Observable. If you take this approach, then you should delete the \`aiddata\` cell below so that you're not loading unnecessary data.

The dataset contains the following columns:
- **yearDate**: year of the commitment as a Date object
- **yearInt**: year of the commitment as an integer
- **donor**: country providing the financial resource
- **recipient**: country receiving the financial resource
- **amount**: the total amount of financial resources provided
- **purpose**: the purpose of the transaction`
)}

function _3(Inputs,aiddata){return(
Inputs.table(aiddata)
)}

async function _aiddata(d3,googleSheetCsvUrl)
{
  const data = await d3.csv(googleSheetCsvUrl, row => ({
    yearDate: d3.timeParse('%Y')(row.year),
    yearInt: +row.year,
    donor: row.donor,
    recipient: row.recipient,
    amount: +row.commitment_amount_usd_constant,
    purpose: row.coalesced_purpose_name,
  }));
  
  data.columns = Object.keys(data[0]);
  
  return data;
}


function _5(md){return(
md`Next we load GeoJSON data for countries. This file is derived from data from [Natural Earth](https://www.naturalearthdata.com).`
)}

function _geoJSON(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)}

function _7(md){return(
md`## Questions

Your goal is to create 3 independent visualizations of the same data set, each one with the intent of answering the questions stated below. For each numbered visualization, you should be able to create a data visualization that answers **all of the questions** specified. These are the 3 visualizations you should create:

- **Visualization 1:** Create an overview of the relationships between countries so that it is possible to see who donates to whom and how much. The main questions one should be able to answer are (note that we only care about the top 10 recipients and the top 20 donors [over the whole time] for these questions): 

  Q1) Who are the major donors? To which countries do they donate the most, and how much? **(20 points)**

  Q2) Conversely, who are the major receivers? Which countries do they receive from the most, and how much? **(20 points)**

  Aesthetics and Clarity **(10 points)**

- **Visualization 2:** The same as the previous question, we only care about the top 10 recipients and the top 20 donors here. The main questions one should be able to answer using your visualization are: 

  Q1) Considering only the top 5 purposes of donation, how does the relationship between countries look like in terms of purposes? Are there countries that donate to a given country for multiple purposes? Or do counties always give for one single purpose when donating to another country? **(20 points)**

  Q2) What composition (distribution) of purposes do the donations between each pair of countries have? **(20 points)**
  
  Note: if the purpose is “UNSPECIFIED” it should be removed.

  Aesthetics and Clarity **(10 points)**

- **[OPTIONAL/EXTRA POINTS] Visualization 3:**  **(20 points)**

  Q1) For this last exercise you have to extend the analysis above to see how the patterns of donations change over time. Focusing again on the top 10 recipients and top 20 donors, how do the patterns of donations (who donates to whom and how much) change over time? Are there sudden changes?

  Q2) Are there countries that always donate to other countries? Are there major shifts (say a country used to donate to a specific set of countries and then it changes to other countries)?


**Notes**

For this exercise you may want to review the lecture on network visualizations in which we explain how you can visualize network data. 

For each visualization add a description of your thought process and why you think your solution is *appropriate* and *effective*.

Note it is okay to submit more than one solution for a given visualization problem if you think there are some competing solutions that work well. When you do that, make sure to compare the solutions by commenting on their advantages and disadvantages.
`
)}

function _8(md){return(
md`### Remember

The questions above are a very useful tool for you to verify whether you are producing a good solution or not. As you go about solving this exercise you can use the questions above as an evaluation tool in two main ways:
1. Verify that you can indeed answer the questions with your visualization. If you can’t fully answer the questions, it means your solution has some problems.
2. Compare multiple solutions to the same problem and ask yourself: “which one makes it easier for me to answer these questions?”, where easier may mean, more accurately, with less effort or faster.
`
)}

function _9(md){return(
md`## Instructions
- Your coded solutions must use D3. Other visualization libraries are not allowed.
- You should feel free to process and transform the data any way you deem relevant and use any tool you prefer for data processing. Data transformation does not necessarily have to be in JavaScript nor within Observable. It’s ok to pre-process the data and then load it in Observable if you prefer.
- You can use Mike Bostock's [Color Legend](/@d3/color-legend) notebook to create your legends.`
)}

function _11(md){return(
md`## Grading Criteria

The main parameters we will use for grading are the following:

- Does the information extracted answer the questions posed in the exercise?
- Does the visualization answer the questions posed in the exercise?
- Is the visual representation clear? Does it have good aesthetics?
  - Review this [notebook on clarity](/@nyuvis/contextual-elements-aesthetics-and-clarity) for reference.`
)}

function _12(md){return(
md`## Solutions`
)}

function _13(md){return(
md`### Visualization 1:
When I considered using networks to solve the problem, I initially thought of using parallel axes because they can intuitively represent the "relationships" between countries. However, the complex relationships led to a cluttered visual with overlapping lines, and the varying line thicknesses made it difficult to observe differences in donation amounts. As a result, I choose to use an adjacency matrix, which clearly illustrates the relationships between each pair of the top 20 donors and top 10 recipients. Furthermore, the area of the rectangles is more effective than line thickness in highlighting these differences for observing the donation differences and patterns.`
)}

function _14(legend,color){return(
legend({ color, title: "Donation(thousand $)", tickFormat: ".0f"})
)}

function _15(d3,width,height,yAxis,xAxis,margin,x,y,top10Recipients,top20Donors,data,color)
{
  const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height);

  svg.append("g").call(yAxis);
  svg.append("g").call(xAxis);

  svg.append('text')
    .attr('y', margin.top / 4)
    .text(`Donor vs Recipient`);
    
  const background = svg.append('g');

  background.append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('fill', '#eeeeee');
  
  const xPaddingSize = x.step() * x.paddingInner();
  const yPaddingSize = y.step() * y.paddingInner();

  background.append('g')
    .selectAll('line')
    .data(top10Recipients.slice(1))
    .join('line')
      .attr('x1', d => x(d) - xPaddingSize / 2)
      .attr('x2', d => x(d) - xPaddingSize / 2)
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('stroke-width', xPaddingSize)
      .attr('stroke', 'white');
  
  background.append('g')
    .selectAll('line')
    .data(top20Donors.slice(1))
    .join('line')
      .attr('y1', d => y(d) - yPaddingSize / 2)
      .attr('y2', d => y(d) - yPaddingSize / 2)
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('stroke-width', yPaddingSize)
      .attr('stroke', 'white');

  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
      .attr('x', d => x(d.recipient))
      .attr('y', d => y(d.donor))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => color(d.amount));
  
  return svg.node();
}


function _16(md){return(
md`### Visualization 2:
This visualization uses the same sub-dataset as the previous one, but instead of focusing on a single donation amount for each pair of countries, we're now exploring the proportional relationships between multiple purposes. Using parallel axes would make the visualization even more cluttered than before, so I’ve decided to stick with the design shown above and use its wide rectangular areas to represent the proportion of each purpose.`
)}

function _17(Swatches,d3,top5PurposeList){return(
Swatches(d3.scaleOrdinal(top5PurposeList, d3.schemeCategory10))
)}

function _18(d3,width,height,yAxis,xAxis,margin,x,y,top10Recipients,top20Donors,enhancedData,totalData,purposeColors)
{
  const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height);

  svg.append("g").call(yAxis);
  svg.append("g").call(xAxis);

  svg.append('text')
    .attr('y', margin.top / 4)
    .text(`Donation Distribution by Purpose`);
    
  const background = svg.append('g');

  background.append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('fill', '#eeeeee');
  
  const xPaddingSize = x.step() * x.paddingInner();
  const yPaddingSize = y.step() * y.paddingInner();

  background.append('g')
    .selectAll('line')
    .data(top10Recipients.slice(1))
    .join('line')
      .attr('x1', d => x(d) - xPaddingSize / 2)
      .attr('x2', d => x(d) - xPaddingSize / 2)
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('stroke-width', xPaddingSize)
      .attr('stroke', 'white');
  
  background.append('g')
    .selectAll('line')
    .data(top20Donors.slice(1))
    .join('line')
      .attr('y1', d => y(d) - yPaddingSize / 2)
      .attr('y2', d => y(d) - yPaddingSize / 2)
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('stroke-width', yPaddingSize)
      .attr('stroke', 'white');

svg.append('g')
  .selectAll('rect')
  .data(enhancedData)
  .join('rect')
    .attr('x', d => {
      const totalAmount = totalData.get(d.donor).get(d.recipient);
      const offsetX = d3.range(d.purposeIndex)
      .reduce((acc, index) => {
        const prevPurpose = enhancedData.find(p => 
          p.donor === d.donor && 
          p.recipient === d.recipient && 
          p.purposeIndex === index
        );
        return acc + (prevPurpose.amount / totalAmount) * x.bandwidth();
      }, 0); 
      return x(d.recipient) + offsetX;
    })
    .attr('y', d => y(d.donor))
    .attr('width', d => x.bandwidth() * (d.amount / totalData.get(d.donor).get(d.recipient)))
    .attr('height', y.bandwidth())
    .attr('fill', d => purposeColors(d.purpose));
  
  return svg.node();
}


function _19(md){return(
md`### Visualization 3:
For this visualization, I decided to merge the previous two charts, keeping the donation amount heatmap from the first chart while modifying the second chart to divide the area by era instead of purpose. I believe dividing all the years into five eras is the best choice, as the missing data for some years would otherwise make the chart very cluttered.`
)}

function _20(legend,color){return(
legend({ color, title: "Donation(thousand $)", tickFormat: ".0f"})
)}

function _21(d3,width,height,yAxis,xAxis,margin,x,y,top10Recipients,top20Donors,mergedData3,color)
{
  const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height);

  svg.append("g").call(yAxis);
  svg.append("g").call(xAxis);

  svg.append('text')
    .attr('y', margin.top / 4)
    .text(`Donor vs Recipient By eras (70s - 10s)`);
    
  const background = svg.append('g');

  background.append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('fill', '#eeeeee');
  
  const xPaddingSize = x.step() * x.paddingInner();
  const yPaddingSize = y.step() * y.paddingInner();

  background.append('g')
    .selectAll('line')
    .data(top10Recipients.slice(1))
    .join('line')
      .attr('x1', d => x(d) - xPaddingSize / 2)
      .attr('x2', d => x(d) - xPaddingSize / 2)
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('stroke-width', xPaddingSize)
      .attr('stroke', 'white');
  
  background.append('g')
    .selectAll('line')
    .data(top20Donors.slice(1))
    .join('line')
      .attr('y1', d => y(d) - yPaddingSize / 2)
      .attr('y2', d => y(d) - yPaddingSize / 2)
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('stroke-width', yPaddingSize)
      .attr('stroke', 'white');

  svg.append('g')
  .selectAll('rect')
  .data(mergedData3)
  .join('rect')
    .attr('x', d => {
      const offsetX = x.bandwidth() / 5 * (d.yearIndex - 1)
      return x(d.recipient) + offsetX;
    })
    .attr('y', d => y(d.donor))
    .attr('width', d => x.bandwidth() / 5)
    .attr('height', y.bandwidth())
    .attr('fill', d => color(d.amount));

  const lastRow = mergedData3.filter(d => d.donor == 'United States' && d.yearIndex == 3);

  svg.append('g')
    .selectAll('text')
    .data(lastRow)
    .join('text')
      .attr('x', d => {
        const offsetX = x.bandwidth() / 5 * (d.yearIndex - 1);
        return x(d.recipient) + offsetX + x.bandwidth() / 10; 
      })
      .attr('y', height - margin.bottom + 5) 
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle') 
      .text(d => {
        const yearOrder = ['70', '80', '90', '00', '10'];
        return yearOrder.join(' '); 
      })
      .attr('fill', 'black')
      .style('font-size', '10px'); 

  return svg.node();
}


function _22(md){return(
md`### Workspace`
)}

function _recipientAmounts(d3,aiddata){return(
d3.rollup(
    aiddata,
    v => d3.sum(v, d => d.amount),
    d => d.recipient
)
)}

function _donorAmounts(d3,aiddata){return(
d3.rollup(
    aiddata,
    v => d3.sum(v, d => d.amount),
    d => d.donor
)
)}

function _top10Recipients(recipientAmounts){return(
Array.from(recipientAmounts, ([recipient, amount]) => ({ recipient, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10)
    .map(d => d.recipient)
)}

function _top20Donors(donorAmounts){return(
Array.from(donorAmounts, ([donor, amount]) => ({ donor, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 20)
    .map(d => d.donor)
)}

function _RelevantData(aiddata,top20Donors,top10Recipients){return(
aiddata.filter(d => 
    top20Donors.includes(d.donor) && top10Recipients.includes(d.recipient)
).map(d => ({
    donor: d.donor,
    recipient: d.recipient,
    amount: d.amount / 1000
}))
)}

function _mergedData(RelevantData){return(
RelevantData.reduce((acc, curr) => {
  const key = `${curr.donor}-${curr.recipient}`;
  if (!acc[key]) {
    acc[key] = { donor: curr.donor, recipient: curr.recipient, amount: 0 };
  }
  acc[key].amount += Math.round(curr.amount);
  return acc;
}, {})
)}

function _data(mergedData){return(
Object.values(mergedData)
)}

function _maxAmount(d3,data){return(
d3.max(data, d => d.amount)
)}

function _margin(){return(
{top: 50, right: 100, bottom: 50, left: 100}
)}

function _height(margin){return(
500 + margin.top + margin.bottom
)}

function _x(d3,top10Recipients,margin,width){return(
d3.scaleBand()
      .domain(top10Recipients)
      .range([margin.left, width - margin.right])
      .paddingInner(0.1)
)}

function _y(d3,top20Donors,margin,height){return(
d3.scaleBand()
      .domain(top20Donors)
      .range([margin.top, height - margin.bottom])
      .paddingInner(0.1)
)}

function _color(d3,data){return(
d3.scaleQuantile()
    .domain(data.map(d => d.amount)) 
    .range(d3.schemeOranges[7])
    .unknown("#eeeeee")
)}

function _xAxis(margin,d3,x,width){return(
g => g
    .attr('transform', `translate(0,${margin.top})`)
    .call(d3.axisTop(x).tickSize(0))
    .call(g => g.selectAll(".domain").remove())
  .append("text")
      .attr("x", margin.left + (width - margin.left - margin.right) / 2)
      .attr("y", -margin.top)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .text("Recipient")
)}

function _yAxis(margin,d3,y,height){return(
g => g
    .attr('transform', `translate(${margin.left})`)
    .call(d3.axisLeft(y).tickSize(0))
    .call(g => g.selectAll(".domain").remove())
  .append("text")
    .attr("x", -margin.left)
    .attr("y", margin.top + (height - margin.top - margin.bottom) / 2)
    .attr("fill", "black")
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "start")
    .text("Donor")
)}

function _RelevantData2(aiddata,top20Donors,top10Recipients){return(
aiddata.filter(d => 
    top20Donors.includes(d.donor) && top10Recipients.includes(d.recipient)
).map(d => ({
    donor: d.donor,
    recipient: d.recipient,
    purpose: d.purpose,
    amount: d.amount
}))
)}

function _filteredData(RelevantData2){return(
RelevantData2.filter(d => d.purpose !== "Sectors not specified")
)}

function _purposeCount(filteredData){return(
filteredData.reduce((acc, curr) => {
  const purpose = curr.purpose;
  if (!acc[purpose]) {
    acc[purpose] = 0;
  }
  acc[purpose] += 1;
  return acc;
}, {})
)}

function _top5Purposes(purposeCount){return(
Object.entries(purposeCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
)}

function _top5PurposeList(top5Purposes){return(
top5Purposes.map(p => p[0])
)}

function _data2(RelevantData2,top5PurposeList){return(
RelevantData2.filter(d => top5PurposeList.includes(d.purpose))
)}

function _uniqueData(data2){return(
data2.reduce((acc, curr) => {
  const key = `${curr.donor}-${curr.recipient}-${curr.purpose}`;
  if (!acc[key]) {
    acc[key] = curr;
  }
  return acc;
}, {})
)}

function _top5purposeData(uniqueData){return(
Object.values(uniqueData)
)}

function _purposeColors(d3,top5PurposeList){return(
d3.scaleOrdinal()
    .domain(top5PurposeList)
    .range(d3.schemeCategory10)
)}

function _totalData(d3,top5purposeData){return(
d3.rollup(
  top5purposeData,
  group => d3.sum(group, d => d.amount),
  d => d.donor,
  d => d.recipient 
)
)}

function _enhancedData(d3,top5purposeData){return(
d3.flatGroup(top5purposeData, d => d.donor, d => d.recipient)
  .flatMap(([donor, recipient, purposes]) => {
    const purposeCount = purposes.length;
    return purposes.map((d, index) => ({
      ...d,
      donor,             
      recipient,      
      purposeCount,  
      purposeIndex: index
    }));
  })
)}

function _Swatches(d3,htl){return(
function Swatches(color, {
  columns = null,
  format,
  unknown: formatUnknown,
  swatchSize = 15,
  swatchWidth = swatchSize,
  swatchHeight = swatchSize,
  marginLeft = 0
} = {}) {
  const id = `-swatches-${Math.random().toString(16).slice(2)}`;
  const unknown = formatUnknown == null ? undefined : color.unknown();
  const unknowns = unknown == null || unknown === d3.scaleImplicit ? [] : [unknown];
  const domain = color.domain().concat(unknowns);
  if (format === undefined) format = x => x === unknown ? formatUnknown : x;

  function entity(character) {
    return `&#${character.charCodeAt(0).toString()};`;
  }

  if (columns !== null) return htl.html`<div style="display: flex; align-items: center; margin-left: ${+marginLeft}px; min-height: 33px; font: 10px sans-serif;">
  <style>

.${id}-item {
  break-inside: avoid;
  display: flex;
  align-items: center;
  padding-bottom: 1px;
}

.${id}-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - ${+swatchWidth}px - 0.5em);
}

.${id}-swatch {
  width: ${+swatchWidth}px;
  height: ${+swatchHeight}px;
  margin: 0 0.5em 0 0;
}

  </style>
  <div style=${{width: "100%", columns}}>${domain.map(value => {
    const label = `${format(value)}`;
    return htl.html`<div class=${id}-item>
      <div class=${id}-swatch style=${{background: color(value)}}></div>
      <div class=${id}-label title=${label}>${label}</div>
    </div>`;
  })}
  </div>
</div>`;

  return htl.html`<div style="display: flex; align-items: center; min-height: 33px; margin-left: ${+marginLeft}px; font: 10px sans-serif;">
  <style>

.${id} {
  display: inline-flex;
  align-items: center;
  margin-right: 1em;
}

.${id}::before {
  content: "";
  width: ${+swatchWidth}px;
  height: ${+swatchHeight}px;
  margin-right: 0.5em;
  background: var(--color);
}

  </style>
  <div>${domain.map(value => htl.html`<span class="${id}" style="--color: ${color(value)}">${format(value)}</span>`)}</div>`;
}
)}

function _yearMapping(){return(
{
  "80": 1,
  "90": 2,
  "00": 3,
  "10": 4,
  "20": 5
}
)}

function _RelevantData3(aiddata,top20Donors,top10Recipients,yearMapping){return(
aiddata.filter(d => 
    top20Donors.includes(d.donor) && top10Recipients.includes(d.recipient)
).map(d => ({
    donor: d.donor,
    recipient: d.recipient,
    amount: d.amount / 1000,
    yearInt: String(Math.floor(d.yearInt / 10) * 10 + 10).slice(-2),
    yearIndex: yearMapping[String(Math.floor(d.yearInt / 10) * 10 + 10).slice(-2)]
}))
)}

function _mergedData3(d3,RelevantData3,yearMapping){return(
Array.from(
  d3.rollup(
    RelevantData3,
    v => d3.sum(v, d => d.amount),
    d => d.donor,
    d => d.recipient,
    d => d.yearInt
  ),
  ([donor, recipients]) => Array.from(recipients, ([recipient, years]) => 
    Array.from(years, ([yearInt, amount]) => ({
      donor,
      recipient,
      yearInt,
      amount,
      yearIndex: yearMapping[yearInt]
    }))
  ).flat()
).flat()
)}

function _53(md){return(
md`-----------------
## Appendix`
)}

function _d3(require){return(
require('d3@7')
)}

function _googleSheetCsvUrl(){return(
'https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/gviz/tq?tqx=out:csv'
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-50m.json", {url: new URL("./files/55260abbc777c0a3b8fed19f3929dd822fef9d5118b53b76b2176d20782910e599eac919999ea8ee85a60b783fd37082574f6591fd46c0d70ddf9b00df71ce27.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["Inputs","aiddata"], _3);
  main.variable(observer("aiddata")).define("aiddata", ["d3","googleSheetCsvUrl"], _aiddata);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("geoJSON")).define("geoJSON", ["FileAttachment"], _geoJSON);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.import("swatches", child1);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["legend","color"], _14);
  main.variable(observer()).define(["d3","width","height","yAxis","xAxis","margin","x","y","top10Recipients","top20Donors","data","color"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["Swatches","d3","top5PurposeList"], _17);
  main.variable(observer()).define(["d3","width","height","yAxis","xAxis","margin","x","y","top10Recipients","top20Donors","enhancedData","totalData","purposeColors"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["legend","color"], _20);
  main.variable(observer()).define(["d3","width","height","yAxis","xAxis","margin","x","y","top10Recipients","top20Donors","mergedData3","color"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("recipientAmounts")).define("recipientAmounts", ["d3","aiddata"], _recipientAmounts);
  main.variable(observer("donorAmounts")).define("donorAmounts", ["d3","aiddata"], _donorAmounts);
  main.variable(observer("top10Recipients")).define("top10Recipients", ["recipientAmounts"], _top10Recipients);
  main.variable(observer("top20Donors")).define("top20Donors", ["donorAmounts"], _top20Donors);
  main.variable(observer("RelevantData")).define("RelevantData", ["aiddata","top20Donors","top10Recipients"], _RelevantData);
  main.variable(observer("mergedData")).define("mergedData", ["RelevantData"], _mergedData);
  main.variable(observer("data")).define("data", ["mergedData"], _data);
  main.variable(observer("maxAmount")).define("maxAmount", ["d3","data"], _maxAmount);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("height")).define("height", ["margin"], _height);
  main.variable(observer("x")).define("x", ["d3","top10Recipients","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","top20Donors","margin","height"], _y);
  main.variable(observer("color")).define("color", ["d3","data"], _color);
  main.variable(observer("xAxis")).define("xAxis", ["margin","d3","x","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","height"], _yAxis);
  main.variable(observer("RelevantData2")).define("RelevantData2", ["aiddata","top20Donors","top10Recipients"], _RelevantData2);
  main.variable(observer("filteredData")).define("filteredData", ["RelevantData2"], _filteredData);
  main.variable(observer("purposeCount")).define("purposeCount", ["filteredData"], _purposeCount);
  main.variable(observer("top5Purposes")).define("top5Purposes", ["purposeCount"], _top5Purposes);
  main.variable(observer("top5PurposeList")).define("top5PurposeList", ["top5Purposes"], _top5PurposeList);
  main.variable(observer("data2")).define("data2", ["RelevantData2","top5PurposeList"], _data2);
  main.variable(observer("uniqueData")).define("uniqueData", ["data2"], _uniqueData);
  main.variable(observer("top5purposeData")).define("top5purposeData", ["uniqueData"], _top5purposeData);
  main.variable(observer("purposeColors")).define("purposeColors", ["d3","top5PurposeList"], _purposeColors);
  main.variable(observer("totalData")).define("totalData", ["d3","top5purposeData"], _totalData);
  main.variable(observer("enhancedData")).define("enhancedData", ["d3","top5purposeData"], _enhancedData);
  main.variable(observer("Swatches")).define("Swatches", ["d3","htl"], _Swatches);
  main.variable(observer("yearMapping")).define("yearMapping", _yearMapping);
  main.variable(observer("RelevantData3")).define("RelevantData3", ["aiddata","top20Donors","top10Recipients","yearMapping"], _RelevantData3);
  main.variable(observer("mergedData3")).define("mergedData3", ["d3","RelevantData3","yearMapping"], _mergedData3);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("googleSheetCsvUrl")).define("googleSheetCsvUrl", _googleSheetCsvUrl);
  return main;
}
