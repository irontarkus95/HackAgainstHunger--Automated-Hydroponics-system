function create_chart (elem_id, chart_title, y_label, y_units) {
	var chart = Highcharts.chart({
		chart: {
			renderTo: elem_id,
			defaultSeriesType: 'spline',
		}, 
		title: {
			text: chart_title
		},
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
            maxZoom: 20 * 1000
		},
		yAxis: {
			minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: y_label + '('+ y_units + ')',
                margin: 80
            }
		},
		series: [{
            name: y_label,
            data: []
        }]
	})

	return chart;
}
