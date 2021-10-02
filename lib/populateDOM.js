var currentPage = 0;

function populateDOM(){
  //Left block buttons
  /* var i = 0;
  tournament_data.tournaments.forEach(element => {
    var item = '<button class="internal_link large_internal_link ' + (i == 0 ? 'active' : '') + '" onclick="changePage(' + i + ')">'
             +   '<img class="round" src="' + element.logo_image + '" draggable="false">'
             +   '<p>' + element.title + '</p>'
             + '</button>';

    $("left_block_inner").append(item);
    i++;
  }); */

  updatecurrentSeriesPage();
}

function updatecurrentSeriesPage(){
  if(currentPage === 0){ //Home page
    //Left block
    if(home_data.banner_image != false){
      $("left_block_inner").empty();
      var item = '<img class="banner_image" src="' + home_data.banner_image + '" draggable="false">';
      $("left_block_inner").append(item);
      $("left_block").removeClass("hidden");
      $("left_block").addClass("a_left_in");
    }else{
      $("left_block").removeClass("a_left_in");
    }

    //Center block
    $("center_block").empty();
    var item = '<background_image style="background-image:linear-gradient(270deg, #00000000 0%, #000000 70%), url(' + home_data.cover_image + ');">'
            + '</background_image>';
    $("center_block").append(item);

    var item = '<center_block_inner>';
    home_data.sections.forEach(element1 => {
      var descriptions = '';
      element1.descriptions.forEach(element2 => {
        descriptions += '<p>' + element2 + '</p>';
      });

      item += '<section class="a_fade_in" style="opacity:0;animation-delay:var(--anim_duration_short)">'
            +   '<h1 style="font-size:34px;">' + element1.title + '</h1>'
            +   descriptions
            + '</section>';
      
    });
    item += '</center_block_inner>';
    $("center_block").append(item);

    //Add the tournament blocks
    var item = '<section style="border:unset;">'
             +   '<p>Live Signups:</p>';
    var tournament_block_added = 0;
    tournament_data.series.forEach(element1 => {
      element1.tournaments.forEach(element2 => {
        if(element2.signups_live === true){
          var casters = '<p><img src="https://wilderzone.live/assets/icons/mic_black_24dp.svg">Casting by '
                      +   oxfordComma(element2.casters)
                      + '</p>';

          item += '<div class="tournament_block a_fade_in" style="opacity:0;animation-delay:var(--anim_duration_short)">'
                +   '<h2>' + element2.title + '</h2>'
                +   '<info>' + element2.start_date + '</info>'
                +   '<p><img src="https://wilderzone.live/assets/icons/person_black_24dp.svg">Hosted by ' + element2.host + '</p>'
                +   casters
                +   '<p><img src="https://wilderzone.live/assets/icons/discord.svg">' + element2.discord + '</p>'
                + '</div>';
          tournament_block_added = 1;
        }
      });
    });
    if(tournament_block_added === 0){
      item +=   '<info>There are currently no live signups...</info>'
            + '</section>';
    }
    $("center_block_inner").append(item);
    
  }else{ //Series pages
    var page_data = tournament_data.series[currentPage - 1];
    
    //Left block
    if(page_data.banner_image != false){
      $("left_block_inner").empty();
      var item = '<img class="banner_image" src="' + page_data.banner_image + '" draggable="false">';
      $("left_block_inner").append(item);
      $("left_block").removeClass("hidden");
      $("left_block").addClass("a_left_in");
    }else{
      $("left_block").removeClass("a_left_in");
    }

    //Center block
    $("center_block").empty();
    var item = '<background_image style="background-image:linear-gradient(270deg, #00000000 0%, #000000 70%), url(' + page_data.cover_image + ');">'
            + '</background_image>';
    $("center_block").append(item);

    var item = '<center_block_inner>';
    page_data.tournaments.forEach(element1 => {
      var descriptions = '';
      element1.descriptions.forEach(element2 => {
        descriptions += '<p>' + element2 + '</p>';
      });

      item += '<section class="a_fade_in" style="opacity:0;animation-delay:var(--anim_duration_short)">'
            +   '<h1>' + element1.title + '</h1>'
            +   '<info>' + element1.start_date + '</info>'
            +   descriptions
            + '</section>';
      
    });
    item += '</center_block_inner>';
    $("center_block").append(item);
  }
}

function changePage(num){
  currentPage = parseInt(num);
  updatecurrentSeriesPage();
}

populateDOM();
