/**
 * Created by user on 2017/5/18.
 */

import $ from "jquery"
/*
 * 腾讯股票代理接口
 * $.post("http://localhost/crawler", {targetUrl:"http://web.sqt.gtimg.cn/q=sz000002"}, function(json){console.log(json)})
 *  param targetUrl 所要请求的url
 *        callBack ajax回掉函数
 *  result suc/data/msg
 *         是否成功/腾讯返回的字符串/错误msg
 * */
//var ctx = 'http://api.cj.91elc.com';
const baseImgUrl = 'http://cj.91elc.com/upload/source';

function postTX(targetUrl,callBack){
    $.post(ctx + "/crawler", {targetUrl:targetUrl}, function(ret){
        //console.log(ret);
        if(ret.suc){
            callBack(ret.data);
        }
    });
}

/*
 * 腾讯股票接口-行情数据
 * http://web.sqt.gtimg.cn/q=sz000001
 * param codeArr = "sz000001" 股票代码 | ['sz000001','sz000002','sz000001'] 多组股票数组
 *       callBack 回掉函数
 * 注：单个查询参数q=sz000001，多个查询q=s_sz000001,s_sh601766,s_sz002506
 * */
function getDataFromTX(codeArr , callBack) {
    if(codeArr){
        var code = "";
        if((typeof codeArr=='string')&&codeArr.constructor==String){
            code = codeArr
        }else if((typeof codeArr=='object')&&codeArr.constructor==Array){
            for(var i = 0; i < codeArr.length; i++){
                code += 's_'+ codeArr[i] + ',';
            }
        }else{
            console.error("Wrong code format!")
        }
        // $.get("http://web.sqt.gtimg.cn/q="+code,function(ret){
        //     //console.log(ret)
        //     if (ret.length>22) {//请求出错会显示v_pv_none_match="1"或其他
        //         callBack(ret);
        //     }
        // });
        postTX("http://web.sqt.gtimg.cn/q="+code,function(ret){
            //console.log(ret)
            if (ret.length>22) {//请求出错会显示v_pv_none_match="1"或其他
                callBack(ret);
            }
        });
    }
}

//输入框的输入和清空
$('.form-input input').on('keyup',function(){
    var $this=$(this),icon=$(this).parent().find('.form-input-close');
    if($this.val()==''){
        $(icon).hide();//清空按钮
    }
    else{
        if($(icon).is(":hidden")){
            icon.show();
        }
    }
})
$('.form-input-close').on('click',function(){
    $(this).hide();//清空按钮隐藏
    $(this).parent().find('input').val('');//清空输入框
})


//全选、全不选、反选
$.fn.extend({
    check:function(){
        return this.each(function(){
            this.checked = true;
        })
    },
    uncheck:function(){
        return this.each(function(){
            this.checked = false;
        })
    },
    inverseCheck:function(){
        return this.each(function(){
            this.checked = !this.checked;
        })
    }
})
