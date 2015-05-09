/**
 * ���ݒn�̏����擾���A��ԋ߂��ꏊ�ɂ���g�C���܂ł̃��[�g��\��������
 */
function searchToilet() {

	// �����l�Ƃ��Ďs���̓K���Ȉʒu��o�^���Ă����B�s�������ǂ��H�����쌟�؂ɂȂ�Ȃ����ߔC�ӂ̈ܓx�E�o�x���w��B�i��Í��Z�j
	var lng = 139.929621219635;
	var lat = 37.47976234695506;

	// geolocation�@�\���g�p���Č��ݒn�̏����擾����B
	if (navigator.geolocation) {

		// getCurrentPosition�̃I�v�V�����p�����[�^���\�z����
		var position_options = {
			enableHighAccuracy : true, // �����x��v������
			timeout : 60000, // �ő�҂����ԁi�~���b�j
			maximumAge : 0
		// �L���b�V���L�����ԁi�~���b�j
		};

		// ���݂̈ʒu�����擾
		window.navigator.geolocation.getCurrentPosition(

		//(1)�ʒu���̎擾�ɐ��������ꍇ�̃R�[���o�b�N�֐�
		function(pos) {
			var lat = pos.coords.latitude;
			var lng = pos.coords.longitude;
			routingToilets(new google.maps.LatLng(lat, lng));
		},
		//(2)�ʒu���擾�Ɏ��s�����ꍇ�̃R�[���o�b�N�֐�
		function(error) {
			var message = "";

			switch (error.code) {
			// �ʒu��񂪎擾�o���Ȃ��ꍇ
			case error.POSITION_UNAVAILABLE:
				message = "�ʒu���̎擾���o���܂���ł����B";
				break;
			// Geolocation�̎g�p��������Ȃ��ꍇ
			case error.PERMISSION_DENIED:
				message = "�ʒu���擾�̎g�p��������܂���ł����B";
				break;
			case error.PERMISSION_DENIED_TIMEOUT:
				message = "�ʒu���擾���Ƀ^�C���A�E�g���܂����B";
				break;
			}
			window.alert(message + "\n�s���̓K���Ȉʒu����̌������s���܂��B");
			routingToilets(new google.maps.LatLng(lat, lng));
		}, position_options);
	} else {
		window.alert("�{�u���E�U�ł�Geolocation���g���܂���B�s���̓K���Ȉʒu����̌������s���܂��B");
		routingToilets(new google.maps.LatLng(lat, lng));
	}
}

/**
 * OpenData���猻�ݒn����ԋ߂��g�C���̏ꏊ���擾���ă��[�g�ē����s��
 */
function routingToilets(latLng) {

	// �p�����[�^����ܓx�ƌo�x���擾����
	var lat = latLng.lat();
	var lng = latLng.lng();

	// ODQL�o�R�Ō��ݒn�����ԋ߂��g�C�������擾����i�ܓx�ƌo�x���Βl�\�����\�[�g�B�ŏ��̃f�[�^���g�p����j
	var jsonData = getNearestToilets(lat,lng);

	// ���[�g��\������}�b�v��ݒ�
	var directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.suppressInfoWindows = true;
	directionsRenderer.setMap(mapObj);

	// �J�n�n�_�ƏI���n�_�A���[�e�B���O�̎�ނ̐ݒ�
	var request = {
		origin : latLng,
		destination : new google.maps.LatLng(jsonData.data[0].latitude,
				jsonData.data[0].longitude),
		travelMode : google.maps.DirectionsTravelMode.WALKING
	};

	// ���[�g�������s��
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
		contentStr = contentStr + '<br>�d�b�ԍ��F' + data.tel;
	}
	if(data.holiday){
		contentStr = contentStr + '<br>��x���F' + data.holiday;
	}
	if(data.opentime){
		contentStr = contentStr + '<br>�J�َ��ԁF' + data.opentime;
	}
	if(data.comment){
		contentStr = contentStr + '<br>��@�@���F' + data.comment;
	}
	return contentStr;
}
