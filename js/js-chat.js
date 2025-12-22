
function IsMobileDevice() {
  let isMobile = false;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isMobile = true;
  }
  return isMobile;
}
isUserOnMobileDevice = IsMobileDevice();
function isPopupBlockerActivated() {
  var mine = window.open("", "", "width=1,height=1,left=0,top=0,scrollbars=no");
  var popUpsBlocked = false;
  if (!mine || mine.closed || typeof mine.closed == "undefined") {
    //FOUND POPUP is BLOCKED at user browser
    popUpsBlocked = true;
  } else {
    mine.close();
  }
  return popUpsBlocked;
}
isPopupBlocked = !isUserOnMobileDevice ? isPopupBlockerActivated() : false;
if (isPopupBlocked && !isUserOnMobileDevice) {
	
		window.addEventListener("load", (event) => {
			var confirmThis = function (e) {
				if(document.querySelector("#_eemessage-input")?.style.display=="" || document.querySelector("#_eemessage-input")?.style.display === "block"){
					if (!confirm('Your chat will be disconnected if you redirect to another page.\nDo you want to continue?')) e.preventDefault();
				}
			};
			(document.querySelectorAll("a")).forEach(el=>{ var href=el.href.split(window.location.href).join(""); !!href && href!=="#" && href.indexOf("#")!==0 && href.indexOf("tel:")!==0 && href.indexOf("javascript:")!==0 && el.target!=="_blank" && el.addEventListener('click', confirmThis, false);  });
			//(document.querySelectorAll("a")).forEach(el=>{ el.target!=="_blank" && el.addEventListener('click', confirmThis, false);  });
			//(document.querySelectorAll("button")).forEach(btn=>{ btn.addEventListener('click', confirmThis, false);  });
		})
		
  /*window.onbeforeunload = () => {
    if (
      document.querySelector("#_eemessage-input")?.style.display === "block"
    ) {
      return true;
    } else {
      return null;
    }
  };*/
}
console.log("isPopupBlocked", isPopupBlocked);
var eeChatPopupWindow;
function openOnce(url, target, options) {
  // open a blank "target" window
  // or get the reference to the existing "target" window
  var winref = window.open("", target, options);

  // if the "target" window was just opened, change its url
  if (winref.location.href === "about:blank") {
    winref.location.href = url;
  }
  return winref;
}
function OpenWindow() {
  var windowWidth = 400;
  var windowHeight = 480;
  var topPosition =
    (window.screenTop != undefined ? window.screenTop : screen.top) +
    screen.height -
    windowHeight;
  var leftPosition =
    (window.screenLeft != undefined ? window.screenLeft : screen.left) +
    screen.width -
    windowWidth;
  if (typeof eeChatPopupWindow == "undefined" || eeChatPopupWindow.closed) {
    //create new
	let clientHostUrl=window.location.host;
        //create new
        var url = window.location.protocol + '//eechat-qa.extraaedge.com/mitsde_chat.html?ee_src_param='+ clientHostUrl;
    /*var url =
      window.location.protocol + "//eechat-qa.extraaedge.com/mitsde_chat.html";*/
    //eeChatPopupWindow = window.open(url, 'winPop', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=480,top=350,left=1250');
    eeChatPopupWindow = openOnce(
      url,
      "winPop",      `directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=${windowWidth},height=${windowHeight},top=${topPosition},left=${leftPosition}`
    );
    eeChatPopupWindow.focus();
    /*if (eeChatPopupWindow == null || eeChatPopupWindow.document.location.href != url) {
            eeChatPopupWindow = window.open(url, 'winPop');
        }*/
  } else {
    //give it focus (in case it got burried)
    eeChatPopupWindow.focus();
  }
}
function closeIndicator() {
  let indicator = document.getElementById("eeChatIndicator");
  console.log("closeIndicator", indicator);
  indicator ? (indicator.style.display = "none") : "";
  indicatorClosed = true;
}
function renderInChatBot() {
  /*var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = window.location.protocol + '//extraaedgeresources.blob.core.windows.net/demo/staging/Chatbot/js/chat.js';
    head.appendChild(script);*/

  /*let cssId = '__chatBotCss'
    if (!document.getElementById(cssId)) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = window.location.protocol + '//eechat.extraaedge.com/css/StyleSheet.css';
        link.type = 'text/css';
    }
    var head = document.getElementsByTagName('head')[0].appendChild(link);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function () {
        eeChatBot.init("staging", "280ee388-3445-417d-8b3b-753564502b84");
        setTimeout(function () {
            var eechatIconElement = document.getElementById('__eechatIcon');
            if (!!eechatIconElement && (sessionStorage.getItem('ee_autoOpenChatbot') !== 'true')) {

                var cssProp = window.getComputedStyle(eechatIconElement, null).getPropertyValue("display");
                if (cssProp == "block") {
                    eechatIconElement.click();
                }
            }
            clearTimeout();
            sessionStorage.setItem('ee_autoOpenChatbot', 'true');
        }, 3000);
    }
    script.src = window.location.protocol + '//eechat.extraaedge.com/js/chatbot.min.js';
    head.appendChild(script);*/
  var cssId = "__chatBotCss";
  if (!document.getElementById(cssId)) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      window.location.protocol +
      "//eechat-qa.extraaedge.com/css/mitsde/StyleSheet.css";
    link.type = "text/css";
  }
  var head = document.getElementsByTagName("head")[0].appendChild(link);
  var cssFilesArr = [
    "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/emoji.cmp.css",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
  ];

  for (var x = 0; x < cssFilesArr.length; x++) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", cssFilesArr[x]);
    head.appendChild(fileref);
  }

  var markUpscript = document.createElement("script");
  markUpscript.type = "text/javascript";
  markUpscript.src =
    window.location.protocol +
    "//unpkg.com/markdown-it/dist/markdown-it.min.js";
  head.appendChild(markUpscript);

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.onload = function () {
	  var clinet_id="04bfc404-87ed-4614-b730-6ce1d41cbb09";
	  eeChatBot.init("mitsde", clinet_id.toLowerCase());
  };
  //script.src = window.location.protocol + '//eechat.extraaedge.com/js/chatbot.min.js';
  //script.src = 'https://chatbotprod.blob.core.windows.net/web/js/chatbot.min.js';
  //script.src ="https://chatbotprod.blob.core.windows.net/web/minified/cmp/chatbot.win.cmp.js";
  script.src = 'https://chatbotprod.blob.core.windows.net/web/minified/cmp/chatbot.min_mitsde_25012023.js';
  //script.src = 'https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/chatbot.min.reconnect.js';

  head.appendChild(script);

  var jsFilesArr = [
    "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/config.cmp.js",
    "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/util.cmp.js",
    "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/jquery.emojiarea.cmp.js",
    "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/emoji-picker.cmp.js",
  ];

  for (var x = 0; x < jsFilesArr.length; x++) {
    var jsfileref = document.createElement("script");
    jsfileref.setAttribute("type", "text/javascript");
    jsfileref.setAttribute("src", jsFilesArr[x]);
    head.appendChild(jsfileref);
  }

  // LogD("Initialize chat sucessfully.");
  // Initializes and creates emoji set from sprite sheet

  // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
  // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
  // It can be called as many times as necessary; previously converted input fields will not be converted again
  //window.emojiPicker.discover();
  window.addEventListener("load", (event) => {
    //window.onload = function () {
    var eechatIconElement = document.getElementById("__eechatIcon");
    if (
      !!eechatIconElement &&
      sessionStorage.getItem("ee_autoOpenChatbot") !== "true"
    ) {
      setTimeout(function () {
        var cssProp = window
          .getComputedStyle(eechatIconElement, null)
          .getPropertyValue("display");
        if (cssProp == "block") {
          eechatIconElement.click();
        }
      }, 100);
      clearTimeout();
      //sessionStorage.setItem("ee_autoOpenChatbot", "true");
    }
    window.emojiPicker = new EmojiPicker({
      emojiable_selector: "[data-emojiable=true]",
      assetsPath:
        "https://eequeuestorage.blob.core.windows.net/staticfiles/miscellaneous/emoji/img",

      popupButtonClasses: "fa fa-smile-o",
    });
  });
}
if (isUserOnMobileDevice || isPopupBlocked) {
  renderInChatBot();
} else {
	window.addEventListener("load", (event) => {
  let mainContainer = document.createElement("div");
  if (mainContainer) {
    mainContainer.setAttribute("id", "__eechatMainContainverDiv");
    let cssId2 = "__chatBotCss";
    if (!document.getElementById(cssId2)) {
      var linkc = document.createElement("link");
      linkc.rel = "stylesheet";
      linkc.href =
        window.location.protocol +
        "//eechat-qa.extraaedge.com/css/mitsde/StyleSheet_Win.css";
      linkc.type = "text/css";
    }
    var head = document.getElementsByTagName("head")[0].appendChild(linkc);
    let htmlMarkup =
      '<div id="eeChatIndicator"><div class="indicator"><div onclick="OpenWindow();"><p></p></div><a class="close-indicator" onclick="closeIndicator();"></a></div></div><div id="__eechatIcon" onclick="OpenWindow();" title="Chat" style="display: block;"> </div>';
    mainContainer.insertAdjacentHTML("beforeend", htmlMarkup);
    document.body.appendChild(mainContainer);

    var eechatIconElement = document.getElementById("__eechatIcon");
    if (
      !!eechatIconElement &&
      sessionStorage.getItem("ee_autoOpenChatWindow") !== "true"
    ) {
      setTimeout(function () {
        var cssProp = window
          .getComputedStyle(eechatIconElement, null)
          .getPropertyValue("display");
        if (cssProp == "block") {
          eechatIconElement.click();
        }
      }, 100);
      clearTimeout();
      //sessionStorage.setItem("ee_autoOpenChatWindow", "true");
    }
  }
	});
}