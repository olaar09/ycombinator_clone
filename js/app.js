var url = 'https://api.github.com/';
function newRow (numOfComments) {
  return `
    <div class="home__content-row">
      <span>1. </span>
      <span class="home__content-row-icon" />
      <div class="home__content-row_title">
        <p class="home__content-row_title-text">
          Mazda is purging touchscreens from its vehicles
          <span> (motorauthority.com) </span>
        </p>
        <div class="home__content-row_title-misc">
          <span>
            554 points
            <a href="#">by meteor333</a>
            <a href="#">5 hours ago</a>
            <span> | </span>
          </span>

          <a href="#"> hide</a>
          <span> | </span>
          <a> 254 comments</a>
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
      var contentSection = document.querySelector ('home__content');
      var news = JSON.parse (this.responseText);
      console.log (news);
    }
  };
  xhttp.open ('GET', url, true);
  xhttp.send ();
}

getTop30 ();
