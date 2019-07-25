$(document).on("click", ".submit", function() {
  if ($(this).text() === "saved") {
    return;
  }
  let saveObj = {}
  let id = $(this).attr("id");
  // console.log(id);
  saveObj.imageSrc = $(`#image${id}`).attr("src");
  saveObj.title = $(`#title${id}`).text();
  saveObj.summary = $(`#summary${id}`).text();
  saveObj.link = $(`#link${id}`).attr("href");
  // console.log(saveObj);
  $(this).text("saved")
  $.post("/saved", saveObj, function(res) {
    console.log("got a post response")
  })

})

$(document).on("click", ".addNote", () => {
  let = $(this).attr("id");
})