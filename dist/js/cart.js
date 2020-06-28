import Ajax from './promise-ajax.js';
import Utils from './utils.js';

//渲染页面数据
class Cart{
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
            // this.$(".cartnum").innerHTML=res.datas.pcount;
            this.$('.back').addEventListener("click",()=>{
                window.location.href='./index.html';
            })
            this.size=1;
            
            this.$('.cartnum').innerHTML= Utils.getCookie("cartnum");
            window.onload=()=>{
                this.init(this.size);
                this.checkChange();
            }
            this.nextbtn();
            this.prevbtn();
    }
    $(ele){
         return document.querySelector(ele);
    }
    $$(ele){
        return document.querySelectorAll(ele);
    }
    init(size=1){
        
        Utils.jsonp({
            url:'http://localhost/flower/dist/api/cartlist.php',
            cb_name:'callback',
            data:{userid:this.userid,psize:size,num:3},
            callback:res=>{
                console.log(res);
                if(res.DataStatus==200){
                    let data = res.datas.pageData;
                    let html='';
                    data.forEach(ele=>{
                        let {goodsid,gsrc,goodsnum,cpmc,instro,lineprice,price,sales}=ele;
                        html+=`
                        <ul class="order-list">
                    <li class="selecter">
                        <input type="checkbox" name="" id="" class="check-one">
                    </li>
                    <li class="img-box"><a href="http://localhost/flower/dist/detail.html?id=${goodsid}" target="_blank"><img
                                src="${gsrc}"></a></li>
                    <li class="product">
                        <a href="http://localhost/flower/dist/detail.html?id=${goodsid}" target="_blank">
                            <span class="product-title" style="line-height:40px;">[${cpmc}]${instro}</span>
                            <span class="feature"></span>
                        </a>
                    </li>

                    <li class="market-price">
                        <span class="price-sign">¥</span>
                        <span class="price-num">
                            ${lineprice}
                        </span>
                    </li>
                    <li class="order-price">
                        <span class="price-sign">¥</span>
                        <span class="price-num" id='price-now'>
                        ${price}
                        </span>
                        <input type="hidden" name="jrPrice" value="674">
                    </li>
                    <li class="num">
                        <div class="input-num">
                            <button class="${goodsnum==1?'btn btn-default no':'btn btn-default'}"  id="lbtn-${goodsid}" onclick='cart.jian(this,${goodsid})'>-</button><input type="text" class="form-control input-sm" name="cpsl" value="${goodsnum}" maxlength="3"><button class="btn btn-default" onclick='cart.jia(this,${goodsid})'>+</button>
                        </div>
                    </li>
                    <li class="operate"><a href="javascript:void(0)" onclick='cart.del(this,${goodsid})' class="delBtn">删除</a>
                   </ul>
                        `;
                    });
                    this.$(".cart-bd").innerHTML=html; 
                    let pageStr='';
                    let active = '';
                    for(let i=1;i<=res.datas.pcount;i++){
                        if(i==size) active = 'class="active"';
                        else active='';
                        pageStr+=`<li ${active} onclick='cart.init("${i}")'><a href="javascript:;">${i}</a></li>`;
                    }
                    this.$(".page-ul").innerHTML=pageStr;
                    
                    this.cpCount();
                    this.checkChange();
                    if(size==1){
                        this.$('.prevbtn').classList.add('no');
                    }else{
                        this.$('.prevbtn').classList.remove('no');
                    }
                    if(size==res.datas.pcount){
                        this.$('.nextbtn').classList.add('no');
                    }else{
                        this.$('.nextbtn').classList.remove('no');
                    }
                }else{
                    this.$(".cart-bd").innerHTML="<h1>购物车暂时没有商品，请添加</h1>";
                    this.$('.cartnum').innerHTML=0;
                }
                
            }
        })
    }
    jia(ele,id){
        let count =ele.previousSibling.value;
        console.log(ele.previousSibling.value);
        count++;
        if(count>1){
            ele.parentNode.firstElementChild.classList.remove('no');
        }
        ele.previousSibling.value=count;
        Utils.jsonp({
            url:'http://localhost/flower/dist/api/upcart.php',
            cb_name:'callback1',
            data:{foo:'update',goodsid:id,goodsnum:count},
            callback:res=>{
                console.log(res);
            }
        });
        this.cpCount();
    }
    jian(ele,id){
        let count = ele.nextSibling.value;
        count--;
        if(count<1){
            ele.classList.add('no');
            layer.msg('不能再减了');
            return;
        }
        ele.nextSibling.value=count;
        Utils.jsonp({
            url:'http://localhost/flower/dist/api/upcart.php',
            cb_name:'callback1',
            data:{foo:'update',goodsid:id,goodsnum:count},
            callback:res=>{
                console.log(res);
            }
        });
        this.cpCount();
    }
    del(ele,id){
        let trObj =  ele.parentNode.parentNode
        let checkthis = trObj.querySelector(".check-one");
        trObj.remove();
        Utils.jsonp({
            url:'http://localhost/flower/dist/api/upcart.php',
            cb_name:'callback',
            data:{foo:'del',goodsid:id},
            callback:res=>{
                console.log(res);
                if(res.code==1){
                    layer.msg(res.msg);
                }
            }
        });
        if(checkthis.checked){
            this.cpCount();
        }
        this.con--;
        let checkOne=this.$$(".check-one");
        this.len = checkOne.length;
        this.init(this.size);
        let cartnum=Utils.getCookie("cartnum");
        cartnum=Number(cartnum)-1;
        Utils.setCookie("cartnum",cartnum);
        this.$('.cartnum').innerHTML= Utils.getCookie("cartnum");
    }
    checkChange(){
        this.checkAll=this.$(".check-all");
        this.checkAll.checked=false;
        this.checkOne=this.$$(".check-one");
        this.checkAll.addEventListener("change",this.changefn());
        this.len = this.checkOne.length;
        this.con = 0;
        this.checkOne.forEach(eleone=>{
            let _this=this;
            eleone.addEventListener("change",function(){
                console.log(this,_this);
                if(this.checked){
                    _this.con++;
                }else{
                    _this.con--;
                }
                if(_this.con == _this.len){
                        _this.checkAll.checked=true;
                }else{
                        _this.checkAll.checked=false;
                }
                _this.cpCount();
            })
            
        })
    }
    changefn(){
        let _this=this;
        return function(){
            console.log(this);
            _this.checkAll.checked=this.checked;
            if(this.checked){
                _this.checkOne.forEach(eleone=>{
                    eleone.checked=true;
                })
                _this.con=_this.len;
            }else{
                _this.checkOne.forEach(eleone=>{
                    eleone.checked=false;
                })
                _this.con=0;
            }
            _this.cpCount();
        }
        
    }
    cpCount(){
        let checkOne=this.$$(".check-one");
        let couNum = 0;
        let totalPrice = 0;
        checkOne.forEach(ele=>{
            if(ele.checked){
                 let parents = ele.parentNode.parentNode;
                 let price = parents.querySelector("#price-now").innerHTML;
                 let num = parents.querySelector(".input-sm").value;
                 couNum = num - 0 + couNum;
                 totalPrice += price * num;
            }
        })
        // $("#selectedTotal").innerHTML=couNum;
        this.$("#priceTotal").innerHTML=totalPrice.toFixed(2);
     }
     nextbtn(){
         this.$('.nextbtn').addEventListener('click',()=>{
            this.$('.prevbtn').classList.remove('no');
            console.log(this.$('.active').children[0].innerHTML);
            this.size=this.$('.active').children[0].innerHTML;
            this.size++;
            this.init(this.size);
            if(this.size==this.$(".page-ul").children.length){
                this.$('.nextbtn').classList.add('no');
                return;
            }
           
         })
     }
     prevbtn(){
        this.$('.prevbtn').addEventListener('click',()=>{
            this.$('.nextbtn').classList.remove('no');
            console.log(this.$('.active').children[0].innerHTML);
            this.size=this.$('.active').children[0].innerHTML;
            this.size--;
            this.init(this.size);
            if(this.size==1){
                this.$('.prevbtn').classList.add('no');
                return;
            }
         })
     }
     jies(){
         if(this.$("#priceTotal").innerHTML!=0){
            window.location.href='./pay.html';
         }else{
            layer.msg('请勾选要结算的商品');
             return;
         }
        
     }
}
window.cart=new Cart();