var url = 'https://www.graphqlhub.com/graphql';
var query =
  '{"query": "{ hn{ topStories(limit: 30, offset: 0){by{id}, score, id,deleted,type, time,url,title, kids{id} } } }"}';
function newRow (serialNum, story) {
  var location = new URL (story.url);
  return `
  <div class="home__content-row">
  <span> ${serialNum}. <span class="home__content-row-icon"></span></span>
  <div class="home__content-row_title">
    <p class="home__content-row_title-text">
      ${story.title}
      <span> (${location.host}) </span>
    </p>
    <div class="home__content-row_title-misc">
      <span>
        ${story.score} points
        <a href="#">by ${story.by.id}</a>
        <a href="#">5 hours ago</a>
        <span> | </span>
      </span>

      <a href="#"> hide</a>
      <span> | </span>
      <a> ${story.kids.length} comments</a>
    </div>
  </div>
</div>`;
}

function getTop30 (str) {
  var xhttp;
  if (str == '') {
    document.getElementById ('txtHint').innerHTML = '';
    return;
  }
  xhttp = new XMLHttpRequest ();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var contentSection = document.querySelector ('.home__content');
      var news = JSON.parse (this.responseText);
      news.data.hn.topStories.forEach ((story, index) => {
        let serialNum = index + 1;
        var row = new DOMParser ().parseFromString (
          newRow (serialNum, story),
          'text/html'
        ).body.childNodes;
        contentSection.appendChild (row[0]);
      });
    }
  };
  xhttp.open ('POST', url, true);
  xhttp.setRequestHeader ('Content-type', 'application/json');
  xhttp.setRequestHeader ('Accept', 'application/json');
  xhttp.send (query);
}

getTop30 ();
