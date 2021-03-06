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
        <a class="portfolio-link" data-toggle="modal" onclick="renderModal('${project.id}')" href="#portfolioModal">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid portfolio-img" src="img/portfolio/${project.id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${project.title} 
          <span class="badge bg-secondary">${project.labels[0]}</span>
          <span class="badge bg-secondary">${project.labels[1]}</span></h4>
          <p class="text-muted">${project.desc}</p>
        </div>
      </div>`
    })
    $('.projects-row').html(strHTML)
}


function renderModal(idStr) {
    const project = getProject(idStr);
    const date = new Date(project.publishedAt);


    const strHTML = `<h2>${project.name}</h2>
    <p class="item-intro text-muted">${project.title}</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.id}.jpg" alt="">
    <p>${project.desc}</p>
    <ul class="list-inline">
      <li>Date Published: ${date.getMonth() + 1} / ${date.getFullYear()}</li>
    </ul>
    <button onclick="onGoToProject('${project.url}')" type="button" class="btn btn-success mb-2">Try it out!</button>
    <br>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>`;
    const $modal = $('#portfolioModal');
    $modal.find('.modal-body').html(strHTML);
}

function onGoToProject(projectURL) {
    window.location.href = projectURL
}

function onSubmitForm() {
    const $elForm = $('#contact').find('form');
    const emailValue = $elForm.find('#email').val();
    const subjValue = $elForm.find('#subject').val();
    var messageValue = $elForm.find('#message').val(); 

    window.location.href = `https://mail.google.com/mail/u/0/?fs=1&to=artishok.tal@gmail.com&su=${subjValue}&body=${emailValue} ${messageValue}&tf=cm`
}