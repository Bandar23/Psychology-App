$(document).ready(function(){

    $("button").click(function(event){
 
        event.preventDefault();
        
        let id = $("#id").val();

        $.ajax({
            type: "GET",
            url:"../SubjectLike/"+id,
            data:id,
			success : function(user) {
                document.getElementById('like').style.display = 'none';
               // $("#liked").html('<i class="fa-solid fa-heart"></i>');
                document.getElementById('liked').style.display = 'block';
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
        });
    });


});