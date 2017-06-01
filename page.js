/*
 * 将插件封装在一个闭包里面，防止外部代码污染  冲突
 */
;(function($){
	function pagination(){
        this.version='v 1.0.0';
    }
    pagination.prototype={
        construction:pagination,
        dividePage:function(currentSlip){                            //currentSlip:每个页面显示几条
            var totalSlip=data.length;                              //总条数
            var currentPage= 1;                                    //当前页面，默认为第一页
            var pageTotal= Math.ceil(totalSlip/currentSlip);      //总页数
            for(let i=1;i<=pageTotal;i++){
                li=$('<li>').appendTo($('#page'));              //动态生成li标签，加到ul标签上
                var a=$('<a>'+i+'</a>').appendTo($(li));       //动态生成a标签，加到li标签上    
                $('#page li').eq(0).addClass('active');       //第一页是默认选中状态  
            } 
            defaultPage(); 
             $('#page').on('click', 'li', getLiPage);     //点击li标签，获得当前页数
            function getLiPage(){                          //点击li标签，获得当前页数方法
			    $(this).addClass('active').siblings().removeClass('active');
			    currentPage = parseInt($(this).text());   //获取当前页码
			    goPage();
			}
			function goPage(){                           
			    var maxId=parseInt(currentPage*currentSlip);
			    var minId;
			    if(currentPage==1){
			        minId=0;
			    }else{
			        minId = parseInt((currentPage-1)*currentSlip);
			    }
		    	var result=data.slice(minId,maxId);
		    	$('#content li').empty();
		    	for(let i=0;i<result.length;i++){
		    		$('<li><a>'+result[i]+'</a></li>').appendTo($('#content'));
		    	}
		    }
		    function defaultPage(){                   //默认第一页按钮
		    	currentPage=1;
		    	let maxId=parseInt(currentPage*currentSlip);
			    let minId;
			    let result=data.slice(minId,maxId);
		    	for(let i=0;i<result.length;i++){
		    		$('<li><a>'+result[i]+'</a></li>').appendTo($('#content'));
		    	}
		    }
		    $('#pre').click(function(event){            //点击前一页按钮
			    event.preventDefault();
			    if(currentPage == 1){
			        alert('讨厌，伦家是第一页呐');
			    }else{
			        --currentPage;
			        $("#page li").removeClass('active');
			        $("#page li").eq(currentPage-1).addClass('active');
			        goPage();
			    }
			});
			$('#preAll').click(function(event){        //点击跳到首页按钮
			    event.preventDefault();
			    if(currentPage != 1){
			        currentPage = 1;
			        $("#page li").removeClass('active');
			        $('#page li').eq(0).addClass('active');
			        goPage();
			    }else if(currentPage == 1){
			    	alert('已经是第一页了');
			    } 

			});
			$('#next').click(function(){             //点击后一页按钮
			    if(currentPage == pageTotal){
			        alert('都是最后一页啦，已经被您看光光啦，木有啦~');
			    }else{
			        ++currentPage;
			        $("#page li").removeClass('active');
			        $("#page li").eq(currentPage-1).addClass('active'); //根据下标给当前页添加active类
			        goPage();
			    }
			});
			$('#nextAll').click(function(event){    //点击跳到末页按钮
			    event.preventDefault();
			    if(currentPage != pageTotal){
			        currentPage = pageTotal;
			        $("#page li").removeClass('active');
			        $('#page li').eq(currentPage-1).addClass('active');
			        goPage();
			    }else if(currentPage == pageTotal){
			    	alert('呦！您翻到了最后一页呐！！！');
			    }
	    	});
        }
    }
    var pagination = new pagination();
    pagination.dividePage(5);
})(jQuery);