// Unified site script: mobile menu, navbar scroll, skills loader, profile & resume checks

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));
}

// Navbar transparent -> solid on scroll
const navbar = document.getElementById('navbar');
function setNavbarState(){
  if(!navbar) return;
  if(window.scrollY > 60) {
    navbar.classList.remove('transparent');
    navbar.classList.add('solid');
  } else {
    if(document.body.classList.contains('home')){
      navbar.classList.remove('solid');
      navbar.classList.add('transparent');
    } else {
      navbar.classList.remove('transparent');
      navbar.classList.add('solid');
    }
  }
}
window.addEventListener('scroll', setNavbarState);
window.addEventListener('load', setNavbarState);

// PROFILE IMAGE fallback
(function handleProfileImage(){
  const img = document.querySelector('.profile-pic');
  if(!img) return;
  // If image fails to load, replace with inline SVG avatar with initials "MM"
  img.addEventListener('error', () => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'>
      <rect width='100%' height='100%' fill='%231a73e8'/>
      <text x='50%' y='55%' font-size='96' text-anchor='middle' fill='white' font-family='Arial' font-weight='700'>MM</text>
    </svg>`;
    img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    img.style.objectFit = 'cover';
  });
  // small enhancement: if the image exists but is blank (0x0), replace it after short delay
  setTimeout(()=> {
    if(img.naturalWidth === 0 || img.naturalHeight === 0) {
      img.dispatchEvent(new Event('error'));
    }
  }, 700);
})();

// SKILLS loader - try fetch skills.json (root). If missing -> fallback to full default list
(function loadSkills(){
  const skillsListElem = document.getElementById('skills-list');
  if(!skillsListElem) return;

  function renderSkills(list){
    skillsListElem.innerHTML = '';
    list.forEach(s => {
      const span = document.createElement('span');
      span.className = 'skill';
      span.textContent = s;
      skillsListElem.appendChild(span);
    });
  }

  fetch('skills.json', {cache: 'no-store'})
    .then(r => {
      if(!r.ok) throw new Error('skills.json not found');
      return r.json();
    })
    .then(list => {
      if(!Array.isArray(list)) throw new Error('skills.json format error');
      renderSkills(list);
    })
    .catch(err => {
      console.warn('Could not load skills.json:', err);
      // full fallback list
      const fallback = [
        "Inflight Catering",
        "Food Safety & Hygiene",
        "Team Management",
        "Logistics Coordination",
        "Customer Service",
        "Quality Control",
        "Inventory Management",
        "Time Management",
        "Menu Planning",
        "Supplier Coordination",
        "Operational Compliance",
        "Safety Protocols",
        "Passenger Satisfaction",
        "Event Catering",
        "Problem Solving",
        "Communication Skills",
        "Training & Mentoring",
        "Stock Handling",
        "Process Optimization",
        "Conflict Resolution"
      ];
      renderSkills(fallback);
    });
})();

// RESUME existence & size check (helps detect blank/0-byte file). Appends a visible message if problem found.
(function checkResume(){
  const resumeAnchors = Array.from(document.querySelectorAll('a[href$="Mahesh_Meshram_Resume.pdf"]'));
  if(!resumeAnchors.length) return;

  // prefer to show message inside the resume section if present
  const resumeContainer = document.querySelector('#resume, #resume-section, #resume-section, section#resume');
  fetch('Mahesh_Meshram_Resume.pdf', {method: 'GET', cache: 'no-store'})
    .then(resp => {
      if(!resp.ok) throw new Error('Resume not found (HTTP ' + resp.status + ')');
      return resp.blob();
    })
    .then(blob => {
      // if very small, likely corrupted/empty
      if(blob.size < 1200) {
        resumeAnchors.forEach(a => {
          a.removeAttribute('href');
          a.classList.add('disabled');
        });
        const msg = document.createElement('p');
        msg.style.color = 'crimson';
        msg.style.textAlign = 'center';
        msg.textContent = 'Resume file looks empty or corrupted (size < 1KB). Please re-upload Mahesh_Meshram_Resume.pdf to the repository root.';
        if(resumeContainer) resumeContainer.appendChild(msg);
        console.warn('Resume blob size is suspicious:', blob.size);
      } else {
        // OK — ensure download attribute present
        resumeAnchors.forEach(a => a.setAttribute('download', 'Mahesh_Meshram_Resume.pdf'));
      }
    })
    .catch(err => {
      const msg = document.createElement('p');
      msg.style.color = 'crimson';
      msg.style.textAlign = 'center';
      msg.textContent = 'Resume file not found. Please upload Mahesh_Meshram_Resume.pdf to the repository root.';
      if(resumeContainer) resumeContainer.appendChild(msg);
      console.warn('Error checking resume:', err);
    });
})();