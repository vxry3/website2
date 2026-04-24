// Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Cursor grow on hover
document.querySelectorAll('a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
    cursor.style.background = "rgba(56,189,248,0.3)";
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.background = "transparent";
  });
});

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// GitHub API
const username = "YOUR_GITHUB_USERNAME";
const container = document.getElementById("repo-container");

fetch(`https://api.github.com/users/${username}/repos`)
  .then(res => res.json())
  .then(data => {
    data
      .sort((a,b) => b.stargazers_count - a.stargazers_count)
      .forEach((repo, i) => {

        const div = document.createElement("div");
        div.className = "repo hidden";
        div.style.transitionDelay = `${i * 0.08}s`;

        div.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description provided"}</p>
          <p>⭐ ${repo.stargazers_count} | ${repo.language || "N/A"}</p>
          <a href="${repo.html_url}" target="_blank">View Project →</a>
        `;

        container.appendChild(div);
        observer.observe(div);
      });
  });