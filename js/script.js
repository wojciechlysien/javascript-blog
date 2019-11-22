{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };

  const opts = {
    ArticleSelector = '.post',
    TitleSelector = '.post-title',
    TitleListSelector = '.titles',
    ArticleTagsSelector = '.post-tags .list',
    ArticleAuthorSelector = '.post-author',
    ArticleAuthorSelectorA = '.post-author a',
    AuthorsListSelector = '.list.authors a',
    TagsListSelector = '.tags.list',
    CloudClassCount = 5,
    CloudClassPrefix = 'tag-size-',
  }
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
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    // get 'href' attribute from the clicked link /
    const articleSelector = clickedElement.getAttribute('href');

    // find the correct article using the selector (value of 'href' attribute) /
    const targetArticle = document.querySelector(articleSelector);


    // add class 'active' to the correct article /
    targetArticle.classList.add('active');

  };
  // const links = document.querySelectorAll('.titles a');

  // for (let link of links) {
  //   link.addEventListener('click', titleClickHandler);
  // }

  function generateTitleLinks(customSelector = '') {
    // remove contents of titleList /
    const titleList = document.querySelector(opt.TitleListSelector);

    // for each article /
    const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);
    let html = '';

    for (let article of articles) {

      // get the article id /
      const articleId = article.getAttribute('id');

      // find the title element /
      const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;

      // create HTML of the link /
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);

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

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 99999,
    };
    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  function calculateTagsClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
    const classAndValueNumber = opt.cloudClassPrefix + classNumber;
    return classAndValueNumber;
  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    // find all articles /
    const articles = document.querySelectorAll(opt.ArticleSelector);

    // START LOOP: for every article: /
    for (let article of articles) {

      // find tags wrapper /
      const tagList = article.querySelector(opt.ArticleTagsSelector);
      // tagList.innerHTML = '';

      // make html variable with empty string /
      let html = '';

      // get tags from data-tags attribute /
      const articleTags = article.getAttribute('data-tags');

      // split tags into array /
      const articleTagsArray = articleTags.split(' ');
      // START LOOP: for each tag /

      for (let tag of articleTagsArray) {
        // generate HTML of the link /
        // const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        const linkHTMLData = { id: tag, title: tag };
        const linkHtml = templates.articleLink(linkHTMLData);

        // add generated code to html variable /
        html = html + linkHtml;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        // END LOOP: for each tag /
      }
      // insert HTML of all the links into the tags wrapper /
      tagList.innerHTML = html;

      // END LOOP: for every article: /
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags ');
    const tagsParams = calculateTagsParams(allTags);

    /* [NEW] create variable for all links HTML code */
    const allTagsData = { tags: [] };

    /*[NEW] START LOOP: for each tag in allTAgs:*/
    for (let tag in allTags) {
      /*[NEW] generate code of a link and add it to allTagsHTML*/
      // allTagsHTML += tag + '(' + allTags[tag] + ')';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagsClass(allTags[tag], tagsParams)
      });
      // console.log()

      /*[NEW] END LOOP: for each tag in allTAgs:*/
    }
    /*[NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

  generateTags();

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
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');
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
    const tags = document.querySelectorAll(opt.ArticleTagsSelector + ' , ' + opt.TagsListSelector)
    /* START LOOP: for each link */
    for (let tag of tags) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', titleClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors() {
    /* [NEW][NEW] create a new variable allAuthors with an conempty object */
    let allAuthors = {};
    // find all articles /
    const articles = document.querySelectorAll('article');

    // START LOOP: for every article: /
    for (let article of articles) {

      // find tags wrapper /
      const autorList = article.querySelector(opt.ArticleAuthorSelector);

      // make html variable with empty string /
      let html = '';

      // get tags from data-author attribute /
      const articleAuthors = article.getAttribute('data-author');

      // generate HTML of the link /
      // const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      const linkHTMLData = { id: articleAuthors, title: articleAuthors };
      const authorHtml = templates.articleLink(linkHTMLData);

      // add generated code to html variable /
      html = html + authorHtml;

      /* [NEW] check if this link is NOT alredy in allAuthors */

      if (!allAuthors.hasOwnProperty(articleAuthors)) {

        /* [NEW add generated code to allAuthors array] */
        allAuthors[articleAuthors] = 1;
      } else {
        allAuthors[articleAuthors]++;
      }

      // END LOOP: for each tag /
      autorList.innerHTML = html;
      // insert HTML of all the links into the tags wrapper /

      // END LOOP: for every article: /
    }
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector('.authors');

    /* [NEW] create variable for all links HTML code*/
    const allAuthorsData = { authors: [] };

    /* [NEW] START LOOP for each authors on allAuthors */
    for (let author in allAuthors)
      /* [NEW] generate code of a link and aad it to allAuthorsHTML */

      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
    /* [NEW] add html from allAuthorsHTML to authorList */
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);  //to authorList inside HTML put corect HTML
  }
  generateAuthor();

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

    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-authors="' + author + '"]');
  };


  function addClickListenersToAuthors() {
    const authors = document.querySelectorAll(opt.ArticleAuthorSelectorA + ' , ' + opt.AuthorsListSelector);

    for (let author of authors) {
      author.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors()

}

