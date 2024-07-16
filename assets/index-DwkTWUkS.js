(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const h of i)if(h.type==="childList")for(const o of h.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const h={};return i.integrity&&(h.integrity=i.integrity),i.referrerPolicy&&(h.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?h.credentials="include":i.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function s(i){if(i.ep)return;i.ep=!0;const h=e(i);fetch(i.href,h)}})();class a{constructor(){this.default={width:500,height:500,src:"",ratio:1,encode:"base64",type:"jpeg",name:"crop-picture",quality:.9,buttonText:["取消","重置","完成"],buttonColor:["#e04c4c","#3680fd","#23c667"],buttonSize:12},this.init(),this.cropic=this.getId("cropic"),this.img1=this.getId("cropicImg1"),this.img2=this.getId("cropicImg2"),this.frame1=this.getId("cropicFrame1"),this.frame2=this.getId("cropicFrame2"),this.cancelBtn=this.getId("cropicCancel"),this.resetBtn=this.getId("cropicReset"),this.confirmBtn=this.getId("cropicConfirm"),this.borderLine=this.getId("borderLine"),this.cropicLayer=this.getId("cropicLayer"),this.shadyPlot=this.getId("shadyPlot"),this.reset=this.reset.bind(this),this.done=this.done.bind(this),this.cancel=this.cancel.bind(this)}init(){this.getId("cropic")||this.createHtml()}getId(t){return document.getElementById(t)}createHtml(){const t=document.createElement("div");t.className="cropic-body",t.setAttribute("id","cropic"),t.innerHTML=`
    <div class='shady-plot' id='shadyPlot'></div>
      <div class="cropic-frame" id="cropicFrame1"><img id="cropicImg1"></div>
      <div class="cropic-layer" id="cropicLayer"></div>
      <div class="cropic-frame cropic-frame-show" id="cropicFrame2">
        <img id="cropicImg2">
        <div id="borderLine" class="border-line">
          <div class="cropic-frame-show-border1"></div>
          <div class="cropic-frame-show-border2"></div>
          <div class="cropic-frame-show-border3"></div>
          <div class="cropic-frame-show-border4"></div>
        </div>
      </div>
      <div class="cropic-operation-bar">
        <div class="cropic-cancel" id="cropicCancel" role="button">取消</div>
        <div class="cropic-reset" id="cropicReset" role="button">重置</div>
        <div class="cropic-confirm" id="cropicConfirm" role="button">完成</div>
      </div>
    `,document.body.appendChild(t)}getImage(t={}){this.scale=1,this.rotate=0,this.translateX=0,this.translateY=0,this.cropicWidth=0,this.cropicHeight=0;const e=JSON.parse(JSON.stringify(this.default));this.options=Object.assign(e,t),this.cancelBtn.innerHTML=this.options.buttonText[0],this.resetBtn.innerHTML=this.options.buttonText[1],this.confirmBtn.innerHTML=this.options.buttonText[2],this.cancelBtn.style.color=this.options.buttonColor[0],this.resetBtn.style.color=this.options.buttonColor[1],this.confirmBtn.style.color=this.options.buttonColor[2],this.cancelBtn.style.fontSize=this.options.buttonSize+"px",this.resetBtn.style.fontSize=this.options.buttonSize+"px",this.confirmBtn.style.fontSize=this.options.buttonSize+"px",this.img1.src=this.options.src,this.img2.src=this.options.src;let s=new Image;s.onload=()=>{this.originW=this.img2.width,this.originH=this.img2.height,this.originRatio=this.originW/this.originH,this.initSize(),this.cropic.style.transform="translate(0, 0)",setTimeout(()=>{this.img1.width>this.img1.height?(this.img1.style.height=this.frame1.clientHeight+"px",this.img2.style.height=this.frame1.clientHeight+"px",this.img1.style.width=this.img1.width*(this.frame1.clientHeight/this.img1.height)+"px",this.img2.style.width=this.img1.width*(this.frame1.clientHeight/this.img1.height)+"px"):(this.img1.style.width=this.frame1.clientWidth+"px",this.img2.style.width=this.frame1.clientWidth+"px",this.img1.style.height=this.img1.height*(this.frame1.clientWidth/this.img1.width)+"px",this.img2.style.height=this.img1.height*(this.frame1.clientWidth/this.img1.width)+"px"),this.img1.height>this.img1.width?(this.translateY=-Math.floor((this.img1.height-this.options.cropicHeight)/2),this.translateX=0):(this.translateX=-Math.floor((this.img1.width-this.options.cropicWidth)/2),this.translateY=0),this.setTransform()},300),setTimeout(()=>{this.shadyPlot.style.display="none"},310),this.cancelBtn.addEventListener("click",this.cancel),this.resetBtn.addEventListener("click",this.reset),this.confirmBtn.addEventListener("click",this.done),this.cropic.addEventListener("touchmove",i=>{if(i.preventDefault(),i.touches.length>1){this.setScale(i.touches[0],i.touches[1]),this.setRotate(i.touches[0],i.touches[1]);return}this.setTranslate(i.touches[0]),this.cropicLayer.style.display="none",this.borderLine.setAttribute("class","borderLinefadeIn"),this.cropicLayer.setAttribute("class","cropic-layer")}),this.cropic.addEventListener("touchend",i=>{this.distance=null,this.angle=null,this.moveX=null,this.moveY=null;const h=this.img1.getBoundingClientRect(),o=this.frame1.getBoundingClientRect();h.top>=o.top&&(this.scale===1?this.translateY=0:this.translateY=(h.height-this.img1.height)/2),h.bottom<=o.bottom&&(this.scale===1?this.translateY=-(this.img1.height-this.frame1.clientHeight):this.translateY=-(h.height-o.height-(h.height-this.img1.height)/2)),h.left>=o.left&&(this.scale===1?this.translateX=0:this.translateX=(h.width-this.img1.width)/2),h.right<=o.right&&(this.scale===1?this.translateX=-(h.width-this.frame1.clientHeight):this.translateX=-(h.width-this.img1.width)/2),this.setTransform(),setTimeout(()=>{this.cropicLayer.style.display="block",this.borderLine.setAttribute("class","borderLinefadeOut"),this.cropicLayer.setAttribute("class","cropicFadeOut")},300)})},s.src=this.options.src}initSize(){const t=document.documentElement||document.body;let e=0,s=0,i=this.options.width/this.options.height;i===1?t.clientHeight>t.clientWidth?(e=t.clientWidth-60,s=t.clientWidth-60):(e=t.clientHeight-60,s=t.clientHeight-60):t.clientHeight>t.clientWidth?t.clientWidth>this.options.width?(e=this.options.width,s=this.options.height):(e=t.clientWidth-60,s=(t.clientWidth-60)/i):t.clientHeight>this.options.height?(e=this.options.width,s=this.options.height):(e=t.clientHeight-60,s=(t.clientHeight-60)/i),this.options.cropicWidth=e,this.options.cropicHeight=s,this.options.width=e,this.options.height=s,this.frame1.style.width=e+"px",this.frame1.style.height=s+"px",this.frame2.style.width=e+"px",this.frame2.style.height=s+"px",this.cropicLayer.style.display="block"}setScale(t,e){const s=Math.abs(t.clientX-e.clientX),i=Math.abs(t.clientY-e.clientY),h=Math.sqrt(s*s+i*i);this.distance&&(this.scale+=(h-this.distance)/this.img2.clientWidth,this.setTransform()),this.distance=h}setRotate(t,e){const s=t.clientX-e.clientX,i=t.clientY-e.clientY,h=Math.atan2(i,s)*180/Math.PI;this.angle&&(this.rotate+=h-this.angle,this.setTransform()),this.angle=h}setTranslate(t){const e=t.clientX,s=t.clientY;this.moveX&&(this.translateX+=e-this.moveX),this.moveY&&(this.translateY+=s-this.moveY),this.moveX=e,this.moveY=s,this.setTransform()}setTransform(){let t=`translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale}) rotate(${this.rotate}deg)`;this.img1.style.transform=t,this.img2.style.transform=t}cancel(t){this.cropic.style.transform="translate(0, 100%)",setTimeout(()=>{this.img1.style="",this.img1.src="",this.img2.style="",this.img2.src=""},400),this.options.onCancel&&t!=="done"&&this.options.onCancel(),this.cancelBtn.removeEventListener("click",this.cancel),this.resetBtn.removeEventListener("click",this.reset),this.confirmBtn.removeEventListener("click",this.done,!0),this.shadyPlot.style.display="block"}reset(){this.scale=1,this.rotate=0,this.img1.height>this.img1.width?(this.translateY=-Math.floor((this.img1.height-this.options.cropicHeight)/2),this.translateX=0):(this.translateX=-Math.floor((this.img1.width-this.options.cropicWidth)/2),this.translateY=0),this.img1.style.transition="0.3s",this.img2.style.transition="0.3s",this.setTransform(),setTimeout(()=>{this.img1.style.transition="",this.img2.style.transition=""},300)}done(){const t=this.options.width/this.frame2.clientWidth,e=document.createElement("canvas");e.width=this.options.width,e.height=this.options.height;const s=e.getContext("2d");s.fillStyle="#000",s.fillRect(0,0,e.width,e.height);let i,h;this.img1.height>this.img1.width?(i=this.options.width,h=this.img1.height/(this.img1.width/this.options.width)):(h=this.options.height,i=this.img1.width/(this.img1.height/this.options.height));const o={x:i/2,y:h/2};if(s.translate(this.translateX*t,this.translateY*t),this.rotate!==0&&(s.translate(o.x,o.y),s.rotate(this.rotate*Math.PI/180),s.translate(-o.x,-o.y)),this.scale!==1&&(s.translate(o.x*(1-this.scale),o.y*(1-this.scale)),s.scale(this.scale,this.scale)),s.drawImage(this.img2,0,0,i,h),this.options.onDone)switch(this.options.encode){case"base64":this.options.onDone(e.toDataURL(`image/${this.options.type}`,this.options.quality));break;case"blob":e.toBlob(r=>{this.options.onDone(r)},`image/${this.options.type}`);break;case"file":e.toBlob(r=>{let c=new window.File([r],this.options.name,{type:`image/${this.options.type}`});this.options.onDone(c)},`image/${this.options.type}`);break;default:this.options.onDone(e.toDataURL(`image/${this.options.type}`,this.options.quality));break}this.cancel("done")}}var l=new a;function d(n){var t=n.files||n.dataTransfer.files,e=new FileReader;e.readAsDataURL(t[0]),e.onload=s=>{l.getImage({src:s.target.result,buttonColor:["yellow","skyblue","red"],buttonSize:20,name:"test",encode:"base64",type:"png",onDone:function(i){document.getElementById("previewImg").src=i},onCancel:function(){console.log("取消裁剪")}})},n.value=""}document.querySelector("input").addEventListener("change",n=>{d(n==null?void 0:n.target)});
