import React from 'react';

import ReactDOM from 'react-dom';

const Webphone = () => {
  const webphoneRef = React.useRef(null);

  const windowListener = e => {
    //quando receber uma ligacao
    if (e.data.message == 'chegandoChamada') {
        alert('Chegando Chamada de ' + e.data.numeroChegando + ' para: ' + e.data.numeroDestino + ' chamada_recebida_id: ' + e.data.chamadaRecebidaId);
    }
    //conectado, desconectado, chamando, encerrada, conversando
    if (e.data.message == 'status') {
        //alert('Status: ' + e.data.status);
    }
    //o id é único e pode ser utilizado na api para recuperação de mais informações (get na api ou webhooks) 
    if (e.data.message == 'chamada_id') {
        alert('Chamada_id: ' + e.data.chamada_id);
    }
    //os erros são finais
    if (e.data.message == 'status_erro') {
        //alert('Sem Permissão: ' + e.data.status_erro);
    }
    
    //rebendo o status de diagnóstico de internet e computador para verificar qualidade de ligação
    if (e.data.message == 'stats_webphone') {
        //alert('Internet: ' + e.data.internet + ' e computador: ' + e.data.computador);
    }

    if(e.data.message == 'pausou_na_fila') {
      // Evento disparado quando o ramal é pausado na fila
    }
    else if(e.data.message == 'despausou_na_fila') {
      // Evento disparado quando o ramal é despausado na fila
    }
    else if(e.data.message == 'entrou_na_fila') {
      // Evento disparado quando o ramal entra na fila
    }
    else if(e.data.message == 'saiu_da_fila') {
      // Evento disparado quando o ramal sai da fila
    }
  };

  //encerra chamada ativa
  function desligaChamada() {
    webphoneRef.current.contentWindow.postMessage({
        message: 'hangup'
    }, '*');
  }
  
  //Conecta o webphone para coloca-lo em operação
  function conectar(){
      webphoneRef.current.contentWindow.postMessage({message : 'conectar'}, '*');
  }

  //desconecta o webphone - ele nao recebe nem envia mais chamadas
  function desconectar(){
      webphoneRef.current.contentWindow.postMessage({message : 'desconectar'}, '*');
  }


  //telefona para um número
  function chamaNumero(numero) {
      webphoneRef.current.contentWindow.postMessage({
          message: 'chamaNumero',
          'numero': numero
      }, '*');
  }

  //atender
  function atender() {
      webphoneRef.current.contentWindow.postMessage({
          message: 'answer'
      }, '*');
  }

  //para uso com uras
  function enviaDTMF(meuDTMF) {
      webphoneRef.current.contentWindow.postMessage({
          message: 'enviaDTMF',
          'dtmf': meuDTMF
      }, '*');
  }

  //mute microfone
  function mute() {
      webphoneRef.current.contentWindow.postMessage({
          message: 'mute'
      }, '*');
  }

  //transferencia blind - encerra a ligação aqui e transfere para o numero
  function transferir(numeroTelefone) {
      webphoneRef.current.contentWindow.postMessage({
          message: 'transferir',
          'numeroTelefone': numeroTelefone
      }, '*');
  }

  //transferencia com consulta
  function transferirConsulta(numeroTelefone) {
      webphoneRef.current.contentWindow.postMessage({
          message: 'transferirConsulta',
          'numeroTelefone': numeroTelefone
      }, '*');
  }

  function recstart() {
      webphoneRef.current.contentWindow.postMessage({
          message: 'recStart'
      }, '*');
  }

  function recstop() {
      webphoneRef.current.contentWindow.postMessage({
          message: 'recStop'
      }, '*');                
  }
  
  function pausarNaFila(filaId) {
    webphone.contentWindow.postMessage({
      message: 'pausarNaFila',
      filaId: filaId
    }, '*');
  }

  function despausarNaFila(filaId) {
    webphone.contentWindow.postMessage({
      message: 'despausarNaFila',
      filaId: filaId
    }, '*');
  }

  function entrarNaFila(filaId) {
    webphone.contentWindow.postMessage({
      message: 'entrarNaFila',
      filaId: filaId
    }, '*');
  }

  function sairDaFila(filaId) {
    webphone.contentWindow.postMessage({
      message: 'sairDaFila',
      filaId: filaId
    }, '*');
  }

  React.useEffect(() => {
    if (webphoneRef.current) {
      window.addEventListener('message', windowListener);

      // remove o event listener quando o componente for unmounted
      return () => window.removeEventListener('message', windowListener);
    }

  },[webphoneRef.current]);

  return (
    <React.Fragment>
        <iframe
            allow="microphone"
            src="URL_WEBPHONE_API_TOTALVOICE"
            style={{ display: 'none' }}
            ref={webphoneRef}
        />
          <br />
        <input type="button" onClick={conectar} value="Conectar" /> (o sistema conecta sozinho por default ao abrir)<br />
        <input type="button" onClick={desconectar} value="Desconectar" /> (nao recebe nem faz mais chamadas)<br />
        <input type="button" onClick={desligaChamada} value="Desliga" />
        <input type="button" onClick={() => chamaNumero(4001)} value="Chama 4001" />
        <br />
        <input type="button" onClick={() => chamaNumero(4832830151)} value="Chama 4832830151" />
        <br />
        <input type="button" onClick={() => chamaNumero(97988888888)} value="Chama 97988888888" />
        <br /> (DTMF: 0,1,2,3,4,5,6,7,8,9,*,#)<br />
        <input type="button" onClick={() => enviaDTMF('1')} value="DTMF 1" />
        <br />
        <input type="button" onClick={() => enviaDTMF('2')} value="DTMF 2" />
        <br />
        <input type="button" onClick={() => enviaDTMF('0')} value="DTMF 0" />
        <br />
        <input type="button" onClick={() => enviaDTMF('*')} value="DTMF *" />
        <br />
        <input type="button" onClick={() => enviaDTMF('#')} value="DTMF #" />
        <br /><input type="button" onClick={mute} value="Mute/Unmute" />
        <br />
        <br />
        <input type="button" onClick={() => transferirConsulta('4000')} value="Transferir Consulta para 4998" />
        <br />
        <input type="button" onClick={() => transferir('4515')} value="Transferir para 4515" />
        <input type="button" onClick={atender} value="Atender" />C
        <br />
        <br />
        <input type="button" onClick={recstart} value="REC Start" />
        <input type="button" onClick={recstop} value="REC Stop" />
        <br />
        <br />
        <input type="button" onClick={pausarNaFila} value="Pausar em todas filas" />
        <input type="button" onClick={despausarNaFila} value="Despausar em todas filas" />
        <br />
        <br />
        <input type="button" onClick={() => entrarNaFila(47)} value="Entrar na fila 47" />
        <input type="button" onClick={() => sairDaFila(47)} value="Sair da fila 47" />
    </React.Fragment>
   
  );
};

ReactDOM.render(<Webphone />, document.getElementById('totalvoice'));