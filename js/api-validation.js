// API Configuration - Update this URL for production
var API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api/send-email'
  : '/api/send-email';

// Submit Expert Form - New function for SMTP email sending
function submitExpertForm() {
  var form = document.getElementById('menuContactFloting');
  var submitBtn = document.getElementById('submitbtnsticky');
  var formMessage = document.getElementById('formMessage');

  // Get form values
  var name = document.getElementById('expert-name').value.trim();
  var email = document.getElementById('expert-email').value.trim();
  var mobile = document.getElementById('expert-mobile').value.trim();
  var city = document.getElementById('expert-city').value;
  var program = document.getElementById('expert-program').value;

  // Clear previous messages
  formMessage.className = 'form-message';
  formMessage.style.display = 'none';

  // Validate fields
  var isValid = true;
  var inputs = form.querySelectorAll('.form-control-modern, .form-select-modern');

  inputs.forEach(function (input) {
    input.classList.remove('error', 'valid');
  });

  if (!name) {
    document.getElementById('expert-name').classList.add('error');
    isValid = false;
  } else {
    document.getElementById('expert-name').classList.add('valid');
  }

  // Email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById('expert-email').classList.add('error');
    isValid = false;
  } else {
    document.getElementById('expert-email').classList.add('valid');
  }

  // Phone validation (10 digits)
  var phoneRegex = /^[0-9]{10}$/;
  if (!mobile || !phoneRegex.test(mobile)) {
    document.getElementById('expert-mobile').classList.add('error');
    isValid = false;
  } else {
    document.getElementById('expert-mobile').classList.add('valid');
  }

  if (!city) {
    document.getElementById('expert-city').classList.add('error');
    isValid = false;
  } else {
    document.getElementById('expert-city').classList.add('valid');
  }

  if (!program) {
    document.getElementById('expert-program').classList.add('error');
    isValid = false;
  } else {
    document.getElementById('expert-program').classList.add('valid');
  }

  if (!isValid) {
    showFormMessage('error', 'Please fill in all required fields correctly.');
    return;
  }

  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  // Prepare data
  var formData = {
    name: name,
    email: email,
    mobile: mobile,
    city: city,
    program: program
  };

  // Send to API
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      if (data.success) {
        showFormMessage('success', data.message || 'Thank you! Your enquiry has been submitted successfully.');
        // Reset form
        form.reset();
        inputs.forEach(function (input) {
          input.classList.remove('valid', 'error');
        });
        // Re-check consent checkbox
        document.getElementById('expertConsent').checked = true;
      } else {
        showFormMessage('error', data.message || 'Failed to submit. Please try again.');
      }
    })
    .catch(function (error) {
      console.error('Form submission error:', error);
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      showFormMessage('error', 'Network error. Please check your connection and try again.');
    });

  // Also send to existing third-party API (optional - for backward compatibility)
  try {
    var lead = {
      AuthToken: "MITSDE-11-06-2020",
      Source: "mitsde",
      FirstName: name,
      MobileNumber: mobile,
      Email: email,
      LeadSource: "Organic-Direct-Form",
      LeadType: "Online",
      LeadName: "Contact us form leads",
      Course: program,
      State: city,
      Textb1: program
    };

    $.ajax({
      url: "https://thirdpartyapi.extraaedge.com/api/SaveRequest",
      type: "POST",
      data: JSON.stringify(lead),
      dataType: "Text",
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log('Third-party API success');
      },
      error: function (response) {
        console.log('Third-party API error (non-critical)');
      }
    });
  } catch (e) {
    console.log('Third-party API call failed (non-critical)');
  }
}

// Show form message helper
function showFormMessage(type, message) {
  var formMessage = document.getElementById('formMessage');
  var messageIcon = formMessage.querySelector('.message-icon');
  var messageText = formMessage.querySelector('.message-text');

  messageIcon.textContent = type === 'success' ? '✓' : '✗';
  messageText.textContent = message;
  formMessage.className = 'form-message ' + type;
  formMessage.style.display = 'block';

  // Scroll message into view
  formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-hide after 10 seconds
  setTimeout(function () {
    if (formMessage.classList.contains(type)) {
      formMessage.style.display = 'none';
    }
  }, 10000);
}

var submitform = true;
var is_submit = true;
var is_ajax_return = true;

