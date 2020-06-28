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
}


