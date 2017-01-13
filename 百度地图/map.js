// 百度地图API功能
var map = new BMap.Map("allmap");
map.centerAndZoom("山东", 8);
var scale = new BMap.ScaleControl({
    anchor : BMAP_ANCHOR_BOTTOM_RIGHT
});
var nav = new BMap.NavigationControl({
    anchor : BMAP_ANCHOR_TOP_RIGHT,
    type : BMAP_NAVIGATION_CONTROL_SMALL
});
map.addControl(nav);
map.addControl(scale);
var type = new BMap.MapTypeControl({
    anchor : BMAP_ANCHOR_TOP_LEFT
});
map.addControl(type);
map.setDefaultCursor("url('bird.cur')");
map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
var json_data = [[117.005748,36.657971],[117.956083,37.408142],[117.942285,35.727551],[119.984385,36.792883],[116.760259,36.559472],[118.11246,36.968394],[118.411417,35.117635]];
// var json_data = [[116.404,39.915],[116.383752,39.91334],[116.384502,39.932241]];
var pointArray = new Array();
for(var i=0;i<json_data.length;i++){
    var marker = new BMap.Marker(new BMap.Point(json_data[i][0], json_data[i][1])); // 创建点
    map.addOverlay(marker);    //增加点
    pointArray[i] = new BMap.Point(json_data[i][0], json_data[i][1]);
    marker.addEventListener("click",attribute);
}
//让所有点在视野范围内
map.setViewport(pointArray);
// 获取覆盖物位置
function attribute(e){
    var p = e.target;
    // alert("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);
    // window.open("target","xxxx")
}

var markerArr = [
    { title: "名称：济南市市中区电力安全系统", point: "117.005748,36.657971", address: "山东省济南市市中区自由大街1号", tel: "12306" },
    { title: "名称：电力安全系统", point: "117.956083,37.408142", address: "山东省滨州市滨城区中海北路 ", tel: "18500000000" },
    { title: "名称：滨州市滨城区电力安全系统", point: "117.942285,35.727551", address: "山东省临沂市蒙阴县刘洪路", tel: "18500000000" },
    { title: "名称：青岛市平度市电力安全系统", point: "119.984385,36.792883", address: "山东省青岛市平度市红旗路", tel: "18500000000" },
    { title: "名称：济南市长清区电力安全系统", point: "116.760259,36.559472", address: "山东省济南市长清区清河街2605", tel: "18500000000" },
    { title: "名称：淄博市桓台县电力安全系统", point: "118.11246,36.968394", address: "山东省淄博市桓台县公安街", tel: "18500000000" },
    { title: "名称：临沂市河东区电力安全系统", point: "118.411417,35.117635", address: "山东省临沂市河东区智圣路", tel: "18500000000" }
];
//第7步：绘制点
for (var i = 0; i < markerArr.length; i++) {
    var p0 = markerArr[i].point.split(",")[0];
    var p1 = markerArr[i].point.split(",")[1];
    var maker = addMarker(new window.BMap.Point(p0, p1), i);
    addInfoWindow(maker, markerArr[i], i);
}
// 添加标注
function addMarker(point, index) {
    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png",
        new BMap.Size(23, 25), {
            offset: new BMap.Size(10, 25),
            imageOffset: new BMap.Size(0, 0 - index * 25)
        });
    var marker = new BMap.Marker(point, { icon: myIcon });
    map.addOverlay(marker);
    return marker;
}
// 添加信息窗口
function addInfoWindow(marker, poi) {
    //pop弹窗标题
    var title = '<div style="font-weight:bold;color:#CE5521;font-size:14px">' + poi.title + '&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">详情</a></div>';
    //pop弹窗信息
    var html = [];
    html.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif"><tbody>');
    html.push('<tr>');
    html.push('<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">地址:</td>');
    html.push('<td style="vertical-align:top;line-height:16px">' + poi.address + ' </td>');
    html.push('</tr>');
    html.push('</tbody></table>');
    var infoWindow = new BMap.InfoWindow(html.join(""), { title: title, width: 300,height:100});

    var openInfoWinFun = function () {
        marker.openInfoWindow(infoWindow);
    };
    marker.addEventListener("mouseover", openInfoWinFun);
    var targetnav=function(){
        window.open("http://123.56.25.169:8099/esmp/nav.html")
    };
    marker.addEventListener("click", targetnav);
    return openInfoWinFun;
}