function submitcontactvalidate(form_id, name) {
  if (is_submit) {
    var $inputs = $(
      "#" +
      form_id +
      " textarea, " +
      "#" +
      form_id +
      " :input, " +
      "#" +
      form_id +
      " select"
    );
    $inputs.each(function () {
      if ($(this).attr("validate") != undefined) {
        var validation = $(this).attr("validate");

        var validation_array = validation.split(",");

        var current_name = $(this).attr("name");
        for (var i = 0; i < validation_array.length; i++) {
          var validation_inner_array = validation_array[i].split("|");
          for (var j = 0; j < validation_inner_array.length; j++) {
            switch (validation_inner_array[j]) {
              case "Required":
                if (name == "all" || current_name == name) {
                  var value = $(this).val();
                  if (value == "" || value == validation_inner_array[j + 1]) {
                    $(this).removeClass("valid");
                    $(this).addClass("error");
                    submitform = false;
                  } else {
                    $(this).removeClass("error");
                    $(this).addClass("valid");
                  }
                }
                break;
              case "Email":
                var isEmail = false;
                if (
                  validation_inner_array[j + 1] == "ifEntered" &&
                  validation_inner_array[j + 2] == $(this).val()
                ) {
                  isEmail = false;
                } else {
                  isEmail = true;
                }
                if (isEmail) {
                  if (name == "all" || current_name == name) {
                    var value = $(this).val();
                    var atpos = value.indexOf("@");
                    var dotpos = value.lastIndexOf(".");
                    if (value == "" || value == validation_inner_array[j + 1]) {
                      $(this).removeClass("valid");
                      $(this).addClass("error");
                      submitform = false;
                    } else if (
                      atpos < 1 ||
                      dotpos < atpos + 2 ||
                      dotpos + 2 >= value.length
                    ) {
                      $(this).removeClass("valid");
                      $(this).addClass("error");
                      submitform = false;
                    } else {
                      $(this).removeClass("error");
                      $(this).addClass("valid");
                    }
                  }
                }
                break;
              case "Phone":
                if (name == "all" || current_name == name) {
                  var value = $(this).val();
                  if (value == "" || value == validation_inner_array[j + 1]) {
                    $(this).removeClass("valid");
                    $(this).addClass("error");
                    submitform = false;
                  } else if (isNaN(value)) {
                    $(this).removeClass("valid");
                    $(this).addClass("error");
                    submitform = false;
                  } else {
                    $(this).removeClass("error");
                    $(this).addClass("valid");
                  }
                }
                break;
              case "Number":
                if (name == "all" || current_name == name) {
                  var value = $(this).val();
                  if (value == "" || value == validation_inner_array[j + 1]) {
                    $(this).removeClass("valid");
                    $(this).addClass("error");
                    submitform = false;
                  } else if (isNaN(value)) {
                    $(this).removeClass("valid");
                    $(this).addClass("error");
                    submitform = false;
                  } else {
                    $(this).removeClass("error");
                    $(this).addClass("valid");
                  }
                }
                break;
              case "Captcha":
                if (name == "all" || current_name == name) {
                  var value = $(this).val();
                  var region_id = validation_inner_array[j + 2];
                  is_ajax_return = false;
                  $.ajax({
                    type: "POST",
                    data: "",
                    url:
                      SITEROOT +
                      "admin_contact_us/site_contact_us/checkCaptcha/" +
                      region_id +
                      "?captcha" +
                      region_id +
                      "=" +
                      value,
                    success: function (responseData) {
                      is_ajax_return = true;
                      if (responseData == "false") {
                        $("#captcha" + region_id).removeClass("valid");
                        $("#captcha" + region_id).addClass("error");
                        submitform = false;
                      } else {
                        $("#captcha" + region_id).removeClass("error");
                        $("#captcha" + region_id).addClass("valid");
                      }
                    },
                  });
                }
                break;
            }
          }
        }
      }
    });
  }
}

function validate(form_id) {
  //alert(form_id,'validation');
  is_submit = true;
  submitform = true;
  submitcontactvalidate(form_id, "all");
  setTimeout(function () {
    do_form_submit(form_id);
  }, 1);
}

