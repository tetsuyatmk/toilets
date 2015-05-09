/**
 * 現在地の情報を取得し、一番近い場所にあるトイレまでのルートを表示させる
 */
function searchToilet() {

	// 初期値として市内の適当な位置を登録しておく。市役所が良い？→動作検証にならないため任意の緯度・経度を指定。（会津高校）
	var lng = 139.929621219635;
	var lat = 37.47976234695506;

	// geolocation機能を使用して現在地の情報を取得する。
	if (navigator.geolocation) {

		// getCurrentPositionのオプションパラメータを構築する
		var position_options = {
			enableHighAccuracy : true, // 高精度を要求する
			timeout : 60000, // 最大待ち時間（ミリ秒）
			maximumAge : 0
		// キャッシュ有効期間（ミリ秒）
		};

		// 現在の位置情報を取得
		window.navigator.geolocation.getCurrentPosition(

		//(1)位置情報の取得に成功した場合のコールバック関数
		function(pos) {
			var lat = pos.coords.latitude;
			var lng = pos.coords.longitude;
			routingToilets(new google.maps.LatLng(lat, lng));
		},
		//(2)位置情報取得に失敗した場合のコールバック関数
		function(error) {
			var message = "";

			switch (error.code) {
			// 位置情報が取得出来ない場合
			case error.POSITION_UNAVAILABLE:
				message = "位置情報の取得が出来ませんでした。";
				break;
			// Geolocationの使用が許可されない場合
			case error.PERMISSION_DENIED:
				message = "位置情報取得の使用許可がされませんでした。";
				break;
			case error.PERMISSION_DENIED_TIMEOUT:
				message = "位置情報取得中にタイムアウトしました。";
				break;
			}
			window.alert(message + "\n市内の適当な位置からの検索を行います。");
			routingToilets(new google.maps.LatLng(lat, lng));
		}, position_options);
	} else {
		window.alert("本ブラウザではGeolocationが使えません。市内の適当な位置からの検索を行います。");
		routingToilets(new google.maps.LatLng(lat, lng));
	}
}

/**
 * OpenDataから現在地より一番近いトイレの場所を取得してルート案内を行う
 */
function routingToilets(latLng) {

	// パラメータから緯度と経度を取得する
	var lat = latLng.lat();
	var lng = latLng.lng();

	// ODQL経由で現在地から一番近いトイレ情報を取得する（緯度と経度を絶対値表示しソート。最初のデータを使用する）
	var jsonData = getNearestToilets(lat,lng);

	// ルートを表示するマップを設定
	var directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.suppressInfoWindows = true;
	directionsRenderer.setMap(mapObj);

	// 開始地点と終了地点、ルーティングの種類の設定
	var request = {
		origin : latLng,
		destination : new google.maps.LatLng(jsonData.data[0].latitude,
				jsonData.data[0].longitude),
		travelMode : google.maps.DirectionsTravelMode.WALKING
	};

	// ルート検索を行う
	var directionsService = new google.maps.DirectionsService();
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsRenderer.setDirections(result);
		}
	});
}

/**
 * 
 */
function getContentString(data){
	var contentStr;
	contentStr = '<img src="../img/both.png" />'
	if(data.omutsudai != '0'){
		contentStr = '<img src="../img/omutsu.png" />'
	}
	if(data.name){
		contentStr = contentStr + '<br><b>' + data.name + '</b>';
	}
	if(data.tel){
		contentStr = contentStr + '<br>電話番号：' + data.tel;
	}
	if(data.holiday){
		contentStr = contentStr + '<br>定休情報：' + data.holiday;
	}
	if(data.opentime){
		contentStr = contentStr + '<br>開館時間：' + data.opentime;
	}
	if(data.comment){
		contentStr = contentStr + '<br>補　　足：' + data.comment;
	}
	return contentStr;
}
