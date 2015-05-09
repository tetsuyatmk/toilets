/**
 * すべてのトイレ位置情報を取得する
 */
function getAllToilets(){
    var odqlScript = "SELECT id, name, tel, holiday, opentime, latitude, longitude, toilet, danjobetu, omutsudai, comment FROM o_aizu_toilet_list WHERE latitude is not null and longitude is not null";
    return getOpendata(odqlScript);
}

/**
 * 一番近いトイレ位置情報を取得する
 */
function getNearestToilets(lat,lng){
	var odqlScript = "SELECT id, name, tel, holiday, opentime, latitude, longitude, toilet, danjobetu, omutsudai, comment FROM o_aizu_toilet_list WHERE latitude is not null and longitude is not null ORDER BY ABS(latitude - "
		+ lat + ") + ABS(longitude - " + lng + ") ASC";
	return getOpendata(odqlScript);

}

/**
 * 与えられたパラメータのスクリプトを実行する
 */
function getOpendata(odqlScript){
	var data = { odql:odqlScript };
	return ODQLLoader.loadOpenData(data);
}