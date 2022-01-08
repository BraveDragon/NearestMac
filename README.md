# NearestMac

## NearestMacとは？

自分の現在地から、レストランを検索できるWebアプリケーションです。検索対象はマクドナルド/吉野家/ガスト/サイゼリヤ/ロイヤルホスト/CoCo壱番屋/餃子の王将/天下一品/スターバックス/ドトールといった、大学生が良く使うような10店舗から選択可能です。  
さらに、検索結果の店名や、徒歩での所要時間も分かります。

## 使用した技術

<API・ライブラリ類>

- Leaflet：地図表示部・マーカーの表示
- Leaflet.awesome-markers plugin：目的地のマーカーの生成
- Vue.js：トップ画面と結果画面の切り替えや緯度・経度表示部などのロジック部分
- Yahoo!ローカルサーチAPI：最寄りのレストランの検索

<地図>

- 国土地理院

## 使い方

1. トップ画面は以下のようになっています。

![Top](https://github.com/BraveDragon/NearestMac/blob/main/Main_1.png)

2. 「検索対象を指定してください」と書かれたプルダウンメニューをクリックして、検索したいレストランを選びます。

![Top2](https://github.com/BraveDragon/NearestMac/blob/main/Main_2.png)

3. 検索対象を指定したら、「現在位置を取得して検索」ボタンを押してください。

![Permission](https://github.com/BraveDragon/NearestMac/blob/main/Permission.png)

以上のようなメッセージが表示された場合は「許可」をクリックしてください。

4. 実行すると店名・住所・徒歩での所要時間と地図が表示されます。

![Result1](https://github.com/BraveDragon/NearestMac/blob/main/Result_1.png)

青いマーカーが現在地です。クリックすると「現在地」と表示されます。
オレンジのマーカーが検索対象です。クリックすると地図上部に表示されている検索結果と同様のメッセージが表示されます。地図の上でマウスホイールを奥に回すとズームイン、手前に回すとズームアウトできます。

5. 別の店を検索したいときは、一旦「リセット」ボタンをクリックすると、トップ画面に戻り、再度同様に検索できます。

## このアプリケーションを使うメリット

1. 現在地から目的地までの徒歩での所要時間がすぐ分かる。

1. 検索対象はプルダウンメニューから選択できるので、複数検索する時に、キーワードを打ち直さなくても良い。

## ライセンス表示など

地図出典：国土地理院(URL : https://maps.gsi.go.jp/development/ichiran.html )

Leaflet.awesome-markers pluginのライセンス表示：

Copyright (C) 2013 L. Voogdt (詳細：https://github.com/lennardv2/Leaflet.awesome-markers/blob/2.0/develop/LICENSE)

