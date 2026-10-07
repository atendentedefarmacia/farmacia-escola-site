const sectors = [
  { name: 'Atendimento', icon: '🧑‍⚕️', text: 'Espaço de acolhimento, escuta e orientação ao usuário.' },
  { name: 'Caixa', icon: '🧾', text: 'Local de conferência de produtos, valores e finalização da compra.' },
  { name: 'Armazenamento', icon: '📦', text: 'Área destinada à organização e conservação adequada dos produtos.' },
  { name: 'Dispensação', icon: '💊', text: 'Momento de entrega do medicamento com as orientações necessárias.' },
  { name: 'Acessibilidade', icon: '♿', text: 'Recursos e adaptações para facilitar o acesso e a circulação.' }
];

const medications = [
  { title: 'Analgésicos', category: 'dor', desc: 'São usados para aliviar a dor. O uso deve seguir orientação e informações da bula.' },
  { title: 'Antitérmicos', category: 'dor', desc: 'Auxiliam no controle da febre conforme indicação adequada.' },
  { title: 'Antialérgicos', category: 'alergia', desc: 'Podem ajudar no controle de alguns sintomas de alergia.' },
  { title: 'Antibióticos', category: 'infeccao', desc: 'Atuam contra determinadas bactérias e devem ser usados conforme prescrição quando indicada.' },
  { title: 'Medicamentos de uso contínuo', category: 'cronicos', desc: 'São utilizados regularmente para o acompanhamento de condições de saúde.' },
  { title: 'Anti-inflamatórios', category: 'dor', desc: 'Podem reduzir dor e inflamação em situações específicas.' },
  { title: 'Antifúngicos', category: 'infeccao', desc: 'São utilizados contra determinadas infecções causadas por fungos.' },
  { title: 'Antialérgicos de uso local', category: 'alergia', desc: 'Podem ser apresentados em formas próprias para uso em determinadas regiões do corpo.' }
];

const therapeuticClasses = [
  { title: 'Analgésicos', icon: '🩹', desc: 'Relacionados ao alívio da dor.' },
  { title: 'Antibióticos', icon: '🦠', desc: 'Medicamentos usados contra determinadas bactérias.' },
  { title: 'Anti-inflamatórios', icon: '🔥', desc: 'Podem reduzir processos inflamatórios em situações específicas.' },
  { title: 'Antialérgicos', icon: '🤧', desc: 'Ajudam a controlar determinados sintomas de alergia.' },
  { title: 'Antifúngicos', icon: '🍄', desc: 'Atuam contra determinados fungos.' },
  { title: 'Antitérmicos', icon: '🌡️', desc: 'Ajudam no controle da febre.' }
];

const forms = [
  { title: 'Comprimido', icon: '💊', desc: 'Forma sólida, geralmente administrada por via oral.' },
  { title: 'Cápsula', icon: '🟢', desc: 'Forma sólida com conteúdo envolvido por uma cápsula.' },
  { title: 'Xarope', icon: '🧴', desc: 'Preparação líquida para administração por via oral.' },
  { title: 'Creme', icon: '🧴', desc: 'Preparação semissólida usada sobre a pele, conforme indicação.' },
  { title: 'Pomada', icon: '🫙', desc: 'Preparação semissólida de uso local.' },
  { title: 'Gotas', icon: '💧', desc: 'Preparação líquida em pequenas quantidades por gota.' }
];

const quizQuestions = [
  { q: 'Qual informação da bula explica como o medicamento deve ser usado em relação à dose e aos horários?', a: ['Indicação', 'Posologia', 'Conservação', 'Fabricante'], correct: 1 },
  { q: 'Qual é a atitude mais adequada para um medicamento vencido?', a: ['Jogar no vaso sanitário', 'Misturar ao lixo comum sem orientação', 'Levar a um ponto de coleta adequado', 'Deixar aberto para evaporar'], correct: 2 },
  { q: 'Qual setor está relacionado à conservação e organização dos produtos?', a: ['Caixa', 'Armazenamento', 'Entrada', 'Recepção externa'], correct: 1 },
  { q: 'O que ajuda a tornar um site mais acessível?', a: ['Texto muito pequeno', 'Baixo contraste', 'Botões sem rótulo', 'Texto legível e contraste adequado'], correct: 3 },
  { q: 'Qual destes é um exemplo de forma farmacêutica?', a: ['Comprimido', 'Cor', 'Marca', 'Prateleira'], correct: 0 }
];

const sectorList = document.getElementById('sectorList');
sectorList.innerHTML = sectors.map(s => `
  <article class="sector-card">
    <h3>${s.icon} ${s.name}</h3>
    <p>${s.text}</p>
  </article>`).join('');

