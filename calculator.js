$(document).ready(function(){
	$(".showArea p").empty();
  $(".calculator .list").after("<div class='temp'></div>");
  
  clickItem();
  
});
 
function clickItem(){
	var numberA;
	var numberB;
	var operator;
	var lastNo;
	var beforeLast;
	//var total;
  
  	$("li.number").click(function(){
      	numberA = $(this).text();
		  if($(".showArea").hasClass('one') == true){
			$(".showNo").empty();
			$(".showArea").removeClass('one');
		  }
		  switch(numberA){
			case '.':
			  $(".showNo").addClass('dot');
			  if($(".showNo").html() == ""){
				$(".showNo").append("0.")
			  }else{
				$(".showNo").append(numberA);
			  }
			break;
			case '%':
			  numberA = parseFloat($(".showNo").html())*0.01;
			  $(".showNo").empty().append(numberA);
			break;
			default:
			  $(".showNo").append(numberA);
			break;
		  }
		  if($(".output .number").length >= 1){
			$(".calculator").addClass("hasTotal");
		  }
  	})
  
	$("li.operator").click(function(){
		var tempTotal;
		$(".showArea").addClass("one");
		$(".showNo").removeClass("dot");
		var showOperator = $(this).text();

		if($("showNo").hasClass("hasDot") == true){
			var tempNumberB = $(".showNo").text();
			numberB = tempNumberB.replace(",", "");
		  }else{
			numberB = $(".showNo").text();
		  }

      	if($(".calculator").hasClass("hasTotal") == false){
			switch($(".output .number").length){
			  case 0:
				lastNo = numberB;
				beforeLast;
				operator = $(this).text();
				OperatorArea(operator,lastNo,beforeLast);
				$(".output").append('<b class="number">'+numberB+'</b><b class="operator">'+showOperator+'</b>');
				$(".temp b").html(numberB);
				$(".showNo").html(tempNumberB);
			  break;
			  case 1:
				lastNo = numberB;
				beforeLast = tempTotal;;
				operator = $(".output .operator").last().text();
				OperatorArea(operator,lastNo,beforeLast);
				$(".output").append('<b class="number">'+numberB+'</b><b class="operator">'+showOperator+'</b>');
			  break;
			}
      	}else{
			tempTotal = $(".temp b").html();
			operator = $(".output .operator").last().html();
			lastNo = tempTotal;
			OperatorArea(operator,lastNo,beforeLast);
			$(".output").append('<b class="number">'+numberB+'</b><b class="operator">'+showOperator+'</b>');
      	}
        
		function OperatorArea(operator){
			//var total;
			switch(operator){
			  case '/':
			  total = parseFloat(lastNo)/parseFloat(beforeLast);
			  break;
			  case 'X':
			  total = parseFloat(lastNo)*parseFloat(beforeLast);
			  break;
			  case '-':
			  total = parseFloat(lastNo)-parseFloat(beforeLast);
			  break;
			  case '+':
			  total = parseFloat(lastNo)+parseFloat(beforeLast);
			alert(total);
			  break;
			}
			  $(".showNo").empty().append(total);
			  tempTotal = $(".showNo").html();
			  $(".temp").empty().append('<tempTotal:<b class="tempNo">'+tempTotal+'</b>');
		}
    
		$("li.equal").click(function(){
			$(".showNo").removeClass("dot");
				switch($(".temp").hasClass("loop")){
					case false:
						$(".temp").addClass("loop");
						operator = $(".output .operator").last().html();
						lastNo = $(".showNo").text();
						beforeLast = $(".temp b").html();
						$(".output").append('<b class="number">'+lastNo+'</b>')
						OperatorArea(operator,lastNo,beforeLast);
						$(".temp").addClass("loop").append('/ lastNumber:<b class="lastNumber">'+lastNo+'</b>');
					break;
					case true:
						operator = $(".output .operator").last().html();
						lastNo = tempTotal;
						beforeLast = $(".output .number").last().html();
						OperatorArea(operator,lastNo,beforeLast);
						$(".output").append('/ lastNumber:<b class="lastNumber">'+beforeLast+'</b>');
					break;
				}
		  return;
		});
  
		$("li.back").click(function(){
			var textA = $(".showNo").html();
			var textALength = $(".showNo").html().length;
			$(".showNo").empty().append(textA.substring(0, textALength - 1));
		});
  
		$("li.clean").click(function(){
			$(".calculator").removeClass("hasTotal");
			$(".showArea").removeClass("one");
			$(".showArea p").empty();
			$(".temp").empty().removeClass("loop");
		});
  
	})

}
