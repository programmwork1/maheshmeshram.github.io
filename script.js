// mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));
}

// navbar transparent -> solid on scroll
const navbar = document.getElementById('navbar');
function setNavbarState(){
  if(!navbar) return;
  if(window.scrollY > 60) {
    navbar.classList.remove('transparent');
    navbar.classList.add('solid');
  } else {
    // on home we want transparent at top
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
window.addEventListener('load', () => {
  setNavbarState();
  // load skills if skills.json exists
  const skillsListElem = document.getElementById('skills-list');
  if(skillsListElem){
    fetch('skills.json')
      .then(r => {
        if(!r.ok) throw new Error('skills.json not found');
        return r.json();
      })
      .then(list => {
        skillsListElem.innerHTML = '';
        list.forEach(s => {
          const span = document.createElement('span');
          span.className = 'skill';
          span.textContent = s;
          skillsListElem.appendChild(span);
        });
      })
      .catch(err => {
        // fallback: inline default skills if JSON missing
        const defaultSkills = ["Inflight Catering","HACCP Compliance","Team Management","Logistics Coordination","Customer Service","Ramp Operations"];
        skillsListElem.innerHTML = '';
        defaultSkills.forEach(s => {
          const span = document.createElement('span');
          span.className = 'skill';
          span.textContent = s;
          skillsListElem.appendChild(span);
        });
      });
  }
});