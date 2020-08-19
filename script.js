//Triggering preloader upon load of dom
$(document).ready(function () {
    window.onload = function () {
        $('.preload').fadeOut(500, function () { $('.preload').hide(); });
        // getNews();
        // alert("hello")
    }
});

// let username = document.querySelector("#findword").value.toLowerCase();

//Function that gets data for json file
function translate(data, key) {
    if (key in data) {
        return data[key];
        // return data.key;
        // console.log("hi");
    }
    else
        return document.getElementById("result").innerHTMl = ['Ooooooooopsss! Sorry the word you search was not found. Please check the word and try again!'];
}
//Search for word upon a click on the search bar
$("#search").click(function (e) {
    let username = document.querySelector("#findword").value.toLowerCase();
    console.log(typeof(username))
    //Triggering ajax request
    $.ajax({
        // url: 'dictionary.json',
        type: 'GET',
        datatype: 'json',

        beforeSend: function () {
            $(".preload").css("opacity", "0.4").show();
        },
        complete: function () {
            $(".preload").hide();
        },
        success: function (data) {
            var json = (function () {
                var json = null;
                $.ajax({
                    'async': false,
                    'global': false,
                    'url': '/dictionary.json',
                    'dataType': "json",
                    'success': function (data) {
                        json = data;
                        console.log(json)
                        console.log(username)
                        let resultat = translate(json, username);
                        resulthtml = document.getElementById("result").style;
                        resulthtml.padding = "30px";
                        resulthtml.color = "#fff";
                        resulthtml.transition = "all 1s linear"
                        let search = document.querySelector(".search").style.height = "0";
                        let display = document.getElementById("result").innerHTML = '<h1 style="font-size: 18px; color: #fff; margin-bottom: 5px; border-bottom: 1px solid #f25f5c";>MEANING</h1> ' + resultat[0];
                    }
                });
            })();
        },
        error: function () { document.getElementById("result").innerHTMl = ['Ooooooppppsss I am so sorry genius, I am currently so busy. Please reload your browser and try again!']; }
    });
    e.preventDefault();


});


// Hide footer upon search to make ui presentable
$('#findword').click(function (e) {
    $('#footer').css("display", "inline").fadeOut(500)
    e.preventDefault();
});


// ======================================================================================
                        //Approach 2
// ======================================================================================

    // rawFile.onreadystatechange = function () {
    //     if (rawFile.readyState === 4 && rawFile.status == "200") {

    //         let data = JSON.parse(this.responseText),

    //             username = form.querySelector("input[type=text]").value.toLowerCase(),
    //             // resultat = getValues(data, username);
    //             resultat = translate(data, username);
    //         resulthtml = document.getElementById("result").style;
    //         resulthtml.padding = "20px";
    //         resulthtml.color = "#fff";
    //         let search = document.querySelector(".search").style.height = "0";
    //         let footer = document.querySelector("#footer").style;
    //         footer.display = "none";
    //         let display = document.getElementById("result").innerHTML = '<h1 style="font-size: 18px; color: #fff; margin-bottom: 5px; border-bottom: 1px solid #f25f5c";>MEANING</h1> ' + resultat[0];
        //     }
        // }
        // rawFile.send(null);
//     });
// });
//     // function getValues(obj, key) {
    //     var objects = [];
    //     for (var i in obj) {
    //         if (!obj.hasOwnProperty(i)) continue;
    //         if (typeof obj[i] == 'object') {
    //             objects = objects.concat(getValues(obj[i], key));
    //         } else if (i == key) {
    //             objects.push(obj[i]);
    //         }
    //         else
    //             document.getElementById("result").innerHTML = "Sorry the word you search was not found. Please check the word and try again";

    //     }
    //     return objects;
    // }
