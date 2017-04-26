(function() {
    var contact = {
        initMap: function() {
            var map = new AMap.Map('map', {
                resizeEnable: false,
                lang: 'zh_en',
                mapStyle: 'fresh',
                zoom: 14,
                center: [113.319756, 23.251631]
            });
            var marker = new AMap.Marker({
                position: [113.319756, 23.251631]
            });
            marker.setMap(map);
            marker.on('click', function(e) {
                marker.markOnAMAP({
                    position: marker.getPosition(),
                    name: '广州市'
                });
            });
            var infowindow;
            var infoWindowContent = '<div class="infowindow-content">' +
                '<div class="amap-info-header">广州市</div>' +
                '<div class="amap-info-body">广州市</div>';

            map.plugin('AMap.AdvancedInfoWindow', function() {
                infowindow = new AMap.AdvancedInfoWindow({
                    panel: 'panel',
                    placeSearch: true,
                    asOrigin: true,
                    asDestination: true,
                    content: infoWindowContent,
                    offset: new AMap.Pixel(0, -30)
                });
                infowindow.open(map, [113.319756, 23.251631]);
            });
        },
        init: function() {
            var _this = this;
            _this.initMap();
        }
    }
    contact.init();
})()