document.querySelectorAll('.room').forEach(room => {
  room.setAttribute('tabindex', '0');
  room.addEventListener('click', () => roomDescription(room.dataset.sector));
  room.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') roomDescription(room.dataset.sector); });
});

function roomDescription(name) {
  const match = sectors.find(s => s.name === name);
  if (match) alert(`${match.name}\n\n${match.text}`);
}

const medContainer = document.getElementById('medicationCards');
function renderMeds(filter='todos') {
  const items = filter === 'todos' ? medications : medications.filter(x => x.category === filter);
  medContainer.innerHTML = items.map(m => `
    <article class="card">
      <span class="tag">${labelCategory(m.category)}</span>
      <h3>${m.title}</h3>
      <p>${m.desc}</p>
    </article>`).join('');
}
function labelCategory(c) {
  return ({dor:'Dor e febre', alergia:'Alergias', infeccao:'Infecções', cronicos:'Uso contínuo'})[c] || 'Categoria';
}
renderMeds();

document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMeds(btn.dataset.filter);
  });
});

document.getElementById('classCards').innerHTML = therapeuticClasses.map(c => `
  <article class="card"><div class="icon">${c.icon}</div><h3>${c.title}</h3><p>${c.desc}</p></article>`).join('');

document.getElementById('formsCards').innerHTML = forms.map(f => `
  <article class="forms-card"><div class="form-visual" aria-hidden="true">${f.icon}</div><span class="tag">Forma farmacêutica</span><h3>${f.title}</h3><p>${f.desc}</p></article>`).join('');

document.querySelectorAll('.bula-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('span:last-child').textContent = open ? '−' : '+';
  });
});

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const increaseText = document.getElementById('increaseText');
const highContrast = document.getElementById('highContrast');
const reduceMotion = document.getElementById('reduceMotion');
const resetAccess = document.getElementById('resetAccess');
increaseText.addEventListener('click', () => document.body.classList.toggle('font-large'));
highContrast.addEventListener('click', () => document.body.classList.toggle('high-contrast'));
reduceMotion.addEventListener('click', () => document.body.classList.toggle('reduce-motion'));
resetAccess.addEventListener('click', () => document.body.classList.remove('font-large','high-contrast','reduce-motion'));

let quizIndex = 0;
let quizScore = 0;
let answered = false;
const quizBox = document.getElementById('quizBox');

function renderQuiz() {
  if (quizIndex >= quizQuestions.length) {
    quizBox.innerHTML = `
      <div class="result">
        <p class="eyebrow">RESULTADO</p>
        <div class="result-score">${quizScore}/${quizQuestions.length}</div>
        <h3>${quizScore === quizQuestions.length ? 'Excelente! 🎉' : quizScore >= 3 ? 'Muito bem! 👏' : 'Continue explorando! 📚'}</h3>
        <p>Revise as seções do site e tente novamente para melhorar sua pontuação.</p>
        <button class="btn primary" id="restartQuiz">Refazer quiz</button>
      </div>`;
    document.getElementById('restartQuiz').addEventListener('click', () => { quizIndex=0; quizScore=0; answered=false; renderQuiz(); });
    return;
  }

  const item = quizQuestions[quizIndex];
  quizBox.innerHTML = `
    <div class="quiz-progress">Pergunta ${quizIndex + 1} de ${quizQuestions.length}</div>
    <div class="quiz-question">${item.q}</div>
    <div class="answers" id="answers">
      ${item.a.map((answer, i) => `<button class="answer" data-index="${i}">${String.fromCharCode(65+i)}. ${answer}</button>`).join('')}
    </div>
    <div class="quiz-actions">
      <span id="feedback" aria-live="polite"></span>
      <button class="btn primary" id="nextQuestion" disabled>${quizIndex === quizQuestions.length - 1 ? 'Finalizar' : 'Próxima'}</button>
    </div>`;

  const answerButtons = document.querySelectorAll('.answer');
  const next = document.getElementById('nextQuestion');
  answerButtons.forEach(btn => btn.addEventListener('click', () => {
    if (answered) return;
    answered = true;
    const chosen = Number(btn.dataset.index);
    const correct = item.correct;
    answerButtons.forEach(b => b.disabled = true);
    if (chosen === correct) {
      btn.classList.add('correct');
      document.getElementById('feedback').textContent = '✅ Resposta correta!';
      quizScore++;
    } else {
      btn.classList.add('wrong');
      answerButtons[correct].classList.add('correct');
      document.getElementById('feedback').textContent = '❌ Observe a resposta destacada.';
    }
    next.disabled = false;
  }));

  next.addEventListener('click', () => {
    quizIndex++;
    answered = false;
    renderQuiz();
  });
}
renderQuiz();
