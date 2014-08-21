
    
    document.addEventListener('deviceready', onDeviceReady, false);
    
    function onDeviceReady(){
        
        var connect = new AntsConnectDb();
        connect.handleConnect();
        
        var user = new AntsGetUserSQLLite();
        user.handleGetUser();
    
        
        db.transaction(handleStartDbAgendaSuccess, handleStartDbAgendaError);
    
        
    }
    
    function handleSetUserData()
    {
        dadosParticipantes;
    }
    
    
    //-- handleStartDbAgendaSuccess
    function handleStartDbAgendaSuccess(tx, result){
           
            var sql = 'select * from tb_agenda a, tb_agenda_horario b '+ 
                      ' WHERE a.agendaAgendaHorarioId = b.agenda_horarioId '+
                      ' ORDER by a.agendaId ASC';
            tx.executeSql(sql, [], handleSelectAgendaSuccess, handleStartDbAgendaError);
    }

    function handleSelectAgendaSuccess(tx, result){
        var diaId;
	var id;
	var numItens = result.rows.length;
	var arrIds = Array();
        
         
	 handleGetAgenda()
        
		function handleGetAgenda()
		{
			if(countItens < numItens)
			{
				
                            var employee = result.rows.item(countItens);
                            diaId = employee.agendaAgendaDiaId;
                           
                            $('#ulAgenda'+diaId).append('<li data-role="list-divider" style="background-color: #0088bb;color: #fff;">'+employee.agenda_horarioHora+': '+employee.agendaTitulo+'</li>');
                          
                                    $('#ulAgenda'+diaId)
                                    .append(
                                    '<li data-theme="c"><p><strong>Descri&ccedil;&atilde;o: </strong><em>'+employee.agendaDescricao+'</em></p>'+
                                    '</a></li>');
                           

                            id = employee.agendaId;
                            
                            
                            db.transaction(handleStartDbPalestrantesSuccess, handleStartDbAgendaError);
                            
                            function handleStartDbPalestrantesSuccess(tx, result) {
                                    //alert('Num Itens: '+id);
                                    var sql = "select * from tb_agenda a, tb_palestrantes b, tb_agenda_palestrantes c "+
                                                            " where a.agendaId = c.agenda_palestrantesAgendaId AND c.agenda_palestrantesAgendaId = "+id+" AND "+
                                                            " b.palestrantesId = c.agenda_palestrantesPalestrantesId "+
                                                            " OR b.palestrantesId != null ORDER by b.palestrantesId ASC";

                                    tx.executeSql(sql, [], handleSetPalestrantesSuccess, handleStartDbAgendaError);
                            }
                            countItens++;
                            $('#ulAgenda'+diaId).listview('refresh');
			}
		}
		
	
			
			
			function handleStartDbAgendaError(tx, result)
			{
				
				//alert('Falha ao carregar os palestrantes!');
                                handleGetAgenda()
			}
	
			function handleSetPalestrantesSuccess(tx, result)
			{
				var countItens2 = 0;
				
				var numItens2 = result.rows.length;
				var palestrantesNome = '';
				var tipo = 0;
				var descricao = '';
				
				while(countItens2 < numItens2)
				{
					var employee2 = result.rows.item(countItens2);
					tipo = employee2.palestrasTipo;
					descricao = employee2.agendaDescricao;
					palestrantesNome += employee2.palestrantesNome+', ';
					//alert('COUNT: '+employee2.palestrasTipo);
					
					
					countItens2++;
				}
				
				if(tipo == 2)
					{
						$('#ulAgenda'+diaId)
						.append('<li data-theme="c"><p><em>'+descricao+'</em></p></li>');
					}
					else if(tipo == 3)
					{
						$('#ulAgenda'+diaId)
						.append('<li data-theme="c"><p><em>'+descricao+'</em></p>'+
						'<p><b>Palestrante(s): </b>'+palestrantesNome+'</p></li>');
					}
					else
					{
						
						$('#ulAgenda'+diaId)
						.append('<li data-theme="c"><a href="#" onclick="handleGetDetalhesAgenda('+employee2.agendaId+')" data-transition="slide">'+
						'<p><b>Palestrante(s): </b>'+palestrantesNome+'</p>'+
						'</a></li>');
					}
					$('#ulAgenda'+diaId).listview('refresh');
					
					
			handleGetAgenda()
			}
	//handleBuscaPalestrantes(id);
	
	
			
	$('#ulAgenda'+employee.agendaAgendaDiaId).listview('refresh');
	
	//StateMachineNotas('handleGetDadosNotas');
}

    
    function handleGetDetalhesAgenda(strId)
    {
       
	//userId = strId;
	
        
        
	$('#ulPalestrantes').empty();
        $('#ulAnotacoes').empty();
        
	$.mobile.changePage( "#page-descricao-agenda", { transition: "slide"});
	
	$("#textPageDetalhe").html('Detalhes da Aula');
	
	
	
	db.transaction(DbDetalhesAgendaSuccess, handleError3);
        
        
        function handleError3(tx, result) {
            console.log('Error Detalhes da Agenda')
        }
       
	function DbDetalhesAgendaSuccess(tx, result) {
		//alert('Num Itens: '+id);
		var sql = "select * from tb_agenda a, tb_palestrantes b, tb_agenda_palestrantes c where a.agendaId = c.agenda_palestrantesAgendaId AND c.agenda_palestrantesAgendaId = '"+strId+"' AND b.palestrantesId = c.agenda_palestrantesPalestrantesId OR b.palestrantesId != null ORDER by b.palestrantesId ASC";	
                //var sql = "select * from tb_agenda";	
		
            tx.executeSql(sql, [], handleGetDataPalestrantesAgendaSuccess, handleError3);
                
	}
	
	function handleGetDataPalestrantesAgendaSuccess(tx, result){
          
		var countItens3 = 0;
				
		var numItens3 = result.rows.length;
                $('#descricao-page-detalhes').html(result.rows.item(0).agendaDescricao);
		$('#ulPalestrantes').append('<li data-role="list-divider">Palestrante(s)</li>');
		while(countItens3 < numItens3)
		{
			var employee3 = result.rows.item(countItens3);
                       
			var tipo = employee3.palestrantesTipo;
			
			
				$('#ulPalestrantes')
						.append('<li><a href="#" onClick="handleViewMinicurriculo(\''+employee3.palestrantesNome+'\', \''+employee3.palestrantesDescricao+'\')">'+
								'<img src="uploads/photos/'+employee3.palestrantesFoto+'" >'+
								'<h2>'+employee3.palestrantesNome+'</h2></a>'+
								'</li>');
						$('#ulPalestrantes').listview('refresh');		
			
			countItens3++;
		}
		
		$('#ulAnotacoes').append('<li data-role="list-divider">Anota&ccedil;&otilde;es</li>');
		$('#ulAnotacoes').append('<li><textarea  name="bloco_anotacoesNote" id="bloco_anotacoesNote" style="height:300px; padding:10px; overflow:scroll;"></textarea></li>');
		$('#ulAnotacoes').append('<li><input id="btAnotacoes" type="button" value="Salvar anota&ccedil;&otilde;es"></li>');
		$('#ulAnotacoes').append('<li><div id="sleepNote"></div></li>');
		$('#ulAnotacoes').trigger("create");
		
		//handleGetNotas($('#textareaNote3'));
		
		$('#btAnotacoes').click(function ()
		{
                    handleSaveAnotacoes($('#textareaNote3'));
                   
		});
                
		$('#pageDetalheUl').listview('refresh');
                $('#ulAnotacoes').listview('refresh');
	}
	
	handleGetAnotacoes();
        //StateMachineNotas('handleGetDadosNotas');
    }


