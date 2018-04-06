app.controller("UIAnalyticsCtrl", function (
	$scope,
	$location,
	$rootScope,
	$http,
	socket,
	$localStorage
) {

	var formatData = function (data) {

		var newData = [],
			tempObj = {};

		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				tempObj["key"] = key;
				tempObj["value"] = data[key] ? data[key] : 0;
				newData.push(angular.copy(tempObj));
			}
		}

		return newData;
	}

	var updateCDPData = function (data) {
		$scope.cdp_data = data;
		$scope.cdp_banner_info = data.ui_details.banner_info;
		$scope.cdp_graph_page_visit = formatData(data.ui_details.graph_page_visit);
		$scope.graph_js_errors = data.ui_details.graph_js_errors;
		$scope.graph_api_errors = data.ui_details.graph_api_errors;
	}

	var getBannerInfo = function () {
		$http.get("/coc/cdps/" + $localStorage.selectedCDPID).then(function (res) {
			updateCDPData(res.data[0]);
		});
	};

	getBannerInfo();

	socket.on("add", function (data) {
		updateCDPData(data);
	});
});
