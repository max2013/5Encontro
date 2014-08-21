
    var countItens = 0;
    document.addEventListener('deviceready', onDeviceReady, false);
    
    function onDeviceReady(){
        
        var connect = new AntsConnectDb();
        connect.handleConnect();
        
        
        db.transaction(DbDetalhesAgendaSuccess, handleError3);
        
        $('#ulPalestrantes').empty();
    }
    
		
	
	
        
        
        function handleError3(tx, result) {
            console.log('Error Palestrantes')
        }
       
	function DbDetalhesAgendaSuccess(tx, result) {
		//alert('Num Itens: '+id);
		var sql = 'select * from tb_palestrantes WHERE palestrantesStatus = 1 ORDER BY palestrantesNome ASC';
		
                tx.executeSql(sql, [], handleGetDataPalestrantesAgendaSuccess, handleError3);
                
	}
	
	function handleGetDataPalestrantesAgendaSuccess(tx, result){
          
		var countItens3 = 0;
				
		var numItens3 = result.rows.length;
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
		
		$('#ulPalestrantes').listview('refresh');
	}


function handleViewMinicurriculo(b, c)
{
	$.mobile.changePage( "#page-descricao-palestrante", { transition: "slideup"});
	$('#descricao-page-detalhes-mini-curriculo').empty();

	$("#nomePalestrante").text(b);
	$("#descricaoPalestrante").html(c);
	//'<img src="images/template_ipad/images/palestrantes/'+a+'" style="float:left;padding:10px;"> '+
}