function do_form_submit(form_id) {
  if (is_ajax_return) {
    if (submitform) {
      if (form_id == "menuContactform") {
        //alert(form_id);
        //document.getElementsByClassName("submitbtn")[1].disabled=true;
        document.getElementById("submitbtn1").style.visibility = "hidden";
        var $inputs = $(
          "#" +
          form_id +
          " textarea, " +
          "#" +
          form_id +
          " :input, " +
          "#" +
          form_id +
          " select"
        );
        // alert("menuContactform");
        var lead = {
          AuthToken: "MITSDE-11-06-2020",
          Source: "mitsde",
          FirstName: $inputs[4].value,
          MobileNumber: $inputs[6].value,
          Email: $inputs[5].value,
          LeadSource: "Organic-Direct-Form",
          LeadType: "Online",
          LeadName: "Contact us form leads",
          Course: "Not Known",
          State: $inputs[7].value,
          Textb1: $inputs[8].value,
        };
        //alert(JSON.stringify(lead));
        //alert(lead);
        $.ajax({
          url: "https://thirdpartyapi.extraaedge.com/api/SaveRequest",
          type: "POST",
          data: JSON.stringify(lead),
          dataType: "Text",
          crossDomain: true,
          contentType: "application/json; charset=utf-8",
          success: function (response) {
            $("#" + form_id).submit();
          },
          error: function (response) {
            //alert(JSON.stringify(response));
            alert("You have already submited a form");
            location.reload();
          },
        });

        smartech("contact", "LIST IDENTIFIER", {
          "pk^email": $inputs[5].value,
          mobile: $inputs[6].value,
          FIRST_NAME: $inputs[4].value,
          HIGHEST_QUALIFICATION: $inputs[8].value,
          STATE: $inputs[7].value,
        });
        smartech("identify", $inputs[5].value);
        smartech("dispatch", "Quick Contact Form Submit", {
          email: $inputs[5].value,
          mobile: $inputs[6].value,
          "first name": $inputs[4].value,
          HIGHEST_QUALIFICATION: $inputs[8].value,
          STATE: $inputs[7].value,
        });
      } else if (form_id == "menuContactFloting") {
        //document.getElementsByClassName("submitbtn")[1].disabled=true;
        document.getElementById("submitbtnsticky").style.visibility = "hidden";
        var $inputs = $(
          "#" +
          form_id +
          " textarea, " +
          "#" +
          form_id +
          " :input, " +
          "#" +
          form_id +
          " select"
        );
        //  alert("menuContactFloting");
        var lead = {
          AuthToken: "MITSDE-11-06-2020",
          Source: "mitsde",
          FirstName: $inputs[4].value,
          MobileNumber: $inputs[6].value,
          Email: $inputs[5].value,
          LeadSource: "Organic-Direct-Form",
          LeadType: "Online",
          LeadName: "Contact us form leads",
          Course: "Not Known",
          State: $inputs[7].value,
          Textb1: $inputs[8].value,
        };
        //alert(JSON.stringify(lead));
        //alert(lead);
        $.ajax({
          url: "https://thirdpartyapi.extraaedge.com/api/SaveRequest",
          type: "POST",
          data: JSON.stringify(lead),
          dataType: "Text",
          crossDomain: true,
          contentType: "application/json; charset=utf-8",
          success: function (response) {
            $("#" + form_id).submit();
          },
          error: function (response) {
            //alert(JSON.stringify(response));
            alert("You have already submited a form");
            location.reload();
          },
        });

        smartech("contact", "LIST IDENTIFIER", {
          "pk^email": $inputs[5].value,
          mobile: $inputs[6].value,
          FIRST_NAME: $inputs[4].value,
          HIGHEST_QUALIFICATION: $inputs[8].value,
          STATE: $inputs[7].value,
        });
        smartech("identify", $inputs[5].value);
        smartech("dispatch", "Quick Contact Form Submit", {
          email: $inputs[5].value,
          mobile: $inputs[6].value,
          "first name": $inputs[4].value,
          HIGHEST_QUALIFICATION: $inputs[8].value,
          STATE: $inputs[7].value,
        });
      } else if (form_id == "QuickContact3") {
        //document.getElementsByClassName("submitbtn")[1].disabled=true;
        document.getElementById("submitbtnsticky").style.visibility = "hidden";
        var $inputs = $(
          "#" +
          form_id +
          " textarea, " +
          "#" +
          form_id +
          " :input, " +
          "#" +
          form_id +
          " select"
        );
        //alert("QuickContact3");
        var lead = {
          AuthToken: "MITSDE-11-06-2020",
          Source: "mitsde",
          FirstName: $inputs[4].value,
          MobileNumber: $inputs[6].value,
          Email: $inputs[5].value,
          LeadSource: "Organic-Direct-Form",
          LeadType: "Online",
          LeadName: "Contact us form leads",
          Course: "Not Known",
          State: $inputs[7].value,
          Textb1: $inputs[8].value,
        };
        //alert(JSON.stringify(lead));
        //alert(lead);
        $.ajax({
          url: "https://thirdpartyapi.extraaedge.com/api/SaveRequest",
          type: "POST",
          data: JSON.stringify(lead),
          dataType: "Text",
          crossDomain: true,
          contentType: "application/json; charset=utf-8",
          success: function (response) {
            $("#" + form_id).submit();
          },
          error: function (response) {
            //alert(JSON.stringify(response));
            //alert("You have already submited a form");
            location.reload();
          },
        });

        smartech("contact", "LIST IDENTIFIER", {
          "pk^email": $inputs[5].value,
          mobile: $inputs[6].value,
          FIRST_NAME: $inputs[4].value,
          HIGHEST_QUALIFICATION: $inputs[8].value,
          STATE: $inputs[7].value,
        });
        smartech("identify", $inputs[5].value);
        smartech("dispatch", "Quick Contact Form Submit", {
          email: $inputs[5].value,
          mobile: $inputs[6].value,
          "first name": $inputs[4].value,
          HIGHEST_QUALIFICATION: $inputs[8].value,
          STATE: $inputs[7].value,
        });
      } else if (form_id == "menuContactformone") {
        //document.getElementsByClassName("submitbtn")[1].disabled=true;
        document.getElementById("submitbtn2").style.visibility = "hidden";
        var $inputs = $(
          "#" +
          form_id +
          " textarea, " +
          "#" +
          form_id +
          " :input, " +
          "#" +
          form_id +
          " select"
        );
        //alert("QuickContact3");
        var lead = {
          AuthToken: "MITSDE-11-06-2020",
          Source: "mitsde",
          FirstName: $inputs[4].value,
          MobileNumber: $inputs[6].value,
          Email: $inputs[5].value,
          LeadSource: "Organic-Direct-Form",
          LeadType: "Online",
          LeadName: "Contact us form leads",
          Course: "Not Known",
          State: $inputs[7].value,
          Textb1: $inputs[8].value,
        };
        //alert(JSON.stringify(lead));
        //alert(lead);
        $.ajax({
          url: "https://thirdpartyapi.extraaedge.com/api/SaveRequest",
          type: "POST",
          data: JSON.stringify(lead),
          dataType: "Text",
          crossDomain: true,
          contentType: "application/json; charset=utf-8",
          success: function (response) {
            $("#" + form_id).submit();
          },
          error: function (response) {
            //alert(JSON.stringify(response));
            //alert("You have already submited a form");
            location.reload();
          },
        });

        smartech("contact", "LIST IDENTIFIER", {
          "pk^email": $inputs[5].value,
          mobile: $inputs[6].value,
          FIRST_NAME: $inputs[4].value,
          HIGHEST_QUALIFICATION: $inputs[8].value,
          STATE: $inputs[7].value,
        });
        smartech("identify", $inputs[5].value);
        smartech("dispatch", "Quick Contact Form Submit", {
          email: $inputs[5].value,
          mobile: $inputs[6].value,
          "first name": $inputs[4].value,
          HIGHEST_QUALIFICATION: $inputs[8].value,
          STATE: $inputs[7].value,
        });
      } else if (form_id == "subscribeform") {
        // alert('test')

        //alert(JSON.stringify($inputs[5]));

        smartech("contact", "LIST IDENTIFIER", {
          "pk^email": $inputs[5].value,
        });
        smartech("identify", $inputs[5].value);
        smartech("dispatch", "subscribe form", {
          screen_name: "homepage",
          email: $inputs[5].value,
        });
      } else {
        $("#" + form_id).submit();
      }
    } else {
      return false;
    }
  } else {
    setTimeout(function () {
      do_form_submit(form_id);
    }, 1);
  }
}

