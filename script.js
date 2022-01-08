
const app = new Vue({
    el: "#app",
    data:{
        lon: NaN,
        lat: NaN,
        target: "",
        KeyWord: "",
        result: ""
        
    },
    methods:{
        getLocation: function(){
            //検索対象が入力されていない場合は検索をしない
            if(this.target===""){
                return;
            }
            this.KeyWord = encodeURIComponent(app.target);
            navigator.geolocation.getCurrentPosition(this.getLocationImpl);
            
        },
        getLocationImpl: function(position){
            this.lon = position.coords.longitude;
            this.lat = position.coords.latitude;
            GETYahooRequest(this.KeyWord,this.lon,this.lat);
            
        }
    },

});


function GETYahooRequest(keyword, lon, lat){
   const RequestURL = "https://map.yahooapis.jp/search/local/V1/localSearch?appid=dj00aiZpPWVkMVppTjFWYnYwMyZzPWNvbnN1bWVyc2VjcmV0Jng9MWU-&query="
                      +keyword+"&dist=20&sort=geo&lon="+String(lon)+"&lat="+String(lat)+"&output=json&callback=createMap";
   const scriptTag = document.getElementById("Request");
   scriptTag.src = RequestURL;
   
}

//ヒュベニの近似式で緯度・経度から現在地から店までの距離を求める
function getDistance(Mylon,Mylat,targetLon,targetLat) {
    const deltaPhi = (Math.abs(Mylat - targetLat) * Math.PI) / 180;
    const deltaLambda = (Math.abs(Mylon - targetLon) * Math.PI) / 180;
    const Phi = (((Mylat + targetLat)/2) * Math.PI) / 180;
    const M = 6334834 / Math.sqrt((1-0.0066744*(Math.sin(Phi)^2))^3);
    const N = 6377397 / Math.sqrt(1-0.0066744*(Math.sin(Phi)^2));
    const distance = Math.sqrt((M * deltaPhi) * (M * deltaPhi)+(N*Math.cos(Phi)*deltaLambda) * (N*Math.cos(Phi)*deltaLambda))
    
    return distance;
}

//現在地とYahooAPIの結果から距離が最も近い店を探す
function getNearestStore(Mylon,Mylat,Request) {
    const RequestLength = Request.Feature.length;
    let Distances = [];
    for(let i = 0; i < RequestLength; i++) {
        rawLonLat = Request.Feature[i].Geometry.Coordinates.split(",");
        targetLon = parseFloat(rawLonLat[0]);
        targetLat = parseFloat(rawLonLat[1]);
        const distance = getDistance(Mylon,Mylat,targetLon,targetLat);
        Distances.push(distance);
    }
    const MinDistance = Math.min(...Distances);
    for(let i = 0; i < Distances.length; i++) {
        if(Distances[i] === MinDistance){
            return i;
        }
    }
    
}

//地図を生成
function createMap(Request) {
    const map = L.map('map');
    // タイルレイヤーを作成し、地図にセットする
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
       maxZoom: 18,
       attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>',
    }).addTo(map);

   // 地図の中心座標とズームレベルを設定する
   map.setView([app.lat, app.lon], 13);
   //目的地用のアイコンを生成
   const targetMarker = L.AwesomeMarkers.icon({
     markerColor: 'orange'
    });
   //現在地にマーカーを付ける(そのままだと見づらいので)
   const currentLocation = L.marker([app.lat, app.lon]).addTo(map);
   currentLocation.bindPopup("現在地");
   
   let targetLon = NaN;
   let targetLat = NaN;
   if(Request!==""){
      //YahooAPIで条件に合う店舗を検索し、緯度経度を取得する
      const index = getNearestStore(app.lon,app.lat,Request);
      let rawLonLat = Request.Feature[index].Geometry.Coordinates;
      rawLonLat = rawLonLat.split(",");
      targetLon = parseFloat(rawLonLat[0]);
      targetLat = parseFloat(rawLonLat[1]);
      
      //2点間の距離(m)
      const distance = getDistance(app.lon,app.lat,targetLon,targetLat);
      //歩く速さを時速4km=4000mだと考えて、分速に直す
      const walkSpeed = 4000 / 60;
      const targetAddress = Request.Feature[0].Property.Address;
      const targetName = Request.Feature[0].Name;
      let time = Math.round(distance/walkSpeed);
      
      
      //「徒歩0分」はありえないので、0が出たら1にする
      if(time === 0){
          time = 1;
      }
      //検索結果の場所にマーカーを立てる
      const targetLocation = L.marker([targetLat, targetLon],{icon:targetMarker}).addTo(map);
      const result = "最寄りの"+app.target+"： "+targetName+"　住所："+targetAddress+"　所要時間：徒歩約"+String(time)+"分";
      targetLocation.bindPopup(result);
      app.result = result;

      
      
      
   }
    
}

function Reload(){
    document.location.reload();
    
}
