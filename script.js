// --- DATABASE SOAL ---
// Tambahkan field 'explanation' untuk penjelasan jika salah
const questions = [
    {
        Id: "q1",
        question: "Ayah Roni punya 5 anak: 1. Nana, 2. Nini, 3. Nunu, 4. Nene. Siapa nama anak kelima?",
        answers: [
            { text: "Nono", correct: false },
            { text: "Roni", correct: true }, // Logikanya: "Ayah Roni"
            { text: "Nana", correct: false },
            { text: "Budi", correct: false }
        ],
        explanation: "Namanya kan Ayahnya Roni, xixixixi"
    }, 

    {
        Id: "q2",
        question: "Kamu sedang mengikuti lomba lari maraton. Saat mendekati garis finish, kamu mengerahkan seluruh tenagamu dan berhasil menyalip orang yang berada di posisi kedua. Sekarang, di posisi berapakah kamu?",
        answers: [
            { text: "Posisi Pertama", correct: false },
            { text: "Posisi Kedua", correct: true }, // Logikanya: ika kamu menyalip orang di posisi kedua, kamu mengambil alih tempatnya. Orang yang tadinya posisi satu masih tetap di depanmu.
            { text: "Posisi Ketiga", correct: false },
            { text: "Menyerah", correct: false }
        ],
        explanation: "Jika kamu menyalip orang di posisi kedua, kamu mengambil alih tempatnya. Orang yang tadinya posisi satu masih tetap di depanmu."
    },

    {
        Id: "q3",
        question: "Kamu terjebak di ruangan dingin dan gelap. Kamu hanya punya satu batang korek api. Di situ ada lampu minyak, perapian kayu, dan lilin. Mana yang akan kamu nyalakan pertama kali?",
        answers: [
            { text: "Lampu minyak (agar terang)", correct: false },
            { text: "Perapian (agar hangat)", correct: false },
            { text: "Lilin (Agar hemat)", correct: false },
            { text: "Korek api", correct: true } //Kamu tidak bisa menyalakan ketiga benda lainnya jika kamu tidak menyalakan korek apinya terlebih dahulu.
        ],
        explanation: "Kamu tidak bisa menyalakan ketiga benda lainnya jika kamu tidak menyalakan korek apinya terlebih dahulu."
    },

    {
        Id: "q4",
        question: "Jika seorang petani memiliki 17 kambing dan semuanya mati kecuali 9, berapa banyak kambing yang masih hidup?",
        answers: [
            { text: "8", correct: false },
            { text: "7", correct: false },
            { text: "0", correct: false },
            { text: "9", correct: true } //Kalimatnya sudah bilang "semuanya mati kecuali 9". Berarti yang tersisa (hidup) ya 9 ekor. Otak kita biasanya langsung refleks melakukan pengurangan $17 - 9$.
        ],
        explanation: "Kalimatnya sudah bilang semuanya mati kecuali 9. Berarti yang tersisa (hidup) ya 9 ekor."
    },

    {
        Id: "q5",
        question: "Aku punya kota, tapi tidak punya rumah. Aku punya gunung, tapi tidak punya pohon. Aku punya air, tapi tidak punya ikan. Apakah aku",
        answers: [
            { text: "Lukisan", correct: false },
            { text: "Peta", correct: true }, //Di dalam peta, semua simbol itu ada (kota, gunung, sungai), tapi secara fisik benda aslinya tidak ada di sana.
            { text: "Padang Pasir", correct: false },
            { text: "Imajinasi", correct: false }
        ],
        explanation: "Di dalam peta, semua simbol itu ada (kota, gunung, sungai), tapi secara fisik benda aslinya tidak ada di sana."
    }
       
        
];

// --- 2. VARIABEL GLOBAL ---
let shuffledQuestions, currentIdx, score, lives, timer, timeLeft, currentPlayerName;
let globalStats = {};

// Menampilkan leaderboard saat halaman pertama kali dibuka
window.onload = () => {
    showLeaderboard();
    listenToStats(); // Pantau statistik dari Firebase
};

// --- 3. FUNGSI UTAMA GAME ---
async function startGame() {
    const nameInput = document.getElementById('username');
    const name = nameInput.value.trim();
    const error = document.getElementById('error-msg');

    if (!name) {
        error.innerText = "Isi namamu dulu!";
        return;
    }

    currentPlayerName = name;
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('quiz-screen').classList.remove('hide');
    
    // ACAK SOAL
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentIdx = 0;
    score = 0;
    lives = 3;
    updateLivesUI();
    loadQuestion();
}

function loadQuestion() {
    resetQuizState();
    const q = shuffledQuestions[currentIdx];
    document.getElementById('question').innerText = q.question;
    
    // TAMPILKAN STATISTIK ONLINE
    const s = globalStats[q.id] || { seen: 0, ok: 0 };
    const percent = s.seen === 0 ? 0 : Math.round((s.ok / s.seen) * 100);
    document.getElementById('stats-percent').innerText = percent;

    // Catat soal dilihat ke Firebase
    updateStatOnline(q.id, 'seen');

    q.answers.forEach(a => {
        const btn = document.createElement('button');
        btn.innerText = a.text;
        btn.onclick = () => handleAnswer(a.correct, btn);
        document.getElementById('answer-buttons').appendChild(btn);
    });
    startTimer();
}

