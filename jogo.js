'use strict';
// Integração do jogo da memória fornecido pela equipe: quatro pares originais.
(() => {
  const board = document.getElementById('memory-board');
  if (!board) return;
  const movesLabel = document.getElementById('memory-moves');
  const pairsLabel = document.getElementById('memory-pairs');
  const message = document.getElementById('memory-message');
  const images = [
    {file:'drone.png', label:'Drone'},
    {file:'logo.png', label:'Logo Smart Campo'},
    {file:'painel-solar.png', label:'Painel solar'},
    {file:'plantacao.png', label:'Plantação'}
  ];
  let first = null, locked = false, moves = 0, pairs = 0, timer = null;
  function reveal(card, shown) {
    card.classList.toggle('is-flipped', shown);
    card.setAttribute('aria-label', `Carta ${card.dataset.position}: ${shown ? card.dataset.label : 'virada para baixo'}`);
    card.setAttribute('aria-pressed', String(shown));
  }
  function choose(card) {
    if (locked || card === first || card.classList.contains('is-matched')) return;
    reveal(card, true);
    if (!first) {
      first = card;
      message.textContent = `${card.dataset.label}. Escolha outra carta.`;
      return;
    }
    const previous = first;
    first = null;
    movesLabel.textContent = String(++moves);
    if (previous.dataset.image === card.dataset.image) {
      [previous,card].forEach(item => {
        item.classList.add('is-matched');
        item.setAttribute('aria-disabled','true');
        item.setAttribute('aria-label',`Carta ${item.dataset.position}: ${item.dataset.label}, par encontrado`);
      });
      pairsLabel.textContent = String(++pairs);
      message.textContent = pairs === images.length
        ? `Você venceu! Encontrou os 4 pares em ${moves} jogadas.`
        : `Par de ${card.dataset.label} encontrado! ${pairs} de 4 pares.`;
    } else {
      locked = true;
      message.textContent = `${previous.dataset.label} e ${card.dataset.label}. Não foi um par. Tente novamente.`;
      timer = setTimeout(() => {
        reveal(previous,false);
        reveal(card,false);
        locked = false;
        timer = null;
      },1100);
    }
  }
  function restart() {
    // Cancela a devolução das cartas antigas antes de reconstruir o tabuleiro.
    clearTimeout(timer);
    timer = null;
    first = null;
    locked = false;
    moves = pairs = 0;
    movesLabel.textContent = pairsLabel.textContent = '0';
    message.textContent = 'Escolha uma carta para começar.';
    const deck = [...images,...images];
    for (let i=deck.length-1;i>0;i--) {
      const j=Math.floor(Math.random()*(i+1));
      [deck[i],deck[j]]=[deck[j],deck[i]];
    }
    board.replaceChildren();
    deck.forEach((image,index) => {
      const card=document.createElement('button');
      card.type='button';
      card.className='memory-card';
      card.dataset.image=image.file;
      card.dataset.label=image.label;
      card.dataset.position=String(index+1);
      // As imagens escondidas não revelam a resposta ao leitor de tela.
      card.innerHTML=`<span class="memory-card-inner" aria-hidden="true"><span class="memory-front"><span>SC</span><small>${String(index+1).padStart(2,'0')}</small></span><span class="memory-back"><img src="assets/jogo/${image.file}" alt="" loading="lazy" decoding="async"><span>${image.label}</span></span></span>`;
      reveal(card,false);
      card.addEventListener('click',()=>choose(card));
      board.append(card);
    });
  }
  document.getElementById('memory-reset').addEventListener('click',restart);
  restart();
})();