function validateStep(selection_id, next_id) {
  alert("hi" + next_id);
  is_submit = true;
  submitform = true;
  submitcontactvalidate(selection_id, "all");
  setTimeout(function () {
    goNextStep(selection_id, next_id);
  }, 1);
}

function goNextStep(selection_id, next_id) {
  if (is_ajax_return) {
    if (submitform) {
      $("#" + selection_id).animate(
        {
          width: "toggle",
        },
        "slow"
      );
    } else {
      return false;
    }
  } else {
    setTimeout(function () {
      do_form_submit(form_id);
    }, 1);
  }
}

function jumpStep(selection_id) {
  $("#" + selection_id).animate(
    {
      width: "toggle",
    },
    "slow"
  );
}

function getFormCaptcha(region_id, captchaLabel) {
  $.ajax({
    type: "POST",
    data: "",
    url:
      SITEROOT + "admin_contact_us/site_contact_us/reloadCaptcha/" + region_id,
    success: function (responseData) {
      $("#capt" + region_id).html(responseData);
      $("#captcha" + region_id).val(captchaLabel);
      $("#captcha" + region_id).removeClass("valid");
      $("#captcha" + region_id).removeClass("error");
    },
  });
}
/*function cf(object){var f=object;if(f.value==f.defaultValue)f.value="";}
function cf(obj){if(obj.value==obj.defaultValue)obj.value='';}
function rf(obj){if(obj.value=='')obj.value=obj.defaultValue; is_submit = true; submitcontactvalidate('leftContactFrm',obj.name);}*/
function removeDefault(obj) {
  if (obj.value == obj.defaultValue) {
    obj.value = "";
  }
}

function addDefault(obj, fromId) {
  if (obj.value == "") {
    obj.value = obj.defaultValue;
  }
  is_submit = true;
  submitcontactvalidate(fromId, obj.name);
}
