//********MODEL********

const $fileSubmitter = $('#fileSubmitter');

const sendFile = (data, success) => {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/",
    data: data,
    contentType: false,
    processData: false,
    success: success || console.log('successfully posted'),
    //dataType: "json"
  });
}

//********VIEW*********

//*****CONTROLLER******


$fileSubmitter.on('submit', (event) => {
  alert('triggered on submit!')
  event.preventDefault();
  let data = $('#jsonFile')[0].files[0];
  let fd = new FormData();
  fd.append('jsonFile', data);
  //console.log(data);
  sendFile(fd);
});

  //prevent default action


  //calls a method in the model to post an http request
  //attach to on submit button



