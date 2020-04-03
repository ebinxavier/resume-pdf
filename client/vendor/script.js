function redirect(template){
    location.href = '/form.html?template='+template
}


// Image Uplopad functions
$(".imgAdd").click(function(){
    $(this).closest(".row").find('.imgAdd').before('<div class="col-sm-2 imgUp"><div class="imagePreview"></div><label class="btn btn-primary">Upload<input type="file" class="uploadFile img" value="Upload Photo" style="width:0px;height:0px;overflow:hidden;"></label><i class="fa fa-times del"></i></div>');
  });
  $(document).on("click", "i.del" , function() {
      $(this).parent().remove();
  });
  $(function() {
      $(document).on("change",".uploadFile", function()
      {
              var uploadFile = $(this);
          var files = !!this.files ? this.files : [];
          if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
   
          if (/^image/.test( files[0].type)){ // only image file
              var reader = new FileReader(); // instance of the FileReader
              reader.readAsDataURL(files[0]); // read the local file
   
              reader.onloadend = function(){ // set image data as background of div
                  //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
  uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url("+this.result+")");
              }
          }
        
      });
  });

//   Image Upload functions ends
var skillCounter = 1;
function addSkillSection(){
    var card = `<div class="card form-group" id="skill${skillCounter}">
        <button onclick="removeSkillSection(${skillCounter})" type="button" class="btn btn-danger closeBtn">x</button>
        <div class="card-body">
        <div class="form-group col-sm-3">
            <label for="skill-category${skillCounter}">Skill Category</label>
            <input id="skill-category${skillCounter}" class="form-control" type="text" placeholder="Enter the skill category">
        </div>
        <div class="form-group col-sm-12">
            <label for="skill-tags${skillCounter}">Skills</label>
            <input id="skill-tags${skillCounter}" class="tags" type="text" value="" placeholder="Enter skills">
        </div>
        </div>
    </div>`;

    skillCounter++;

    $('#skill-collection').append(card);
    $('.tags').tagsinput({
        maxTags: 3
    });
}

function removeSkillSection(id){
    $('#skill'+id).remove();
}
