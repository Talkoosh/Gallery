'use strict';

$(init);

function init() {
    renderPortfolio();
}

function renderPortfolio() {
    var strHTML = '';
    const projects = getProjects();

    projects.forEach(function (project) {
        strHTML += `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${project.title}</h4>
          <p class="${project.desc}">Illustration</p>
        </div>
      </div>`
    })
}