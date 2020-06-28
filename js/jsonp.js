export default class Jsonp{
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