$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // upload preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // send to api
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // show loading animation
        $(this).hide();
        $('.loader').show();

        // call /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // get and display the result
                
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(data[0]);
                var chart = [
                    {
                      x: ['COOL', 'COLOR', 'DETAIL', 'FORM'],
                      y: [(data[1]), (data[2]), (data[3]), (data[4])],
                      type: 'bar',
                      marker:{
                        color: ['LightGreen', 'Plum', 'LightGreen', 'Plum']
                      },
                    }
                  ];
                  
                  Plotly.newPlot('plot', chart);
                $('#plot').fadeIn(600);
                console.log('Success!');
                
            },
        });
    });

});