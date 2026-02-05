const profiles = [
    {
        name: "Jirayu Thongchothaung",
        tag: "Cyber Security & Game Developer",
        bio: "asdadadadadasadasdadasdadassdadadasd",
        img: "https://picsum.photos/400/400?grayscale",
        skills: ["none", "none", "none", "none"],
        email: "mailto:second@example.com",
        github: "https://github.com/jirayu",
        projects: [
            { title: "none", desc: "none", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=500" },
            { title: "none", desc: "none", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500" }
        ]
    },
    {
        name: "Jarugit Srisuchat",
        tag: "Full Stack Developer",
        bio: "asdadadadadasadasdadasdadassdadadasd",
        img: "https://picsum.photos/400/400?id=2",
        skills: ["none", "none", "none"],
        email: "mailto:second@example.com",
        github: "https://github.com/Jarugit",
        projects: [
            { title: "none", desc: "none", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=500" },
            { title: "none", desc: "none", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500" }
        ]
    }
];

let currentSection = 0;
let activeProfile = 0;
let isMoving = false;

const wrap = document.getElementById('wrap');
const dots = document.querySelectorAll('.dot');

function updateView() {
    wrap.style.transform = `translateY(-${currentSection * 100}vh)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSection));
    setTimeout(() => { isMoving = false; }, 850);
}

function navigate(direction) {
    if (isMoving) return;
    if (direction === 'down' && currentSection < 2) {
        isMoving = true; currentSection++; updateView();
    } else if (direction === 'up' && currentSection > 0) {
        isMoving = true; currentSection--; updateView();
    }
}

window.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) < 30) return;
    navigate(e.deltaY > 0 ? 'down' : 'up');
}, { passive: false });

function renderProjects(index) {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = profiles[index].projects.map(proj => `
        <div class="card">
            <img class="card-img" src="${proj.img}">
            <div class="info">
                <h3>${proj.title}</h3>
                <p>${proj.desc}</p>
            </div>
            <div class="hover-text">
                <strong>${proj.title}</strong>
                <p style="margin-top:10px">${proj.desc}</p>
                <a href="#" class="read-more" style="color:var(--p); background:white; text-decoration:none; padding:8px 20px; border-radius:50px; margin-top:15px; font-weight:700;">VIEW</a>
            </div>
        </div>
    `).join('');
}

function switchProfile() {
    currentSection = 0; 
    updateView();

    activeProfile = activeProfile === 0 ? 1 : 0;
    const data = profiles[activeProfile];
    const content = document.getElementById('profile-content');
    
    content.classList.add('fade-hide');
    
    setTimeout(() => {
        document.getElementById('p-name').innerText = data.name;
        document.getElementById('p-tag').innerText = data.tag;
        document.getElementById('p-bio').innerHTML = data.bio;
        document.getElementById('p-img').src = data.img;
        document.getElementById('p-email').href = data.email;
        document.getElementById('p-git').href = data.github;
        document.getElementById('toggle-text').innerText = `Switch to ${activeProfile === 0 ? 'Jarugit' : 'Jirayu'}`;
        
        document.getElementById('p-skills').innerHTML = data.skills.map(s => `<span class="skill-badge">${s}</span>`).join('');
        renderProjects(activeProfile);
        
        content.classList.remove('fade-hide');
    }, 400);
}

renderProjects(0);