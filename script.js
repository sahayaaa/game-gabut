// --- LOGIKA TEMA ---
function toggleTheme() {
    const body = document.documentElement;
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    document.getElementById('themeToggle').innerText = isDark ? '🌙 Mode Malam' : '☀️ Mode Terang';
    localStorage.setItem('theme', newTheme);
}

// Load tema tersimpan
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// --- DATA ANGGOTA ---
const data = [
    { n: "Tania", j: { "Senin": ["07.30-10.00", "10.00-12.30", "15.00-16.45"], "Selasa": [], "Rabu": ["07.30-10.00", "10.00-12.30"], "Kamis": ["12.30-15.00","11.00-12.00", "15.00-17.30"], "Jumat": ["15.00-17.30"] }},
    { n: "Aisyah Fitri Amalia", j: { "Senin": ["07.30-10.00"], "Selasa": ["07.30-10.00", "10.00-12.30"], "Rabu": ["06.30-07.30", "10.00-12.30"], "Kamis": ["10.00-12.30"], "Jumat": ["07.30-10.00", "12.30-15.00"] }},
    { n: "Maharani", j: { "Senin": ["12.30-15.00", "15.00-17.30"], "Selasa": ["15.00-16.45"], "Rabu": ["07.30-10.00", "10.00-12.30",], "Kamis": ["12.30-15.00", "11.00-12.00", "15.00-17.30"], "Jumat": ["15.00-17.30"] }},
    { n: "Nihlah Amalia", j: { "Senin": ["10.00-12.30"], "Selasa": ["12.30-15.00", "15.00-17.30"], "Rabu": ["06.30-07.30", "12.30-15.00"], "Kamis": [], "Jumat": ["10.00-12.30", "12.30-15.00", "15.00-17.30"] }},
    { n: "Sahaya", j: { "Senin": ["07.30-10.00", "10.00-11.45", "15.00-16.45"], "Selasa": ["07.30-10.00", "12.30-15.00", "15.00-16.45"], "Rabu": ["10.00-12.30", "12.30-15.00"], "Kamis": [], "Jumat": ["07.30-09.15"] }},
    { n: "Rama", j: { "Senin": ["07.30-09.15"], "Selasa": [], "Rabu": ["10.00-12.30", "12.30-15.00", "15.00-16.45"], "Kamis": ["10.00-12.30", "15.00-17.30"], "Jumat": [] }},
    { n: "Dania", j: { "Senin": ["07.30-10.00", "12.30-15.00", "15.00-17.30"], "Selasa": ["07.30-10.00", "15.00-17.30"], "Rabu": ["07.30-10.00", "10.00-12.30", "16.30-18.15"], "Kamis": ["15.00-17.30"], "Jumat": [] }},
    { n: "Faiz", j: { "Senin": ["07.30-10.00", "10.00-12.30", "12.30-15.00"], "Selasa": ["07.30-10.00", "10.00-12.30", "12.30-15.00"], "Rabu": [], "Kamis": ["10.00-12.30", "12.30-15.00"], "Jumat": [] }},
    { n: "Giselle", j: { "Senin": ["07.30-10.00", "10.00-12.30", "15.00-16.45"], "Selasa": ["12.30-15.00"], "Rabu": ["07.30-09.30", "10.00-12.30", "15.00-17.30"], "Kamis": ["07.30-10.00", "10.00-12.30"], "Jumat": [] }},
    { n: "Nada", j: { "Senin": ["10.00-12.15"], "Selasa": ["07.45-10.45", "12.45-14.30", "15.15-17.45"], "Rabu": ["10.00-11.45", "12.45-15.00", "15.15-16.45"], "Kamis": ["10.00-11.45"], "Jumat": ["08.00-09.30", "10.00-11.45"] }},
    { n: "Pelangi", j: { "Senin": ["10.00-12.30", "12.30-15.00", "15.00-17.30"], "Selasa": ["10.00-12.30", "12.30-15.00"], "Rabu": ["07.30-10.00", "12.30-15.00"], "Kamis": ["12.30-15.00", "15.00-17.30"], "Jumat": [] }},
    { n: "Rifannisa", j: { "Senin": ["07.30-10.00", "12.30-15.00", "15.00-17.30"], "Selasa": ["07.30-10.00", "15.00-17.30"], "Rabu": ["07.30-10.00", "12.30-15.00", "16.30-18.15"], "Kamis": ["15.00-17.30"], "Jumat": [] }},
    { n: "Adi", j: { "Senin": ["07.30-10.00", "10.00-12.30", "12.30-15.00"], "Selasa": ["12.30-15.00"], "Rabu": ["07.30-09.30", "10.00-12.30", "14.45-16.30"], "Kamis": ["10.00-12.30", "15.00-17.30"], "Jumat": [] }},
    { n: "Agastya Wardhana", j: { "Senin": ["07.30-10.00", "15.00-17.30"], "Selasa": ["15.00-17.30"], "Rabu": ["07.30-10.00"], "Kamis": ["10.00-11.45"], "Jumat": ["07.30-09.15", "10.00-12.30"] }},
    { n: "Lili", j: { "Senin": ["10.00-12.30"], "Selasa": ["07.30-10.00", "12.30-14.30", "15.00-17.30"], "Rabu": ["10.00-11.45", "12.30-15.00", "15.00-17.30"], "Kamis": ["10.00-11.45"], "Jumat": ["07.20-09.00", "10.00-12.30"] }},
    { n: "Pandhu", j: { "Senin": ["10.00-12.30", "12.30-15.00"], "Selasa": ["07.30-10.00", "17.30-19.30"], "Rabu": [], "Kamis": ["07.30-10.00", "10.00-12.30"], "Jumat": ["07.30-10.00", "10.00-12.30", "15.00-17.30"] }},
    { n: "Putri", j: { "Senin": ["10.00-12.30", "12.30-15.00", "15.00-17.30"], "Selasa": ["10.00-12.30", "12.30-15.00", "15.00-17.30"], "Rabu": ["07.30-10.00", "10.00-12.30", "14.45-16.30"], "Kamis": [], "Jumat": [] }},
    { n: "Anggun", j: { "Senin": ["15.00-16.45"], "Selasa": ["12.30-15.00", "15.00-16.45"], "Rabu": ["07.30-10.00", "10.00-12.30", "12.30-14.15", "15.00-16.45"], "Kamis": ["15.00-16.45"], "Jumat": ["10.00-12.30", "12.30-14.15"] }},
    { n: "Irfan", j: { "Senin": ["10.00-12.30"], "Selasa": ["15.00-17.30"], "Rabu": ["10.00-12.30", "12.30-15.00", "15.00-17.30"], "Kamis": ["07.30-10.00", "12.30-15.00"], "Jumat": ["15.00-17.30"] }},
    { n: "Ita", j: { "Senin": ["07.30-10.00", "10.00-12.30", "12.30-15.00", "15.00-16.45"], "Selasa": ["07.30-10.00", "10.00-12.30"], "Rabu": [], "Kamis": ["07.30-10.00", "10.00-12.30", "12.30-15.00"], "Jumat": [] }},
    { n: "Kaysa", j: { "Senin": ["10.00-12.30", "12.30-15.00"], "Selasa": [], "Rabu": ["10.00-12.30", "12.30-15.00"], "Kamis": ["12.30-15.00"], "Jumat": ["07.30-10.00", "10.00-12.30", "15.00-17.30"] }},
    { n: "Salwa Azizah", j: { "Senin": ["12.30-15.00"], "Selasa": ["07.30-10.00", "10.00-12.30", "12.30-15.00"], "Rabu": ["09.00-10.00", "15.00-17.30"], "Kamis": [], "Jumat": ["07.30-10.00", "10.00-12.30"] }},
    { n: "Septia Virginia", j: { "Senin": ["10.00-12.30", "12.30-15.00"], "Selasa": [], "Rabu": ["10.00-12.30", "12.30-15.00"], "Kamis": ["07.30-10.00", "10.00-11.45"], "Jumat": ["07.30-10.00", "15.00-17.30", "17.30-19.30"] }},
    { n: "Bintang Adinda", j: { "Senin": ["10.00-12.30", "15.00-16.45"], "Selasa": ["06.30-07.30", "10.00-12.30", "12.30-15.00", "15.00-17.30"], "Rabu": [], "Kamis": ["07.30-10.00", "10.00-12.30", "12.30-15.00"], "Jumat": [] }},
    { n: "Indy", j: { "Senin": ["10.00-12.30", "13.30-14.30"], "Selasa": ["07.30-10.00", "10.00-12.30", "15.00-17.30"], "Rabu": ["10.00-12.30",], "Kamis": ["07.30-10.00", "10.00-12.30"], "Jumat": [] }}
];

