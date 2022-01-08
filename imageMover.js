
const pics_src = new Array("0.jpg","1.jpg","2.jpg","3.jpg","4.jpg");
let num = -1;
 
slideshow_timer();
 
function slideshow_timer(){
    if (num === 4){
          num = 0;
    } 
    else {
          num++;
     }
    if(document.getElementById("images") !== null){
      document.getElementById("images").src=pics_src[num];
    }
    setTimeout("slideshow_timer()",1000); 
    }