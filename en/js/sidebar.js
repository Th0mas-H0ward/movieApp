`use strict`;

import { api_key, fetchDataFromServer } from "./api.js";

export function sidebar() {

  /**
   * fetch all genres eg: [ { "id", "123", "name", "Action" } ]
   * then change genre formate eg: { 123: "Action" }
   */

  const genreList = {};

  fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=uk-UA`, function ({ genres }) {

    for (const { id, name } of genres) {
      genreList[id] = name;
    }

    genreLink();
  });

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `

  <div class="sidebar-list">
  <p class="title">Жанр</p>

</div>

<div class="sidebar-list">
  <p class="title">Мова</p>

  <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=uk", "Українська")'>Українська</a>

  <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'>English</a>

</div>

<div class="sidebar-footer">
  <p class="copyright">
    Copyright 2023 <a href="https://t.me/ephraim_winslow">Yaroslav Olinkevych</a>
  </p>

  <img src="./images/tmdb-logo.svg" width="130" height="17" alt="the movie database logo">
</div>
  `;

  const genreLink = function () {

    for (const [genreId, genreName] of Object.entries
      (genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "./movie-list.html");
      link.setAttribute("menu-close", "");
       link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", 
        "${genreName}")`);

      link.textContent = genreName;

      sidebarInner.querySelectorAll(".sidebar-list")[0]
      .appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);

  }

  const toggleSidebar = function(sidebar) {

    /**
     * toggle sidebar in mobile screen
     */

    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelectorAll("[overlay]");

    addEventOnElements(sidebarTogglers, "click", function () {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    addEventOnElements(sidebarClose, "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });

  }

}