import Utils from './utils.js';
class Reg{
    constructor(){
        this.$("#reg_btn").addEventListener('click',this.regEvt.bind(this));
    }
    $(ele){
        return document.querySelector(ele);
    }
    regEvt(){
        let username=this.$("#username").value;
        let phone=this.$("#phone").value;
        let email=this.$("#email").value;
        let pwd=this.$("#pwd").value;
        let yzm = this.$('#yzm').value;
        if(username==''){
            layer.tips('用户名不能为空！', '#username');
            // layer.msg('用户名不能为空！');
            // alert("");
            return;
        }
        if(phone==''){
            // alert("手机号不能为空！");
            layer.tips('手机号不能为空！', '#phone');
            return;
        }else{
            var reg= /^1[3-9]\d{9}$/;
            if(!reg.test(this.$("#phone").value)){
                layer.tips('请输入正确格式的手机号！', '#phone');
                // alert("");
                return;
            }
        }
        if(email==''){
            layer.tips('邮箱不能为空！', '#email');
            // alert("");
            return;
        }else{
            var reg=/^[0-9a-z]\w+@[0-9a-z]+\.[0-9a-z]+$/i;
            if(!reg.test(this.$("#email").value)){
                // alert("请输入正确格式的邮箱");
                layer.tips('请输入正确格式的邮箱', '#email');
                this.$("#email").blur();
                return;
            }
        }
        if(pwd==''){
            layer.tips('密码不能为空！', '#pwd');
            // alert("密码不能为空！");
            return;
        }
        if(yzm==''){
            // alert("验证码不能为空！");
            layer.tips('验证码不能为空！', '#yzm');
            return;
        }
        Utils.ajax({
            type:"post",
            url:"http://localhost/flower/dist/api/reg.php",
            data:{username,phone,email,pwd},
            dataType:'json'
        }).then(res=>{
            console.log(res);
            if(res.code===1){
                
                layer.msg(res.msg+'注册成功即将进入登录页！',{
                    time:2000
                },function(){
                    setTimeout(function(){
                        location.href='./login.html';
                    },1000)
                });
            }else{
                layer.msg(res.msg,{
                    time:2000
                });
            }
        })
        
    }
}
new Reg();