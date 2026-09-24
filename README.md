# Smart Campo

Site institucional one-page do Projeto Integrado Técnico em Finanças da FIEB, Barueri, 2026. HTML, CSS e JavaScript puro com GSAP e ScrollTrigger. Fonte Space Grotesk. Sem formulários.

## Abrir localmente

Abra `dist/index.html` no navegador. O conteúdo, as fotos, a fonte e as animações estão incluídos localmente, sem instalação ou compilação.

Para assistir ao vídeo incorporado, use uma conexão com a internet e um servidor local: o YouTube pode rejeitar páginas abertas como `file://` por ausência de origem/referenciador. Com Node.js instalado, execute nesta pasta:

```powershell
node serve.mjs
```

Abra http://127.0.0.1:4175. Encerre o servidor com Ctrl+C. O vídeo também tem um link permanente para abrir no YouTube. A disponibilidade e a autorização de incorporação dependem do proprietário do vídeo e do YouTube.

## Publicar

Envie o **conteúdo de `dist`** para a raiz de qualquer hospedagem estática, mantendo a pasta `assets` junto de `index.html`. Não há backend nem comandos de build.

## Organização

- `dist/index.html`: todas as seções, conteúdo e metadados.
- `dist/styles.css`: paleta, tipografia, layout responsivo e estados de interação.
- `dist/script.js`: abertura, scroll, revelação de texto, contadores, menu e player sob demanda.
- `dist/assets`: logo original, fotos, miniatura, fontes e bibliotecas locais.
- `dist/creditos.txt`: fontes das imagens e referências de direção de arte.
- `serve.mjs`: servidor HTTP local opcional, usando apenas módulos nativos do Node.js.

## Comportamentos

- Abertura de aproximadamente 2,6 segundos com zoom de logo em perspectiva, inspirada no CodePen indicado. O botão “Pular abertura” e a tecla Escape encerram a sequência. Links diretos para seções pulam a abertura.
- Zoom de imagem e linha de leitura acompanhando o scroll, títulos revelados por caracteres e contadores ao entrar na tela.
- Movimento reduzido: respeita `prefers-reduced-motion`, inclusive se alterado enquanto a página está aberta. Sem animação de entrada, parallax, cursor ou contadores progressivos.
- Menu móvel operável por teclado e Escape, link para pular conteúdo, foco visível, hierarquia de títulos e textos alternativos.
- Conteúdo e números finais permanecem disponíveis sem JavaScript; há link direto ao vídeo.
- A navegação mantém o scroll nativo; não intercepta gestos nem prende o usuário em telas de abertura.
- As fotos abaixo do hero usam lazy loading. O iframe do YouTube só é criado após clicar em reproduzir.

## Conteúdo

Os preços, faturamento, investimento, ponto de equilíbrio e payback são os números fornecidos no briefing, identificados como projeções acadêmicas. A relação de empresas é apresentada como análise de mercado. Os nove integrantes aparecem apenas com nomes e funções; dados pessoais do documento não fazem parte do site. As instruções de formatação do modelo de relatório não foram aplicadas ao site.

O endereço `contato@smartcampo.example` é um placeholder visível e não é um canal operacional. Substitua-o quando a equipe definir um contato real.

A logo foi mantida como fornecida e também é usada no favicon. Fotografias de agricultura: Alex Wigan e Bernd Dittrich / Unsplash, com fontes e licenças em `dist/creditos.txt`. A fonte Space Grotesk e sua licença acompanham os arquivos. Os avisos de licença do GSAP foram preservados.

## Verificação da entrega

Layout inspecionado em 1440 px, 390 px e 320 px, sem rolagem horizontal. Menu móvel, âncoras, arquivos locais, quantidade de integrantes e valores finais dos seis contadores verificados. JavaScript validado sintaticamente; nenhum erro de script observado na prévia.

Na verificação local, o YouTube retornou “Este vídeo não está disponível” dentro do player. A incorporação do endereço solicitado foi mantida, com um link direto como alternativa. Pode ser necessário habilitar a incorporação no vídeo original ou substituí-lo por outro link.

A publicação pelo Sites não foi concluída: o componente local de hospedagem deixou de estar disponível durante a entrega. Os arquivos em `dist` estão completos e independem desse componente.

## Jogo da memória

Adicionado à página na seção “Cultive a memória”, com acesso pelo menu “Jogo da memória”. Mantém os quatro pares e as imagens do arquivo `jogo aura.rar` enviado pela equipe, com cores e tipografia adaptadas ao site.

O código está em `dist/jogo.js` e as imagens em `dist/assets/jogo`. Inclui embaralhamento, contagem de jogadas e pares, mensagem de vitória, reinício e controle por teclado. O reinício cancela a temporização da jogada anterior. Não requer internet, cadastro ou servidor adicional.

Verificados no navegador: oito cartas, carregamento das quatro imagens, vitória em quatro jogadas, reinício durante uma tentativa incorreta, acionamento por Enter e ausência de rolagem horizontal em 390 px. Nenhum erro JavaScript observado nesses testes.
