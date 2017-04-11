const initialState = {
  activeChartIndex:0,
  charts:[{
  // Labels corresponding to the corners of the chart.
      labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ],
      // The name of the chart
      name: "Example Chart",
      // The data required for rendering values to the chart
      datasets: [
    		{
    			// The name of the dataset
    			label: "My First dataset",
    			// Each of these numbers corresponds to one of the labels above,
    			// based on index
    		  data: [65, 59, 90, 81, 56, 55, 40]
    		},
    		{
    			label: "My Second dataset",
    			data: [28, 48, 40, 19, 96, 27, 100]
    		}
    	]
    }]
  }

const CREATE_CHART = 'CREATE_CHART'
const SET_ACTIVE_CHART_INDEX = 'SET_ACTIVE_CHART_INDEX'
const ADD_DATASET = 'ADD_DATASET'
//Action Creators (exporting functions)
export function createChart(labels,name) {
  return{
    chart: {labels,name,datasets:[]},
    type:CREATE_CHART
  }
}
export function setActiveChartIndex(index){
  return{
    type:SET_ACTIVE_CHART_INDEX,
    index
  }
}
export function addDataset(dataset){
  return{
    type:ADD_DATASET,
    dataset
  }
}
//Reducer - default parameter something = something
export default function chart( state=initialState, action ){
  switch( action.type ) {
    case CREATE_CHART:
      return {
        charts: [action.chart, ...state.charts],
        activeChartIndex:0
      };
    case SET_ACTIVE_CHART_INDEX:
      return {
        activeChartIndex:action.index,
        charts:state.charts
      };
    case ADD_DATASET:
      // Saving ourselves some typing and clean up code by destructuring
      // values we will be using often.
      const { activeChartIndex, charts } = state;
      const activeChart = charts[ activeChartIndex ];
      return {
        activeChartIndex,
        charts: [
        // Making a copy of all the charts before the active chart
          ...charts.slice( 0, activeChartIndex ),
        // Replacing the active chart with a modified copy
          Object.assign(
            {},
            activeChart,
            { datasets: [ ...activeChart.datasets, action.dataset ] }
          ),
        // Making a copy of all the charts after the active chart
          ...charts.slice( activeChartIndex + 1, charts.length )
        ]
    }
    default:
      return state;
  }
}
