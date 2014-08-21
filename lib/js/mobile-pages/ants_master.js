
/*
 * Autor: Rafael Alves
 * E-mail: ralves.sql@gmail.com
 * Fb/rafael.alves.39794
 * Twitter: ralves_sql
 */


//PLUGIN DB
var db;
var dadosParticipantes = new Array();
var ip = '192.168.0.198:8888';//;'192.168.0.198:8888'
var ExternalURL = 'http://'+ip+'/www/Pfizer/adm/';
var ExternalLink = 'http://'+ip+'/www/Pfizer/';

$( document ).on( "pageinit", function( event ) {
                if (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)) {
                    $("body").addClass("ios7");
                    $('body').append('<div id="ios7statusbar"/>');
                }
            });
            
            
function AntsConnectDb()
{
    this.handleConnect = function()
    {
        db = openDatabase('pfizer_quinto_encontro', '1.0', '@ralves_sql', 50 * 1024 * 1024);
    }
    
}

function AntsGetUserSQLLite()
{
    this.handleGetUser = function()
    {
        db.transaction(handleUserSuccess, handleUserError);
        
        function handleUserSuccess(tx, result)
        {
           var sqlParticipantes= "select * from tb_participantes";
           tx.executeSql(sqlParticipantes, [], getParticipantes_success,handleDbError2);  
            
            function getParticipantes_success(tx, results)
            {
                
                    var len = results.rows.length;

                    for (var i=0; i<len; i++) {

                            var employee = results.rows.item(i);
                            //console.log('Grupo: '+employee.usuariosGrupo);
                            dadosParticipantes.push(
                                        employee.participantesId,
                                        employee.participantesNome); 


                    }
                   
                    handleSetUserData(dadosParticipantes);
                   
            }
            
            function handleDbError2(tx)
            {
                alert('Erro ao recuperar os dados do usuário.');
            }
                
        }
        
        function handleUserError(tx, result)
        {
            alert('Erro ao recuperar os dados do usuário.');
        }
    };
            
    this.handleReturnData = function(data)
    {
        return data;
    }
}

function AntsCleanDb()
{
    this.handleClean = function()
    {
        db.transaction(handleCleanSuccess, handleCleanError);
        
        function handleCleanSuccess(tx, result)
        {
            tx.executeSql('DROP TABLE IF EXISTS tb_participantes');
            tx.executeSql('DROP TABLE IF EXISTS tb_agenda');
            tx.executeSql('DROP TABLE IF EXISTS tb_agenda_dia');
            tx.executeSql('DROP TABLE IF EXISTS tb_agenda_horario');
            tx.executeSql('DROP TABLE IF EXISTS tb_agenda_tipo');
            tx.executeSql('DROP TABLE IF EXISTS tb_agenda_palestrantes');
            tx.executeSql('DROP TABLE IF EXISTS tb_palestrantes');
            
             window.location = 'index.html';
        }
        
        function handleCleanError(tx, result)
        {
            alert('Erro ao desativar o Participante!');
        }
        
    }
    
}


////PLUGIN VALIDACAO
//
function AntsValidacao()
{
    
    this.validaData = function()
    {
        var i=0;
        $('input, textarea').each(function() {
            // code
            
            if($(this).attr('required'))
            {
                
                if($(this).val() === '')
                {
                   i++;
                } 
            }
           
            
        });
        
        
        if(i > 0)return false;
        else return true;
            
        
    };
}


//
////PLUGIN VALIDA E-MAIL
//
function AntsValidacaoEmail()
{
    
    this.validaEmail = function(email)
    {
        if(email != "")
        {
           var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
           if(filtro.test(email))
           {
              return true;
           } else {
             
             return false;
           }
        }
    }
     
}

//
////PLUGIN VALIDA CPF
//
function AntsValidacaoCPF() { 
    
    this.validaCPF = function(strCPF)
    {
        var cpf = strCPF.replace('.','');
            cpf = cpf.replace('.','');
            cpf = cpf.replace('-','');
                                    
                                    
        var Soma; var Resto; Soma = 0; 
        
        if (cpf == "00000000000") return false; 

        for (i=1; i<=9; i++)  Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i); 

        Resto = (Soma * 10) % 11; 

        if ((Resto == 10) || (Resto == 11)) Resto = 0; 

        if (Resto != parseInt(cpf.substring(9, 10)) ) return false; 

        Soma = 0;

        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i); 
        Resto = (Soma * 10) % 11; 

        if ((Resto == 10) || (Resto == 11)) Resto = 0; 
        if (Resto != parseInt(cpf.substring(10, 11) ) ) return false; 

        return true; 
    }
    
}


//
////PLUGIN CARACTERES ESPECIAIS
//
function AntsValidacaoCaracteresEspeciais() {
    
    this.validarCaracteres = function(str)
    {
        //se não desejar números é só remover da regex abaixo
        var regex = '[\'\"]'//'[^a-zA-Z0-9]+';
        if(str.match(regex)) {
             //encontrou então não passa na validação
             return false;
        }
        else {
             //não encontrou caracteres especiais
             return true;
        }
    }
   
}



//
///PLUGIN DB-Data Base
//
function AntsDB()
{
    
    this.handleInsert = function(arrDados)
    {
         arrDados.txDb.executeSql("INSERT INTO "+arrDados.tabela+" ("+arrDados.field+") VALUES ("+arrDados.value+")");
    }
}


//
////MIXIN
//
/*Object.prototype.includes = function(construtor)
{
    var objeto = new construtor();

    for(var propriedade in objeto)
    {
        if(objeto.hasOwnProperty(propriedade))
        {
            this.prototype[propriedade] = new objeto[propriedade];
        }
    }
};
*/