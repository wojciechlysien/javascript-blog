{
  'use strict';

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optArticleAuthorSelectorA = '.post-author a',
    optAuthorsListSelector = '.list.authors a';

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    // remove class 'active' from all article links /

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    // add class 'active' to the clicked link /
    clickedElement.classList.add('active');


    // remove class 'active' from all articles /
    const activeArticles = document.querySelectorAll('.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    // get 'href' attribute from the clicked link /
    const articleSelector = clickedElement.hash;

    // find the correct article using the selector (value of 'href' attribute) /

    const targetArticle = document.querySelector(articleSelector);


    // add class 'active' to the correct article /
    targetArticle.classList.add('active');
    // console.log('targetArticle');
  }
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  function generateTitleLinks(customSelector = '') {
    // remove contents of titleList /
    const titleList = document.querySelector(optTitleListSelector);

    // for each article /
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      // get the article id /
      const articleId = article.getAttribute('id');

      // find the title element /
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      // get the title from the title element /

      // create HTML of the link /
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      // insert link into titleList /
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '').replace('#', '');;
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    // console.log(tagLinks);
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(`a[href^="#tag-${tag}"]`);
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* xecute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tags = document.querySelectorAll(optArticleTagsSelector)
    /* START LOOP: for each link */
    for (let tag of tags) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', titleClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors() {
    // find all articles /
    const articles = document.querySelectorAll('article');

    // START LOOP: for every article: /
    for (let article of articles) {

      // find tags wrapper /
      const autorList = article.querySelector(optArticleAuthorSelector);

      // make html variable with empty string /
      let html = '';

      // get tags from data-author attribute /
      const articleAuthors = article.getAttribute('data-author');

      // generate HTML of the link /
      const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      // add generated code to html variable /
      html = html + tagHtml;

      // END LOOP: for each tag /
      autorList.innerHTML = html;
      // insert HTML of all the links into the tags wrapper /

      // END LOOP: for every article: /
    }
  }

  function authorClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const author = href.replace('#author-', '').replace('#', '');

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    for (let activeAuthor of activeAuthors) {

      activeAuthor.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');

    for (authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-authors="' + author + '"]');
  };


  function addClickListenersToAuthors() {
    const authors = document.querySelectorAll(optArticleAuthorSelectorA + ' , ' + optAuthorsListSelector);

    for (let author of authors) {
      author.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors()
}

