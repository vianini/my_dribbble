var pagina = 1 ;
$(document).ready(function () {
	$.jribbble.setToken('4f4755251029a14648380a605156ba03d2ab7ab02096e07daf0134bf193cdf59');
	
	$("#shots").click(function (event) {
		$("#filtro").show();
		$("#navigation").show();
		$("#shotsresult").hide();
        consultar();
    });
	
	$("#consultar").click(function (event) {
		$("#shotsresult").hide();
        consultar();
    });
	
	$("#prev").click(function (event) {
		pagina--;
		$("#shotsresult").hide();
        consultar();
    });
	
	$("#next").click(function (event) {
		pagina++;
		$("#shotsresult").hide();
        consultar();
    });
	
	$("#menos").click(function (event) {
		var	tamanho = $(".shots--shot").css("width");
		tamanho = parseInt(tamanho.replace("px","")) - 10;
		$(".shots--shot").css({ 'width':tamanho+"px"});
		
		$(".img_my").css({ 'width':tamanho+"px"});
		
		tamanho= $(".img_my").css("width");
		tamanho = parseInt(tamanho.replace("px","")) + 10;
		$(".img_my").css({ 'width':tamanho+"px"});
		
		
    });
	
	$("#mais").click(function (event) {
		var	tamanho = $(".shots--shot").css("width");
		tamanho = parseInt(tamanho.replace("px","")) + 10;
		$(".shots--shot").css({ 'width':tamanho+"px"});
		
		tamanho= $(".img_my").css("width");
		tamanho = parseInt(tamanho.replace("px","")) + 10;
		$(".img_my").css({ 'width':tamanho+"px"});
    });
	
	
});

function consultar() {

	
	$.ajax({
		url: "https://api.dribbble.com/v1/shots",
		type: 'GET',
		raditional: true,
		data: { access_token: "95f5bea80223dc345a9178c705df8827e15be5cb517658181beea0e28f5b358d", per_page:40, page: pagina },
		beforeSend: function () {
			 $("#loading").show();	
		},
		success: function (data, textStatus, request) {
			var link_prev = request.getResponseHeader('link');
			if (link_prev.includes("prev") && link_prev.includes("next")){
				$("#prev").show();
				$("#next").show();
				$("#zoom").show();
				
				
			}
			if (link_prev.includes("prev")== true  && link_prev.includes("next") == false){
				$("#prev").show();
				$("#next").hide();
				$("#zoom").show();				
			}
			if ( link_prev.includes("prev")== false  && link_prev.includes("next") == true){
				$("#prev").hide();
				$("#next").show();
				$("#zoom").show();		
			}
			
			var html = "";
			
			$.each(data, function( index, value ) {
				if( value.title.includes( $("#txtfiltro").val() ) ){
					html += "<div class=\"shots--shot thumbnail inner-border\"> ";
					html += "<div class=\"caption\">"+value.title.substring(0, 20)+"</div>"; 
					html += "<img class=\"img_my\" src=\""+ value.images.teaser+"\"/>";
					html += "<div class=\"caption\"><span id=\" "+value.id +"\"  style=\"cursor:pointer\" class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span></div>"; 
					html += "</div>";
				}	
		
					
			}); 
			
		
			
			$("#shotsresult").html(html);
			
		    $(".glyphicon").click(function (event) {
				var id = this;
				$.ajax({
					url: "https://api.dribbble.com/v1/shots/"+this.id+"/like" ,
					type: 'POST',
					data: { access_token: "95f5bea80223dc345a9178c705df8827e15be5cb517658181beea0e28f5b358d"},
					raditional: true,
					success: function (data) {
						$(id).css({ 'color': "blue" });
					
					}
				});	
				
				
			});
			$("#shotsresult").show();	
			$("#loading").hide();	
		
		}
	});		
		
	

} 



