import Ajax from './promise-ajax.js';
import Utils from './utils.js';
class List{
    constructor(){
        let userdata=Utils.getCookie('userdata')
        this.str=JSON.parse(userdata);
        this.$('#username').innerHTML=this.str.username;
        this.userid=this.str.userid;
        console.log(this.userid);
        this.init();
        this.size=1;
        window.onscroll=this.onScroll.bind(this);
    }
    $(ele){
        return document.querySelector(ele);
    }
    $$(ele){
        return document.querySelectorAll(ele);
    }
    init(size=1){
        Utils.jsonp({
            url:'http://localhost/flower/dist/api/list.php',
            cb_name:'callback',
            data:{psize:size,num:10},
            callback:res=>{
                console.log(res.datas.pageData);
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
            return false;
        }
         this.size++;
         console.log(this.pcount,this.size);
         this.init(this.size);
        }
      }
      goDeatil(id){
        console.log(id);
        window.location.href='http://localhost/flower/dist/detail.html?id='+id;
    }
}
window.list=new List();
