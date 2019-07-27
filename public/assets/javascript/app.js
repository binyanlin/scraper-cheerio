var id;

$(document).on("click", ".submit", function() {
  let current = $(this);
  if ($(this).text() === "Saved") {
    return;
  }
  let saveObj = {}
  id = $(this).attr("id");
  // console.log(id);
  saveObj.imageSrc = $(`#image${id}`).attr("src");
  saveObj.title = $(`#title${id}`).text();
  saveObj.summary = $(`#summary${id}`).text();
  saveObj.link = $(`#link${id}`).attr("href");
  saveObj.DOMId = id;
  // console.log(saveObj);
  $(this).text("Saved")
  current.siblings(".btn").removeAttr("disabled")
  $.post("/saved", saveObj, function(res) {
    // console.log("got a post response")
  })

})

$(document).on("click", ".addNote", function() {
  // console.log($(this).hasClass("disabled"));
  // if ($(this).hasClass("disabled") == "true") {
  //     break;
  // }
  id = $(this).attr("id");
  console.log(id)
  $(`#modal`).modal('toggle');

  let saveObj = {}

  saveObj.imageSrc = $(`#image${id}`).attr("src");
  saveObj.title = $(`#title${id}`).text();
  saveObj.summary = $(`#summary${id}`).text();
  saveObj.link = $(`#link${id}`).attr("href");
  console.log("The object for clicking on note:" + JSON.stringify(saveObj, null, 2))
  $(`#modal`).modal('toggle');
  $.post("/checkNote", saveObj, function(data) {
    // console.log("response data: "+ JSON.stringify(data, null, 2));
    console.log("data for the note: "+ JSON.stringify(data.note,null,2));
    $("#modal-title").val(data.note.noteTitle);
    $("#modal-body").val(data.note.noteBody);
  })

})

//save note and update
$(document).on("click", "#modalSave", () => {
  
  let noteTitle=$("#modal-title").val();
  let noteBody = $("#modal-body").val();
  let saveObj = {}

  saveObj.imageSrc = $(`#image${id}`).attr("src");
  saveObj.title = $(`#title${id}`).text();
  saveObj.summary = $(`#summary${id}`).text();
  saveObj.link = $(`#link${id}`).attr("href");
  saveObj.noteTitle = noteTitle;
  saveObj.noteBody = noteBody;
  saveObj.DOMId = id;

  $.post("/saveNote", saveObj, function(res) {
    console.log("got a response from saveNote")
    // console.log(res);
  })

  $("#modal-title").val("");
  $("#modal-body").val("");
  $(`#modal`).modal('toggle');
  
  id = ""; //resets id
})

$('#modal').on('hidden.bs.modal', function () {
  $("#modal-title").val("");
  $("#modal-body").val("");
})
