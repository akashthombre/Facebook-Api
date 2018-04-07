
// Initialize DOM
$(document).ready(() =>{
		$(".loader").hide(); //Before Request, Loader will not display
		alert("Please Re-enter Token to get Posts"); //alert to enter token




	$("#go").click(() => { // when user clicks go button, token will be saved to the variable
        var myFacebookToken = $("#usr").val();
        console.log(myFacebookToken); //test purpose

          // making ajax request to facebook api to fetch the data
        $.ajax('https://graph.facebook.com/me?fields=name, first_name,posts{created_time,type,full_picture,story,message,source}&access_token=' + myFacebookToken,{


            //success function initialize
        success: (response) =>{
          console.log(response);
          console.log(typeof(response));

		  // Fetching feed posts
		 $.each(response.posts.data, function(i, post){

            if(post.type==="status" && post.message){

              $("#posts").append('<div class="posts-content"><br><div class="row" class="post-message">'+post.message+'</div><br><div class="row post-time">Created time: '+post.created_time+'</div></div><hr>');
            }

            else if(post.type==="photo" && post.message){
              $("#posts").append('<div class="posts-content"><br><div class="row" class="post-message">'+post.message+'</div><br><div class="row"><img src='+post.full_picture+' style="width:50%; height: 50%;"></div><br><div class="row post-time">Created time: '+post.created_time+'</div></div><hr>')
            }

            else if(post.type==="photo" && !post.message){
              $("#posts").append('<div class="posts-content"><br><div class="row"><img src='+post.full_picture+' style="width:50%; height: 50%;"></div><br><div class="row post-time">Created time: '+post.created_time+'</div></div>')
            }

            else if(post.type==="video"){
              $("#posts").append('<div class="posts-content"><br><div class="row" class="posts-message">'+post.message+'</div><div class="row"><a href='+post.source+'>'+post.source+'</a></div><br><div class="row post-time">Created time: '+post.created_time+'</div></div>')
            }

          });

          $(".feed-post-heading").text(response.name);
        },


          timeout:3000, // timeout 3000milisecond
              // error function
        error: (xhr) =>{
            console.log("Request not completed, check for your token, or some other error.");
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
            if(response.error){
              console.log(response.error.message);
              alert(response.error.message);
            }
        },
              // complete function after request completed
        complete: (xhr) =>{
            console.log("REQUEST ENDED.")
            $(".search").hide();  //Seach bar will be hide, after data fetch.
        }

      } // end of argument list

    ); // end Ajax


}); //Click function end
}); // end DOM
