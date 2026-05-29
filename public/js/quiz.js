// ===== Quiz Guns N' Roses =====

var quizPerguntas = [
    {
        pergunta: "Qual é o nome do álbum de estreia do Guns N' Roses, lançado em 1987?",
        opcoes: ["Use Your Illusion I", "Appetite for Destruction", "Lies", "Chinese Democracy"],
        correta: 1
    },
    {
        pergunta: "Quem é o vocalista principal do Guns N' Roses?",
        opcoes: ["Slash", "Duff McKagan", "Axl Rose", "Izzy Stradlin"],
        correta: 2
    },
    {
        pergunta: "Qual música do Guns N' Roses tem um clipe que se passa na igreja?",
        opcoes: ["November Rain", "Paradise City", "Sweet Child O' Mine", "Welcome to the Jungle"],
        correta: 0
    },
    {
        pergunta: "Qual membro do Guns N' Roses é famoso por tocar com uma cartola?",
        opcoes: ["Axl Rose", "Duff McKagan", "Steven Adler", "Slash"],
        correta: 3
    },
    {
        pergunta: "Em que cidade o Guns N' Roses foi formado?",
        opcoes: ["Nova York", "Seattle", "Los Angeles", "Londres"],
        correta: 2
    }
];

var quizAtual = 0;
var quizPontos = 0;
var quizRespondido = false;

function toggleQuiz() {
    var panel = document.getElementById('quizPanel');
    panel.classList.toggle('aberto');
    if (panel.classList.contains('aberto') && !quizRespondido) {
        renderizarQuiz();
    }
}

function renderizarQuiz() {
    var body = document.getElementById('quizBody');
    var q = quizPerguntas[quizAtual];

    var html = '<div class="quiz-progress">Pergunta ' + (quizAtual + 1) + ' de ' + quizPerguntas.length + '</div>';
    html += '<div class="quiz-question">' + q.pergunta + '</div>';
    html += '<div class="quiz-options">';
    for (var i = 0; i < q.opcoes.length; i++) {
        html += '<button class="quiz-option" onclick="responderQuiz(' + i + ', this)">' + q.opcoes[i] + '</button>';
    }
    html += '</div>';

    body.innerHTML = html;
}

function responderQuiz(indice, botao) {
    var q = quizPerguntas[quizAtual];
    var botoes = document.querySelectorAll('.quiz-option');

    // Desabilitar todos os botões
    for (var i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true;
        if (i === q.correta) {
            botoes[i].classList.add('correta');
        }
    }

    if (indice === q.correta) {
        quizPontos++;
    } else {
        botao.classList.add('errada');
    }

    // Avançar após um breve delay
    setTimeout(function () {
        quizAtual++;
        if (quizAtual < quizPerguntas.length) {
            renderizarQuiz();
        } else {
            mostrarResultadoQuiz();
        }
    }, 1200);
}

function mostrarResultadoQuiz() {
    quizRespondido = true;
    var body = document.getElementById('quizBody');
    var msg = '';
    if (quizPontos === quizPerguntas.length) {
        msg = 'Você é um verdadeiro Gunner! 🔥';
    } else if (quizPontos >= 3) {
        msg = 'Bom conhecimento! Quase lá! 🎸';
    } else {
        msg = "Hora de ouvir mais Guns N' Roses! 🎶";
    }

    body.innerHTML = '<div class="quiz-resultado">' +
        '<h4>Resultado</h4>' +
        '<div class="quiz-score">' + quizPontos + '/' + quizPerguntas.length + '</div>' +
        '<p>' + msg + '</p>' +
        '<button class="quiz-btn-reiniciar" onclick="reiniciarQuiz()">Jogar Novamente</button>' +
        '</div>';
}

function reiniciarQuiz() {
    quizAtual = 0;
    quizPontos = 0;
    quizRespondido = false;
    renderizarQuiz();
}
