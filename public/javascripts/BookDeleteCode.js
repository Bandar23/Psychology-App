$(document).ready(function(){
    $("#toDelete").click(function(event){
        event.preventDefault();
        let id = $("#idDelete").val();
        $.ajax({
            type:'GET',
            url:'../creatorsBdelete/'+id,
            data:id,
            success : function(user) {
                window.location = '../creators-book';
            },
            error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
        });
    });
})