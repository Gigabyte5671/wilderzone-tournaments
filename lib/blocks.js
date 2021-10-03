var blocks = {
  parseURL: function(url){
    if(url.includes("{WL}")){
      var output = 'https://wilderzone.live/' + url.split("{WL}")[1];
    }else{
      var output = url;
    }
    return output;
  },

  general: function(tag, classlist, content){
    var block = '<' + tag + ' class="' + classlist + '">' + content + '</' + tag + '>';
    return block;
  },

  left_banner: function(url){
    var block = '<img class="banner_image" src="' + this.parseURL(url) + '" draggable="false">';
    return block;
  },

  background_image: function(url){
    var block = '<background_image style="background-image:linear-gradient(270deg, #00000000 0%, #000000 70%), url(' + this.parseURL(url) + ');"></background_image>';
    return block;
  },

  h1: function(string){
    var block = '<h1>' + string + '</h1>';
    return block;
  },

  h2: function(string){
    var block = '<h2>' + string + '</h2>';
    return block;
  },

  h3: function(string){
    var block = '<h3>' + string + '</h3>';
    return block;
  },

  info: function(string){
    var block = '<info>' + string + '</info>';
    return block;
  },

  paragraph: function(string){
    var block = '<p>' + string + '</p>';
    return block;
  },

  multi_paragraph: function(array){
    var block = '';
    array.forEach(element => {
      block += this.paragraph(element);
    });
    return block;
  },

  imgdented_paragraph: function(url, string){
    var block = '<p><img src="' + this.parseURL(url) + '" draggable="false">' + string + '</p>';
    return block;
  },

  signup_form: function(){
    var block = '<p></p><p>Sign up to participate:</p>'
              + '<form action="/action_page.php">'
              +   '<input type="text" placeholder="Username..."><br><br>'
              +   '<input type="text" placeholder="Password..."><br><br>'
              +   '<input type="submit" value="Submit">'
              + '</form>';
    return block;
  }
}