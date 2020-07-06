import Ajax from './promise-ajax.js';
import Utils from './utils.js';
//渲染页面数据
class Index{
    constructor(){
        this.banner();
        let userdata=Utils.getCookie('userdata')
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
        this.userid = this.str.userid;
        this.init();
        window.onscroll=this.wscroll.bind(this);
    }
    $(ele){
         return document.querySelector(ele);
    }
    $$(ele){
        return document.querySelectorAll(ele);
    }
    init(){
        Utils.jsonp({
            url:'./api/index.php',
            data:{userid:this.userid},
            cb_name:'callback',
            callback:(res)=>{
                console.log(res);
                if(res.DataStatus==200){
                Utils.setCookie('cartnum',res.datas.cartnum);
                
                let data = res.datas.datainfo;
                //爱情鲜花页面渲染
                let loveData = data.slice(0,10);
                console.log(loveData);
                let str = '';
                loveData.forEach(ele=>{
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
                this.$(".lover-f").innerHTML=str;
                 //长辈鲜花页面渲染
                let faterData = data.slice(10,20);
                let str1 = '';
                faterData.forEach(ele=>{
                    let {id,cpmc,imgsrc,instro,price,sales} = ele;
                    str1+=`
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
                this.$(".fater-f").innerHTML=str1;
                //送女友
                let girlData = data.slice(40,50);
                let str2 = '';
                girlData.forEach(ele=>{
                    let {id,cpmc,imgsrc,instro,price,sales} = ele;
                    str2+=`
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
                this.$(".girl-f").innerHTML=str2;
                //送儿童
                let childData = data.slice(21,26);
                let str3 = '';
                childData.forEach(ele=>{
                    let {id,cpmc,imgsrc,instro,price,sales} = ele;
                    str3+=`
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
                this.$(".child-f").innerHTML=str3;    
                //礼品
                let allData = data.slice(26,36);
                let str4 = '';
                allData.forEach(ele=>{
                    let {id,cpmc,imgsrc,instro,price,sales} = ele;
                    str4+=`
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
                this.$(".alldata").innerHTML=str4;    
                this.$('.cartnum').innerHTML= Utils.getCookie("cartnum");
                this.$('.cartnum1').innerHTML= Utils.getCookie("cartnum");
            }else{
                return;
            }
            }
        })
    }
    banner(){
        this.index=0;
        this.lastindex=this.$$('.banner-con ul li').length-1;
        // this.indexChange();
        let timer=null;
        this.$$('.banner-con ol li').forEach((ele,index)=>{
            
            ele.addEventListener('mouseenter',()=>{
                clearInterval(timer);
                this.lastindex=this.index;
                this.index=index;
                this.indexChange();
            })
        })
        this.$('.a_left').addEventListener('click',this.leftbtn.bind(this));
        this.$('.a_right').addEventListener('click',this.rightbtn.bind(this));
        clearInterval(timer);
        timer=setInterval(() => {
            this.rightbtn();
        }, 3000);
        this.$('.banner-con').addEventListener('mouseenter',()=>{
            clearInterval(timer);
            this.$$('.a_btn')[0].style.display='block';
            this.$$('.a_btn')[1].style.display='block';
        });
        this.$('.banner-con').addEventListener('mouseleave',()=>{
            timer=setInterval(() => {
                this.rightbtn();
            }, 3000);
            this.$$('.a_btn')[0].style.display='none';
            this.$$('.a_btn')[1].style.display='none';
        });
       
    }
    indexChange(){
        this.$$('.banner-con ul li')[this.index].classList.add('active');
        this.$$('.banner-con ul li')[this.lastindex].classList.remove('active');
        this.$$('.banner-con ol li')[this.index].classList.add('active');
        this.$$('.banner-con ol li')[this.lastindex].classList.remove('active');
    }
    rightbtn(){
            this.lastindex=this.index;
            this.index++;
            if(this.index==this.$$('.banner-con ul li').length){
                this.index=0;
            }
            this.indexChange();
    }
    leftbtn(){
        this.lastindex=this.index;
        this.index--;
        if(this.index<0){
            this.index=this.$$('.banner-con ul li').length-1;
        }
        this.indexChange();
    }
    goDeatil(id){
        console.log(id);
        window.location.href='./detail.html?id='+id;
    }
    getScTop(){
        return window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
    }
    wscroll(){
        let ct = this.$('.banner').offsetTop;
        let st = this.getScTop();
        if(st>=ct){
            console.log(1);
            this.$('.fixed-head').style.display='block';
            this.$('.ct-btn').style.display='block';
        }else{
            console.log(2);
            this.$('.fixed-head').style.display='none';
            this.$('.ct-btn').style.display='none';
        }
        this.$(".last").addEventListener('click',()=>{
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
    }
    submit(){
        let val = this.$('.search-box-input').value;
        val = encodeURIComponent(val);
        window.location.href='./list.html?val='+val;
    }
}
window.index=new Index();