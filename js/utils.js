export default class Axios{
    static xhr=new XMLHttpRequest();
    static get(url,data){
        console.log(url,data);
        let str="?";
        if(data){
            for(let key in data){
               str+=key+"="+data[key]+"&";
            }
            str = str.slice(0,-1);
        }
        return new Promise(function(resolve,reject){
            console.log(str);
            Axios.xhr.open("get",url+str);
            Axios.xhr.send();
            Axios.xhr.addEventListener("readystatechange",changeFn);
            function changeFn(){
                if(Axios.xhr.readyState==4){
                    if(Axios.xhr.status==200){
                        resolve(Axios.xhr.response);
                    }else{
                        reject("请求失败,状态码为："+Axios.xhr.status);
                    }
                 }
            }
        })
        
    }
    static post(url,data){
        console.log(url,data);
        let str="?";
        if(data){
            for(let key in data){
              str+=key+"="+data[key]+"&";
            }
            str = str.slice(1,-1); 
        }
        return new Promise(function(resolve,reject){
            Axios.xhr.open("post",url);
            Axios.xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
            Axios.xhr.send(str);
            Axios.xhr.addEventListener("readystatechange",changeFn);
            function changeFn(){
                if(Axios.xhr.readyState==4){
                    if(Axios.xhr.status==200){
                        resolve(Axios.xhr.response);
                    }else{
                        reject("请求失败,状态码为："+Axios.xhr.status);
                    }
                 }
            }
        })
    }
    /**
     * 
     * @param {type,url,data,dataType}
     */
    static ajax(param){
        let str="?";
        for(let key in param.data){
            str+=key+"="+param.data[key]+"&";
        }
        //判断为param.type为post的时候
        if(param.type=='post'){
            str = str.slice(1,-1);
            param.data=str;
        }else if(param.type=='get'){//判断为param.type为get的时候
            str = str.slice(0,-1);
            param.url=param.url+str;
            param.data=null;
        }
        return new Promise(function(resolve,reject){
            Axios.xhr.open(param.type,param.url);
            Axios.xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
            Axios.xhr.send(param.data);
            Axios.xhr.addEventListener("readystatechange",changeFn);
            function changeFn(){
                if(Axios.xhr.readyState==4){
                    if(Axios.xhr.status==200){
                        let res=Axios.xhr.response;
                        if(param.dataType=="json"){
                            resolve(JSON.parse(res));
                        }else{
                            resolve(res);
                        }
                    }else{
                        reject("请求失败,状态码为："+Axios.xhr.status);
                    }
                }
            }
        })

    }
    static setCookie(name,val,exp=0){
        // 没有name,或者val就终止程序；
        if(!name||!val) return;
        //时间的处理
        if(exp){
         let d=new Date();
         let t = d.getTime();
         d.setTime(t+1*1000*60*exp);
         exp=d.toGMTString();
        }
    //设置cookie
    document.cookie=name+"="+val+";expires="+exp+"path=/";
    }
    static getCookie(name){
        // 没有name,就终止程序；
        if(!name) return;
        let cookies=document.cookie;
        // console.log(cookies);
        //将字符串分割为数组
        cookies=cookies.split("; ");
        // console.log(cookies);
        //保存取到的值
        let val='';
        cookies.forEach(item => {
            let res = item.indexOf(name);
            if(res!=-1){
                // console.log(item);
                val = item.split("=")[1];
                // console.log(val);
            }
        });
        return val;
    }
    static ajax1(param){
        let str="?";
        for(let key in param.data){
            str+=key+"="+param.data[key]+"&";
        }
        //判断为param.type为post的时候
        if(param.type=='post'){
            str = str.slice(1,-1);
            param.data=str;
        }else if(param.type=='get'){//判断为param.type为get的时候
            str = str.slice(0,-1);
            param.url=param.url+str;
            param.data=null;
        }
        Axios.xhr.open(param.type,param.url);
        Axios.xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        Axios.xhr.send(param.data);
        Axios.xhr.addEventListener("readystatechange",changeFn);
        function changeFn(){
            if(Axios.xhr.readyState==4){
                if(Axios.xhr.status==200){
                    let res=Axios.xhr.response;
                    if(param.dataType=="json"){
                        param.callback(JSON.parse(res));
                    }else{
                        param.callback(res);
                    }
                }else{
                    alert("请求失败,状态码为："+Axios.xhr.status);
                }
             }
        }
    }
    static jsonp(param){
        let fn="glo"+param.cb_name;
        let str="?"+param.cb_name+"="+fn;
        param.data=param.data||{};
        for(let key in param.data){
            str+="&"+key+"="+param.data[key];
        }
        let script = document.createElement("script");
        script.src=param.url+str;
        document.head.appendChild(script);
        document.head.removeChild(script);
        window[fn] = res =>{
            param.callback(res);
        }
    }
}


