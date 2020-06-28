import Ajax from './promise-ajax.js';
import Utils from './utils.js';

//渲染页面数据
class Detail{
    constructor(){
            let userdata=Utils.getCookie('userdata');
            if(!userdata){
                layer.msg("你好~请先登录后使用哦~",{
                    time: 2000,
                  },function(){
                    window.location.href='./login.html';
                  });
                return;
            }
            this.str=JSON.parse(userdata);
            this.$('#username').innerHTML=this.str.username;
            this.userid=this.str.userid;
            console.log(this.userid);
            this.init();
            this.$('.cartnum').innerHTML= Utils.getCookie("cartnum");
            window.onload=()=>{
            this.selectImg();
            this.loupe();
            this.jia();
            this.jian();
            this.addCart();
            }
    }
    $(ele){
         return document.querySelector(ele);
    }
    $$(ele){
        return document.querySelectorAll(ele);
   }
   init(){
       var serArr = window.location.search.split('=');
       this.goodsid=serArr[1];
       Utils.jsonp({
            url:'http://localhost/flower/dist/api/detail.php',
            cb_name:'callback',
            data:{id:this.goodsid},
            callback:res=>{
                console.log(res);
               if(res.DataStatus==200){
                let data = res.datas;
                this.$(".product-good-left").innerHTML=`
                <div class='imgbox'>
                <div class="pimg">
                          <img src="${data.imgsrc}" alt=""  class="bimg">
                          <span class='bspan'></span>
               </div>
               <div class="bigimg">
                        <img src="${data.imgsrc}" alt="" class="bimg1">
               </div>
               </div>
               <div class="pimglist">
                <img class="current" src="${data.smallimg1}" alt="">
                <img src="${data.smallimg2}" alt="">
                <img src="${data.smallimg3}" alt="">
                <img src="${data.smallimg4}" alt="">
               </div>`;
               this.$('.title').innerHTML=`
               <h3 class='cpmc'>${data.cpmc}</h3>
               <p class="product-subtitle">${data.instro}</p>
               <p class="ysnum">已售 <span class='sales'>${data.sales}</span>件</p>
               `;
                this.$('.aprice').innerHTML=`
                <p class="aprice-old">市场价格：￥<span class='oldp'>${data.lineprice}</span></p>
                <p class="aprice-now">花礼价格：<span><b>￥</b><span class='nowp'>${data.price}</span></span></p>
                `;
                this.$('.color-c').innerHTML=`
                <h5>选择分类：</h5>
                <img class="current" src="${data.smallimg1}" alt="">
                <img src="${data.smallimg2}" alt="">
                <img src="${data.smallimg3}" alt="">
                <img src="${data.smallimg4}" alt="">
                `;
                this.$(".c-num").value=data.gnum;
                if(this.$(".c-num").value==1){
                    this.$(".jian").classList.add('no');
                }
             }else{
                 return;
             }
            }
       })
   }
   selectImg(){
       let _this = this;
       this.$$('.pimglist img').forEach(ele=>{
           ele.addEventListener('mouseenter',function(){
               _this.$(".bimg").src=this.src;
               _this.$(".bimg1").src=this.src;
                _this.$$('.pimglist img').forEach((ele,index)=>{
                    _this.$$('.pimglist img')[index].classList.remove('current')
                })
              this.classList.add('current');
           })
       })
       this.$$('.color-c img').forEach(ele=>{
        ele.addEventListener('click',function(){
            _this.$(".bimg").src=this.src;
            _this.$(".bimg1").src=this.src;
             _this.$$('.color-c img').forEach((ele,index)=>{
                 _this.$$('.color-c img')[index].classList.remove('current')
                 _this.$$('.pimglist img')[index].classList.remove('current')
             })
           this.classList.add('current');
        })
    })
   }
   loupe(){
        this.$(".pimg").addEventListener('mouseenter',(evt)=>{
          var e=evt || window.event;
          this.$(".bspan").style.display='block';
          this.$(".bigimg").style.display='block';
         window.onmousemove=(e)=>{
            let left = e.pageX - this.$('.pimg').offsetLeft - this.$(".imgbox").offsetLeft-this.$(".bspan").offsetWidth/2;
            let top =  e.pageY - this.$('.pimg').offsetTop- this.$(".imgbox").offsetTop-this.$(".bspan").offsetHeight/2 ;
            var e=evt || window.event;
            if(left<0) left = 0;
            if(top<0) top=0;
            if(left>this.$('.pimg').offsetWidth-this.$(".bspan").offsetWidth) left =this.$('.pimg').offsetWidth-this.$(".bspan").offsetWidth;
            if(top>this.$('.pimg').offsetHeight-this.$(".bspan").offsetHeight) top =this.$('.pimg').offsetHeight-this.$(".bspan").offsetHeight;
            this.$(".bspan").style.left=left+"px";
            this.$(".bspan").style.top=top+"px";
            
            this.$(".bimg1").style.left=-2 * left+"px";
            this.$(".bimg1").style.top=-2 * top+"px";
            
         }
        })
        this.$(".pimg").addEventListener('mouseleave',()=>{
            this.$(".bspan").style.display='none';
            this.$(".bigimg").style.display='none';
          })
   }
   jia(){
       this.$(".jia").addEventListener("click",()=>{
        let count = this.$('.c-num').value
             count++;
             if(count>1){
                 this.$(".jian").classList.remove('no');
             }
             this.$('.c-num').value=count;
       })
   }
   jian(){
    this.$(".jian").addEventListener("click",()=>{
        let count = this.$('.c-num').value
          count--;
          if(count<1){
            this.$(".jian").classList.add('no');
            layer.msg('不能再减了');
            return;
          }
          this.$('.c-num').value=count;
    })
   }
   addCart(){
       this.$('.addcart').addEventListener('click',()=>{
             let userid = this.userid;
             let goodsnum = this.$('.c-num').value;
             let imgsrc = this.$('.color-c .current').src;
             let goodsid= this.goodsid;
             console.log(userid,goodsnum,imgsrc,goodsid);
             Utils.jsonp({
                url:'http://localhost/flower/dist/api/cart.php',
                cb_name:'callback',
                data:{userid:userid,goodsnum:goodsnum,imgsrc:imgsrc,goodsid:goodsid},
                callback:(res)=>{
                    console.log(res);
                    if(res.code==1){
                        let cartnum=Utils.getCookie("cartnum");
                        cartnum=Number(cartnum)+1;
                        Utils.setCookie("cartnum",cartnum);
                        window.location.href="./cart.html";
                    }else if(res.code==2){
                        window.location.href="./cart.html";
                    }
                }
             });
            
            
       })
   }
   liji(){
    window.location.href='./pay.html';
   }
}
window.detail=new Detail();