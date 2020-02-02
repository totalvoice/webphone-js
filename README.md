# Webphone - Javascript
Repositório com o fonte responsável por utilizar o webphone via Javascript.

### Configuração do webphone-hidden

Para configurar o seu webphone neste script você deve:
* Gerar a URL do seu webphone [neste link](https://api2.totalvoice.com.br/doc/#!/Central/get_webphone) informando o tipo dele como hidden.
* Depois só adicionar a url gerada no valor do src abaixo 'URL_WEBPHONE_API_TOTALVOICE' no script webphone-hidden.html
```
<!-- URL que foi pega pela API no /webphone - cria o iframe e injeta o webphone-->
<script src="URL_WEBPHONE_API_TOTALVOICE"></script>
```

### Utilização do webphone com React

Siga os passos citados anteriormente para gerar a URL do seu webphone, no entanto, informe sempre o tipo como EMBEDDED.
* adicione a url gerada no valor do src no iframe do index.js dentro da pasta webphone-REACT
```
<iframe
  allow="microphone"
  src="URL_WEBPHONE_API_TOTALVOICE"
  style={{ display: 'none' }}
  ref={webphoneRef}
  />
```
* mantenha na estilização do iframe o `display: none` se quiser criar seus próprios componentes para o webphone ou tire esta opção se preferir utilizar o visual padrão do webphone embedded
* para rodar o projeto, acesse a pasta webphone-REACT, utilize `npm install ` para instalar as dependências e utilize `npm run dev` para rodar em modo de desenvolvimento ou `npm run build ` para gerar um build otimizado dentro da pasta `public ` 