import Ajax from './promise-ajax.js';
import Utils from './utils.js';
class List{
    constructor(){
        this.init();
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
                let str='';
                res.datas.pageData.forEach(ele=>{
                    let {id,cpmc,imgsrc,instro,price,sales} = ele;
                    str+=`
                    <li onclick=index.goDeatil(${id})>
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
                this.$(".f-cake-con").innerHTML=str;
                let pageStr='';
                let active = '';
                for(let i=1;i<=res.datas.pcount;i++){
                    if(i==size) active = 'class="active"';
                    else active='';
                    pageStr+=`<li ${active} onclick='list.init("${i}")'><a href="javascript:;">${i}</a></li>`;
                }
                this.$(".page-ul").innerHTML=pageStr;
            }
        })
    }
}
window.list=new List();
