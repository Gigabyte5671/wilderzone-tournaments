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
      $("left_block_inner").append(blocks.left_banner(home_data.banner_image));
      $("left_block").removeClass("hidden");
      $("left_block").addClass("a_left_in");
    }else{
      $("left_block").removeClass("a_left_in");
    }

    //Center block
    $("center_block").empty();
    $("center_block").append(blocks.background_image(home_data.cover_image));

    var item = '';
    home_data.sections.forEach(element => {
      item += blocks.general("section", "a_fade_in",
                blocks.h1(element.title) + blocks.multi_paragraph(element.descriptions));
    });
    $("center_block").append(blocks.general("center_block_inner", "", 
      item
    ));

    //Add the signup blocks
    var item = '<section class="a_fade_in noborder">'
             +   '<p>Live Signups:</p>';
    var tournament_block_added = 0;
    tournament_data.series.forEach(element1 => {
      element1.tournaments.forEach(element2 => {
        if(element2.signups_live === true){
          item += '<div class="tournament_block a_fade_in" style="opacity:0;animation-delay:var(--anim_duration_short)">'
                +   blocks.h3(element2.title)
                +   blocks.info(element2.start_date)
                +   blocks.imgdented_paragraph("{WL}assets/icons/person_black_24dp.svg", "Hosted by " + element2.host)
                +   (element2.casters.length !== 0 ? blocks.imgdented_paragraph("{WL}assets/icons/mic_black_24dp.svg", "Casting by " + oxfordComma(element2.casters)) : '')
                +   blocks.imgdented_paragraph("{WL}assets/icons/discord.svg", element2.discord)
                + '</div>';
          tournament_block_added = 1;
        }
      });
    });
    if(tournament_block_added === 0){
      item +=   blocks.info('There are currently no live signups...')
            + '</section>';
    }
    $("center_block_inner").append(item);
    
  }else{ //Series pages
    var page_data = tournament_data.series[currentPage - 1];
    
    //Left block
    if(page_data.banner_image != false){
      $("left_block_inner").empty();
      $("left_block_inner").append(blocks.left_banner(page_data.banner_image));
      $("left_block").removeClass("hidden");
      $("left_block").addClass("a_left_in");
    }else{
      $("left_block").removeClass("a_left_in");
    }

    //Center block
    $("center_block").empty();
    $("center_block").append(blocks.background_image(page_data.cover_image));

    var item = '<center_block_inner>';
    page_data.tournaments.forEach(element1 => {
      var content = blocks.h2(element1.title)
                  + blocks.info(element1.start_date)
                  + blocks.multi_paragraph(element1.descriptions)
                  + (element1.signups_live == true ? blocks.signup_form() : '');
      item += blocks.general("section", "a_fade_in", content);
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
