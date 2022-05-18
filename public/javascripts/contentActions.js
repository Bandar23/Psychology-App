let sendLike =  function(){
    let id  = document.getElementById('id').value;

    ajax.post({
        url:'../ScientistLike',
        data:{
            id:'628170a0f42dcc75985e0854',
        },
    })

    .then(response => {
        console.log(response.body);
      })
      .catch(console.error);
}