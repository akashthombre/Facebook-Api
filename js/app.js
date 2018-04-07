

        $(document).ready(() => {
				 $(".showcase").hide(); //Initially Showcase Area hide
                $(".loader").hide();//Initially Loader to get hide
                alert("Please Enter Token");


	$("#go").click(() =>  { //user click on Go , token will be saved to variable
        var myFacebookToken = $("#usr").val();
        console.log(myFacebookToken); //For test purpose
        $.ajax('https://graph.facebook.com/me?fields=about,hometown,id,name,first_name,last_name,birthday,languages,gender,education,work,relationship_status,quotes,family,website,email,picture.width(300).height(300),cover&access_token=' + myFacebookToken, {
                //initializing success function
                success: (response) =>  {
                    console.log(response);
                    console.log(typeof(response));
                    $("#firstName").append(response.first_name);
                    $("#lastName").append(response.last_name);
                    $("#email").append(response.email);
                        $("#button1").click(function(){
                 $("#button1").attr("href",'https://facebook.com/'+response.id);
            });

                    $("#birthday").append(response.birthday);
                    $("#hometown").append(response.hometown.name);
                    $("#id1").append(response.id);

                    $("#relationship_status").append(response.relationship_status);
                    $("#profile_pic").attr("src", "" + response.picture.data.url + "");



                  },

                timeout: 3000, // keeping the timeout for 3000 mili sec
                beforeSend: () =>  { //before response wil get

                    $(".loader").show(); //loader to wait for response
                    $(".showcase").hide(); //showcase hide before sending data


                },
                complete: () =>  { //after completion of the request
                    $('.loader').delay(3000).hide();
                    $(".search").hide(); // after completion of request, Search bar hide
                    $(".showcase").show();  //showcase area will be display


                },
                error: (req, status, error) =>   { // error function
                    console.log('Error occured', status, error);
                    alert("Please create new Token"); //alaert to generate valid token


                }
            } //end argument list




        ); // end ajax call




});
});// end DOM