//-- handleStartDbAgendaError
function handleStartDbAgendaError(tx, result){
        console.log(tx)
}



//-- handleSelectAgendaSuccess
var countItens = 0;
var indicePalestrantesDb = 0;
var indicePalestrantesDb2 = 0;




function handleViewMinicurriculo(b, c)
{
	$.mobile.changePage( "#page-descricao-palestrante", { transition: "slideup"});
	$('#descricao-page-detalhes-mini-curriculo').empty();

	$("#nomePalestrante").text(b);
	$("#descricaoPalestrante").html(c);
	//'<img src="images/template_ipad/images/palestrantes/'+a+'" style="float:left;padding:10px;"> '+
}

function handleSaveAnotacoes(txt)
{
    
    $.post(ExternalURL+'blocoanotacoes/handleInsert/front/true', {id:dadosParticipantes[0], texto:$('#bloco_anotacoesNote').val()}, function(data)
    {
        //console.log(data);
    }, 'json')
    .done(function(data)
    {
        alert('Dados Salvos com sucesso!');
    }, 'json')
    .fail(function(data)
    {
        alert('Erro ao salvar os dados!');
    }, 'json');
}

function handleGetAnotacoes()
{
    $.getJSON(ExternalURL+'blocoanotacoes/handleSelect/front/true/id/'+dadosParticipantes[0],function(data){
            
            //console.log(data)
               
        }).done(function(data)
        {
            $('#bloco_anotacoesNote').html(data.mensagem[0]['bloco_anotacoesNote']);
            
        }).fail(function(data)
        {
            //console.log(data);
            
        });
}