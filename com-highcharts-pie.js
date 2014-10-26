define(["jquery","./highcharts","text!./simpletable.css"], function($, cssContent) {'use strict';
	$("<style>").html(cssContent).appendTo("head");
	return {
		initialProperties : {
			version: 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 10,
					qHeight : 50
				}]
			}
		},
		definition : {
			type : "items",
			component : "accordion",
			items : {
				dimensions : {
					uses : "dimensions",
					min : 1
				},
				measures : {
					uses : "measures",
					min : 1
				},
				sorting : {
					uses : "sorting"
				},
				settings : {
					uses : "settings",
					items : {
						initFetchRows : {
							ref : "qHyperCubeDef.qInitialDataFetch.0.qHeight",
							label : "Initial fetch rows",
							type : "number",
							defaultValue : 50
						},
						Pivot: {
							type: "items",
							label: "Pie Chart Options" ,
							items: {
						Title : {
							ref: "PieTitle",
							label: "Title",
							type: "string",
							defaultValue: "Pie Chart",
						},								
						Size : {
							ref: "PieSize",
							label: "Size",
							type: "integer",
							defaultValue: 100,
							component: "slider",
							min: 1,
							max: 100,
							step: 1
						},	
						InnerSize : {
							ref: "PieInnerSize",
							label: "Inner Size",
							type: "integer",
							defaultValue: 60,
							component: "slider",
							min: 1,
							max: 100,
							step: 1
						}							
}
}						
					}
				}
			}
		},
		snapshot : {
			canTakeSnapshot : true
		},
		paint : function($element,layout) {
			var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
			var colors = Highcharts.getOptions().colors;
			var id = "div_" + layout.qInfo.qId;
			$element.html( '<div id="' + id + '"></div>' );

			var d = 0;
			var browserData = [];
			for(d = 0; d < qMatrix.length; d++) {
				var obj = {};
				obj.name = qMatrix[d][0].qText;
				obj.y = parseInt(qMatrix[d][1].qText.replace('%', ''));
				obj.color = colors[d];
				//console.log(obj);
				browserData.push(obj);
			}

			$('#'+id).highcharts({
              chart: {
                  type: 'pie'
              },
              title: {
                  text: layout.PieTitle
              },
              yAxis: {
                  title: {
                      text: ''
                  }
              },
              plotOptions: {
                  pie: {
                      shadow: false,
                      center: ['50%', '50%']
                  },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            //_this.Data.SelectRow(this.row);
                        }
                    }
                }
            }
              },
              tooltip: {
                  valueSuffix: '%'
              },
              series: [
              {
                  name: ' ',
                  data: browserData,
                  size: layout.PieInnerSize + '%',
                  innerSize: layout.PieSize + '%',
                  dataLabels: {
                      formatter: function () {
                          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
                      }
                  }
              }
              ]
          });
		
					
		}
	};
});
