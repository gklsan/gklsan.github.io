// First, include the JS-YAML library in your HTML
// <script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js"></script>

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch the YAML file
    const response = await fetch('content/content.yml');
    const yamlText = await response.text();
    
    // Parse YAML content
    const content = jsyaml.load(yamlText);
    
    // Populate navigation
    populateNavigation(content.navigation);
    
    // Populate hero section
    populateHero(content.hero);
    
    // Populate open source section
    populateOpenSource(content.open_source);
    
    // Populate skills section
    populateSkills(content.skills);
    
    // Populate services section
    populateServices(content.services);
    
    // Populate blog articles
    populateBlog(content.blog);
    
    // Populate footer
    populateFooter(content.footer);

    // Setup scroll highlighting after everything is populated
    setupScrollHighlighting();
    
  } catch (error) {
    console.error('Error loading YAML data:', error);
  }
});

function populateNavigation(navItems) {
  const navLinksContainer = document.querySelector('.nav-links');
  if (!navLinksContainer) return;
  
  navLinksContainer.innerHTML = '';
  
  navItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.text;
    navLinksContainer.appendChild(link);
  });
}

function populateHero(heroData) {
  if (!heroData) return;
  
  // Set greeting
  const greetingEl = document.querySelector('.hero-content .greeting');
  if (greetingEl) greetingEl.textContent = heroData.greeting;
  
  // Set name
  const nameEl = document.querySelector('.hero-content h1');
  if (nameEl) nameEl.textContent = heroData.name;
  
  // Set descriptions
  const descEls = document.querySelectorAll('.hero-content p');
  if (descEls.length >= 1) descEls[0].textContent = heroData.description1;
  if (descEls.length >= 2) descEls[1].textContent = heroData.description2;
  
  // Set social links
  const socialContainer = document.querySelector('.social-icons');
  if (socialContainer && heroData.social_links) {
    socialContainer.innerHTML = '';
    
    heroData.social_links.forEach(link => {
      const socialLink = document.createElement('a');
      socialLink.href = link.href;
      
      const icon = document.createElement('i');
      icon.className = link.icon;
      
      socialLink.appendChild(icon);
      socialContainer.appendChild(socialLink);
    });
  }
}

function populateOpenSource(projects) {
  const osContainer = document.querySelector('#open-source .os-services-grid');
  if (!osContainer) return;
  
  osContainer.innerHTML = '';
  
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'service-card';
    
    let badgeHtml = '';
    if (project.badge_src && project.badge_href) {
      badgeHtml = `
        <a href="${project.badge_href}">
          <img src="${project.badge_src}" alt="${project.title} Gem Version" height="18">
        </a> 
      `;
    }

    if (project.badge_download && project.badge_href) {
      badgeHtml += `
        <a href="${project.badge_href}">
          <img src="${project.badge_download}" alt="${project.title} Gem Downloads" height="18">
        </a>
      `;
    }
    
    card.innerHTML = `
      <a href="${project.href}">
        <h3>${project.title}</h3>
      </a>
      ${badgeHtml}
    `;
    
    osContainer.appendChild(card);
    osContainer.appendChild(document.createElement('br'));
  });
}

function populateSkills(skills) {
  const skillsContainer = document.querySelector('#skills .skills-grid');
  if (!skillsContainer || !skills) return;
  
  skillsContainer.innerHTML = '';
  
  skills.forEach(skill => {
    const skillTag = document.createElement('div');
    skillTag.className = 'skill-tag';
    skillTag.textContent = skill;
    skillsContainer.appendChild(skillTag);
  });
}

function populateServices(services) {
  const servicesContainer = document.querySelector('#services .os-services-grid');
  if (!servicesContainer) return;
  
  servicesContainer.innerHTML = '';
  
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service-card';
    
    card.innerHTML = `
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    `;
    
    servicesContainer.appendChild(card);
  });
}

function populateBlog(blogData) {
  if (!blogData) return;
  
  // Set blog intro
  const blogIntro = document.querySelector('#blog .container > p');
  if (blogIntro) blogIntro.textContent = blogData.intro;
  
  // Set blog articles
  const blogContainer = document.querySelector('#blog .blog-services-grid');
  if (!blogContainer || !blogData.articles) return;
  
  blogContainer.innerHTML = '';
  
  blogData.articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'service-card';
    
    card.innerHTML = `
      <a href="${article.href}">
        <h3>${article.title}</h3>
      </a>
    `;
    
    blogContainer.appendChild(card);
  });
}

function populateFooter(footerData) {
  if (!footerData) return;
  
  const copyrightEl = document.querySelector('.footer-content .copyright');
  if (copyrightEl) copyrightEl.textContent = footerData.copyright;
}

function setupScrollHighlighting() {
  // Get all sections that should be tracked for scrolling
  const sections = Array.from(document.querySelectorAll('section[id]'));

  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-links a');

  // Function to handle scroll events
  function handleScroll() {
    // Get current scroll position
    const scrollPosition = window.scrollY + 100; // Adding offset for better UX

    // Check which section is currently in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to the link that matches the current section
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Call handleScroll initially to set the active link on page load
  handleScroll();
}
