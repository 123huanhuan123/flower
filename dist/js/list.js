import Ajax from './promise-ajax.js';
import Utils from './utils.js';
class List{
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
        this.$('.cartnum').innerHTML= Utils.getCookie("cartnum");
        this.size=1; 
        window.onscroll=this.onScroll.bind(this);
        var serArr = window.location.search.split('=');
        this.goodsval=serArr[1];
        this.keywordSel();
        this.init();
        this.$('.search-box-input').onkeyup=(evt)=>{
          let e = evt||window.event;
          let keycode = e.keyCode||e.which;
          if(keycode==13){
              this.submit();
          }
        }
    }
    $(ele){
        return document.querySelector(ele);
    }
    $$(ele){
        return document.querySelectorAll(ele);
    }
    init(size=1){
        if(this.goodsval){
            return;
        }
        Utils.jsonp({
            url:'http://localhost/flower/dist/api/list.php',
            cb_name:'callback',
            data:{psize:size,num:10},
            callback:res=>{
                if(res.DataStatus==200){
                    this.pcount=res.datas.pcount;
                    let str='';
                    res.datas.pageData.forEach(ele=>{
                        let {id,cpmc,imgsrc,instro,price,sales} = ele;
                        str+=`
                        <li class="goodsCon" onclick=list.goDeatil(${id})>
                        <a href="javascript:;">
                            <div class="img">
                               <img src="${imgsrc}" alt="">
                            </div>
                            <div class="c-r-content">
                                <p class="c-r-content-title">${cpmc}/${instro}</p>
                                <p class="c-r-content-price"><span>¥</span><span>${price}</span></p>
                                <p class="c-r-content-sell">已售 ${sales} 件</p>
                            </div>
                        </a>
                    </li>
                        `
                    })
                    this.$(".f-cake-con").innerHTML+=str;
                }
                
            }
        })
    }
    getScTop(){
        return window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
      }
      geClient(){
        return {
          h:window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight,
          w:window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth
        }
      }
      onScroll(){
        //获取内容的高度
        let ct = this.$$('.goodsCon')[this.$$('.goodsCon').length-1].offsetTop;
        let st = this.getScTop();
        let clientTop = this.geClient().h;
    
        //内容的高度<可视区的高度+滚动条的高度，就需要从新加载数据
        if(ct<(st+clientTop)){
        if(this.size==this.pcount){
            this.$('.tip').style.display='block';
            return false;
        }
         this.size++;
         console.log(this.pcount,this.size);
         this.init(this.size);
        }
      }
      goDeatil(id){
        console.log(id);
        window.location.href='./detail.html?id='+id;
    }
    keywordSel(){
        if(this.goodsval){
            window.onscroll=null;
            this.goodsval = decodeURIComponent( this.goodsval);
            this.$('.search-box-input').value=this.goodsval;
            this.$(".title-f").innerHTML=this.goodsval;
            Utils.jsonp({
                url:'http://localhost/flower/dist/api/select.php',
                cb_name:'callback1',
                data:{keyword:this.goodsval},
                callback:res=>{
                    console.log(res);
                    if(res.DataStatus==200){
                        let str='';
                        res.datas.forEach(ele=>{
                            let {id,cpmc,imgsrc,instro,price,sales} = ele;
                            str+=`
                            <li class="goodsCon" onclick=list.goDeatil(${id})>
                            <a href="javascript:;">
                                <div class="img">
                                   <img src="${imgsrc}" alt="">
                                </div>
                                <div class="c-r-content">
                                    <p class="c-r-content-title">${cpmc}/${instro}</p>
                                    <p class="c-r-content-price"><span>¥</span><span>${price}</span></p>
                                    <p class="c-r-content-sell">已售 ${sales} 件</p>
                                </div>
                            </a>
                        </li>
                            `
                        })
                        this.$(".f-cake-con").innerHTML+=str;
                    }else if(res.DataStatus==500){
                        this.$(".f-cake-con").innerHTML="<h1>暂时没有改类商品哦~</h1>";
                        layer.msg(res.errmsg,{
                            time:2000
                        },()=>{
                            setTimeout(()=>{
                               window.location.href='./list.html';
                            },1000)
                        });
                        
                       
                    }
                }
            })
        }else{
            this.$('.search-box-input').value="";
            
        }
    }
    submit(){
        let val = this.$('.search-box-input').value;
        val = encodeURIComponent(val);
        window.location.href='./list.html?val='+val;
    }
}
window.list=new List();
