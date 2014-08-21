// JavaScript Document
$(window).load(function() {
	
	var menu;
	
	menu = '<a href="home.html" data-ajax="false"><div class="linkMenu linkHome" > </div></a>'+
                '<a href="agenda.html" data-ajax="false"><div class="linkMenu linkAgenda" > </div></a>'+
                '<a href="blocoanotacoes.html" data-ajax="false"><div class="linkMenu linkBlocoNotas" > </div></a>'+
                '<a href="estudos.html" data-ajax="false"><div class="linkMenu linkEstudos" > </div></a>'+
                '<a href="palestrantes.html" data-ajax="false"><div class="linkMenu linkPalestrantes" > </div></a>'+
                '<a href="perguntas.html" data-ajax="false"><div class="linkMenu linkPerguntas" > </div></a>'+
                '<a href="pesquisa.html" data-ajax="false"><div class="linkMenu linkPesquisas" > </div></a>';
			
			$('#divBaseMenu').append(menu);
});