function handleAnswer(isCorrect, btn) {
    clearInterval(timer);
    disableButtons();
    const q = shuffledQuestions[currentIdx];

    if (isCorrect) {
    btn.classList.add('correct');
    updateStatOnline(q.id, 'ok');
    score += 1000; // Ubah dari score++ menjadi +1000
    
    showSuccessPopup(); // POP-UP BENAR
        
        setTimeout(() => {
            currentIdx++;
            if (currentIdx < shuffledQuestions.length) loadQuestion();
            else endGame();
        }, 1500);
    } else {
        btn.classList.add('wrong');
        lives--;
        updateLivesUI();
        document.getElementById('explanation-text').innerText = q.explanation;
        document.getElementById('controls-area').classList.remove('hide');
    }
}

// --- 4. FITUR POP-UP & UI ---
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup-success';
    popup.innerHTML = '✨ JAWABAN BENAR! ✨';
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 400);
    }, 1100);
}

function startTimer() {
    timeLeft = 10;
    timer = setInterval(() => {
        timeLeft -= 0.1;
        document.getElementById('timer-bar').style.width = (timeLeft * 10) + "%";
        if (timeLeft <= 0) {
            clearInterval(timer);
            lives--;
            updateLivesUI();
            document.getElementById('explanation-text').innerText = "Waktu habis! " + shuffledQuestions[currentIdx].explanation;
            document.getElementById('controls-area').classList.remove('hide');
            disableButtons();
        }
    }, 100);
}

function toggleExplanation() {
    document.getElementById('explanation-box').classList.toggle('hide');
}

function nextQuestion() {
    if (lives <= 0) endGame();
    else {
        currentIdx++;
        if (currentIdx < shuffledQuestions.length) loadQuestion();
        else endGame();
    }
}

function updateLivesUI() {
    document.getElementById('lives').innerText = "❤️".repeat(lives) || "💀 Habis!";
}

function resetQuizState() {
    clearInterval(timer);
    document.getElementById('answer-buttons').innerHTML = '';
    document.getElementById('controls-area').classList.add('hide');
    document.getElementById('explanation-box').classList.add('hide');
}

function disableButtons() {
    const btns = document.getElementById('answer-buttons').querySelectorAll('button');
    btns.forEach(b => b.disabled = true);
}

// --- 5. LOGIKA FIREBASE (ONLINE) ---

// Ambil data leaderboard & tampilkan medali
function showLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    const lbRef = window.dbRef(window.db, 'leaderboard');
    const q = window.dbQuery(lbRef, window.dbOrderBy('score'), window.dbLimit(10));

    window.dbOnValue(q, (snap) => {
        const data = snap.val();
        let players = [];
        for (let id in data) players.push(data[id]);
        players.sort((a, b) => b.score - a.score);

        list.innerHTML = players.map((p, i) => {
            let medal = (i === 0) ? "🥇" : (i === 1) ? "🥈" : (i === 2) ? "🥉" : `#${i+1}`;
            return `<li><span>${medal} <strong>${p.name}</strong></span> <span>${p.score.toLocaleString('id-ID')} Pt</span></li>`;
        }).join('') || "<li>Belum ada data</li>";
    });
}

// Pantau statistik soal secara realtime
function listenToStats() {
    const statRef = window.dbRef(window.db, 'gameStats');
    window.dbOnValue(statRef, (snap) => {
        globalStats = snap.val() || {};
    });
}

function updateStatOnline(qId, type) {
    const ref = window.dbRef(window.db, `gameStats/${qId}/${type}`);
    // Ambil nilai lama lalu tambah 1
    const currentVal = (globalStats[qId] && globalStats[qId][type]) ? globalStats[qId][type] : 0;
    window.dbSet(ref, currentVal + 1);
}

function endGame() {
    document.getElementById('quiz-screen').classList.add('hide');
    document.getElementById('end-screen').classList.remove('hide');
    document.getElementById('score').innerText = score;
    
    // Simpan skor ke Firebase
    const lbRef = window.dbRef(window.db, 'leaderboard');
    window.dbPush(lbRef, { name: currentPlayerName, score: score });
}

// --- 6. ADMIN RESET ---
window.adminReset = async function() {
    const pw = prompt("Masukkan Password Admin:");
    if (pw === "admin123") {
        if (confirm("Reset semua data online?")) {
            await window.dbSet(window.dbRef(window.db, 'leaderboard'), null);
            await window.dbSet(window.dbRef(window.db, 'gameStats'), null);
            alert("Berhasil!");
            location.reload();
        }
    } else { alert("Salah!"); }
}