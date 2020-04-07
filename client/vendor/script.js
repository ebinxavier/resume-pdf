// Image Uplopad functions
var imageBase64="";
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
                  imageBase64 = this.result;
  uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url("+this.result+")");
              }
          }
        
      });
  });

//   Image Upload functions ends


// DatePicker

$('#datepicker-from-0').datepicker({
    uiLibrary: 'bootstrap4'
});

$('#datepicker-to-0').datepicker({
    uiLibrary: 'bootstrap4'
});


// Date picker ends

var keypointCounter = [];
function addKeyPoint(id, value, event){ // ParentId, id of value input
    event.preventDefault();
    if(event.type!=='click') return
    if(!$(`#${value}`).val()) return;
    var expreienceIndex = Number(id[id.length-1]);
    if(!keypointCounter[expreienceIndex]){
        keypointCounter[expreienceIndex] = 0;
    }
    var li = `<li>
    ${$(`#${value}`).val()}
    <button onclick="removeKeyPoint(this)" type="button" class="btn-sm btn-danger closeBtnLi">x</button>
    </li>`;
    $(`#${id}`).append(li);
    $(`#${value}`).val('');
    keypointCounter[expreienceIndex]++;
}

function removeKeyPoint(thisButton){
    thisButton.parentElement.remove()
}


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
        maxTags: 10
    });
}

function removeSkillSection(id){
    $('#skill'+id).remove();
}


var experienceCounter=1;
function addExperienceSection(){
    var card = `
    <div class="card form-group" id="experience${experienceCounter}">
            <button onclick="removeExperienceSection(${experienceCounter})" type="button" class="btn btn-danger closeBtn">x</button>
            <div class="card-body row">
              <div class="form-group col-sm-6">
                <label for="designatin${experienceCounter}">Designation</label>
                <input id="designatin${experienceCounter}" class="form-control" type="text" placeholder="Enter the Designation">
              </div>
              <div class="form-group col-sm-6">
                <label for="organization${experienceCounter}">Organization</label>
                <input id="organization${experienceCounter}" class="form-control" type="text" placeholder="Enter the Organization">
              </div>
              <div class="form-group col-sm-3">
                <label for="experience-datepicker-from-${experienceCounter}">From Date</label>
                <input id="experience-datepicker-from-${experienceCounter}" placeholder="Select Date" class="form-control" />
              </div>
              <div class="form-group col-sm-3">
                <label for="experience-datepicker-to-${experienceCounter}">To Date</label>
                <input id="experience-datepicker-to-${experienceCounter}" placeholder="Select Date" class="form-control" />
                <small id="experience-datepicker-to-${experienceCounter}" class="form-text text-muted">Leave Empty if you are working here</small>
              </div>

              <div class="form-group col-sm-12">
                <label for="description${experienceCounter}">Job Description</label>
                <textarea placeholder="Describe your Job briefly" class="form-control" id="description${experienceCounter}" rows="3"></textarea>
              </div>
  
              <div class="form-group col-sm-12">
              <div class="input-group mb-3">
                <input type="text" id="key-point${experienceCounter}" class="form-control" placeholder="Add Key point">
                <div class="input-group-append">
                <button onclick="addKeyPoint('key-points${experienceCounter}','key-point${experienceCounter}', event)" class="btn btn-success">Add</button>
                </div>
              </div>
              </div>
              <ul id="key-points${experienceCounter}">
              </ul>

            </div>
          </div>`; 
          experienceCounter++;
          $('#experience-collection').append(card);
}
function removeExperienceSection(id){
    $('#experience'+id).remove();
}

var educationCounter=1;
function addEducationSection(){
    var card = `<div class="card form-group" id="education${educationCounter}">
            <button onclick="removeEducationSection(${educationCounter})" type="button" class="btn btn-danger closeBtn">x</button>
            <div class="card-body row">
              <div class="form-group col-sm-6">
                <label for="education-course${educationCounter}">Course</label>
                <input id="education-course${educationCounter}" class="form-control" type="text" placeholder="Enter the Education (eg: B.Tech Computer Science) ">
              </div>
              <div class="form-group col-sm-6">
                <label for="education-college${educationCounter}">College</label>
                <input id="education-college${educationCounter}" class="form-control" type="text" placeholder="Enter the name of College / Organization">
              </div>
              <div class="form-group col-sm-3">
                <label for="education-datepicker-from-${educationCounter}">From Date</label>
                <input id="education-datepicker-from-${educationCounter}" placeholder="Select Date" class="form-control" />
              </div>
              <div class="form-group col-sm-3">
                <label for="education-datepicker-to-${educationCounter}">To Date</label>
                <input id="education-datepicker-to-${educationCounter}" placeholder="Select Date" class="form-control" />
                <small id="education-datepicker-to-${educationCounter}" class="form-text text-muted">Leave Empty if you are working here</small>
              </div>
              <div class="form-group col-sm-12">
                <label for="education-description${educationCounter}">Description</label>
                <textarea placeholder="Describe your education briefly" class="form-control" id="education-description${educationCounter}" rows="3"></textarea>
              </div>
            </div>
          </div>`;
          educationCounter++;
          $('#education-collection').append(card);
}

function removeEducationSection(id){
    $('#education'+id).remove();
}

function addInterest(){ 
    event.preventDefault();
    if(!$(`#interests`).val()) return;
    var li = `<li>
    ${$(`#interests`).val()}
    <button onclick="removeInterest(this)" type="button" class="btn-sm btn-danger closeBtnLi">x</button>
    </li>`;
    $(`#interest-points`).append(li);
    $(`#interests`).val('');
}

function removeInterest(thisButton){
    thisButton.parentElement.remove()
}


function downloadPDF(){
    $("#loader").css({display:"inline-block"})
    var payload = { 
        "name": $("#name").val(),
        "profileImage":imageBase64,
        "title": $("#title").val(),
        "address": [$("#address1").val(), $("#address2").val(),$("#address3").val()],
        "phone":$("#mobile").val(),
        "email":$("#emailId").val(),
        "description":$("#description").val(),
        "interests": Array.from($("#interest-points").children()).map(e=>e.innerText.split(' x')[0])
    }

    var skills = {};
    for(var i=0;i<$("#skill-collection").children().length;i++){
        skills[$("#skill-category"+i).val()] = $("#skill-tags"+i).val().split(',').map(e=>e.trim());
    }
    payload.skills = skills;

    var workExperience = [];
    for(var i=0;i<$("#experience-collection").children().length;i++){
        var experience = {
            designation: $("#designatin"+i).val(),
            organization: $("#organization"+i).val(),
            description: $("#description"+i).val(),
            fromDate:$("#experience-datepicker-from-"+i).val(),
            toDate:$("#experience-datepicker-to-"+i).val() || 'Present',
            points: Array.from($("#key-points"+i).children()).map(e=>e.innerText.split(' x')[0])
        }
        workExperience.push(experience);
    }
    payload.workExperience = workExperience;


    var education = [];
    for(var i=0;i<$("#education-collection").children().length;i++){
        var edu = {
            course: $("#education-course"+i).val(),
            organization: $("#education-college"+i).val(),
            fromDate: $("#education-datepicker-from-"+i).val(),
            toDate: $("#education-datepicker-to-"+i).val(),
            info: $("#education-description"+i).val(),
        }
        education.push(edu);
    }
    payload.education = education;

    (async () => {
        const pdf = await fetch('http://localhost:3000/api/pdf', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({template:"simple", data: payload})
        });
        const blob = await pdf.blob();
        var link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        link.download="resume.pdf";
        link.click();
        $("#loader").css({display:"none"})
      })();
}