let currentDay = 'Senin';

function setDay(day) {
    currentDay = day;
    document.querySelectorAll('.day-btn').forEach(b => b.classList.toggle('active', b.innerText === day));
    render();
}

function render() {
    const query = document.getElementById('search').value.toLowerCase();
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    let filtered = data.filter(item => item.n.toLowerCase().includes(query));

    // Logika SORTING: Free Seharian di atas
    filtered.sort((a, b) => {
        const aFree = (a.j[currentDay] || []).length === 0;
        const bFree = (b.j[currentDay] || []).length === 0;
        return bFree - aFree;
    });

    filtered.forEach(item => {
        const busy = item.j[currentDay] || [];
        const isFree = busy.length === 0;
        const card = document.createElement('div');
        card.className = `card ${isFree ? 'is-free' : 'is-busy'}`;
        card.innerHTML = `
            <div style="font-size: 0.7em; font-weight: bold; color: ${isFree ? 'var(--s)' : 'var(--d)'}">
                ${isFree ? '🟢 FREE SEHARIAN' : '🔴 ADA KULIAH'}
            </div>
            <h3>${item.n}</h3>
            <div>${isFree ? '<span class="free-text">Siap menerima inpo bolo </span>' : busy.map(t => `<span class="time-tag">${t}</span>`).join('')}</div>
        `;
        grid.appendChild(card);
    });
}

// Start
setDay('Senin');