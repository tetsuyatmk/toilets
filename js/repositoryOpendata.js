/**
 * ���ׂẴg�C���ʒu�����擾����
 */
function getAllToilets(){
    var odqlScript = "SELECT id, name, tel, holiday, opentime, latitude, longitude, toilet, danjobetu, omutsudai, comment FROM o_aizu_toilet_list WHERE latitude is not null and longitude is not null";
    return getOpendata(odqlScript);
}

/**
 * ��ԋ߂��g�C���ʒu�����擾����
 */
function getNearestToilets(lat,lng){
	var odqlScript = "SELECT id, name, tel, holiday, opentime, latitude, longitude, toilet, danjobetu, omutsudai, comment FROM o_aizu_toilet_list WHERE latitude is not null and longitude is not null ORDER BY ABS(latitude - "
		+ lat + ") + ABS(longitude - " + lng + ") ASC";
	return getOpendata(odqlScript);

}

/**
 * �^����ꂽ�p�����[�^�̃X�N���v�g�����s����
 */
function getOpendata(odqlScript){
	var data = { odql:odqlScript };
	return ODQLLoader.loadOpenData(data);
}