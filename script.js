const username = "YOUR_GITHUB_USERNAME";
const container = document.getElementById("repo-container");

let allRepos = [];

// Fetch repos
fetch(`https://api.github.com/users/${username}/repos`)
  .then(res => res.json())
  .then(data => {
    allRepos = data;
    displayRepos(data);
  });

// Display function
function displayRepos(repos) {
  container.innerHTML = "";

  repos
    .sort((a,b) => b.stargazers_count - a.stargazers_count)
    .forEach((repo, i) => {

      const div = document.createElement("div");
      div.className = "repo hidden";
      div.style.transitionDelay = `${i * 0.05}s`;

      div.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided"}</p>
        <p>⭐ ${repo.stargazers_count} • ${repo.language || "Unknown"}</p>
        <a href="${repo.html_url}" target="_blank">View →</a>
      `;

      container.appendChild(div);
      observer.observe(div);
    });
}

// Filter function
function filterRepos(language) {
  if (language === "all") {
    displayRepos(allRepos);
  } else {
    const filtered = allRepos.filter(repo => repo.language === language);
    displayRepos(filtered);
  }
}