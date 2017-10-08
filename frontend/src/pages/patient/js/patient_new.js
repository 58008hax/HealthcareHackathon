$("#target").submit(function (event) {
    console.log("Submit");
    alert("Handler for .submit() called.");
    
    var fullName = $("#name").val();
    var email = $("#mail").val();
    var phone = $("phone").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("state").val();
    var password = $("password").val();
    
    //AJAX GET
    $.get("155.246.208.15:8080/user/add?name=" + fullName + "&email=" + email + "&phoneNumber" + phone + "&street=" + street + "&city=" + city + "&state=" + state + "&password" + password);
    event.preventDefault(); //wont refresh page after submit
    //redirect if successful
});
