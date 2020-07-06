import Utils from './utils.js';
class Login{
    constructor(){
        this.$("#btn_login").addEventListener('click',this.loginEvt.bind(this));
    }
    $(ele){
        return document.querySelector(ele);
    }
    loginEvt(){
        let phone=this.$("#phone").value;
        let pwd=this.$("#pwd").value;
        if(phone==''){
            layer.tips('手机号不能为空！', '#phone');
            return;
        }else{
            var reg= /^1[3-9]\d{9}$/;
            if(!reg.test(this.$("#phone").value)){
                layer.tips('请输入正确格式的手机号', '#phone');
                // alert("请输入正确格式的手机号");
                return;
            }
        }
        if(pwd==''){
            layer.tips('密码不能为空！', '#pwd');
            return;
        }
        Utils.ajax({
            type:"post",
            url:"./api/login.php",
            data:{phone,pwd},
            dataType:'json'
        }).then(res=>{
            console.log(res);
            if(res.code==1){
                //存cookie
                let userObj = {
                    username:res.data.username,
                    userid:res.data.id
                }
                Utils.setCookie('userdata',JSON.stringify(userObj));
                layer.msg(res.msg+'即将进入首页',{
                    time:2000
                },function(){
                    setTimeout(function(){
                        location.href='./index.html';
                    },1000)
                });
               
            }else{
                console.log(1);
                layer.msg(res.msg,{
                    time:2000
                });
            }
        })
        
    }
}
new Login();