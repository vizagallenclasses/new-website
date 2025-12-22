// Global Js Start here

$(document).ready(function() {
	$(document).on("mousedown", ".btn-ripple" , function(e){     
		var target = e.target;
		var rect = target.getBoundingClientRect();
		var ripple = target.querySelector('.ripple');
		$(ripple).remove();
		ripple = document.createElement('span');
		ripple.className = 'ripple';
		ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
		target.appendChild(ripple);
		var top = e.pageY - rect.top - ripple.offsetHeight / 2 -  document.body.scrollTop;
		var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
		ripple.style.top = top + 'px';
		ripple.style.left = left + 'px';
		return false;
	});
});

//You can add your JS below here.............

	var sections = $('section'), nav = $('.app-features li'), nav_height = nav.outerHeight() + 70;
	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop() + 1;
		sections.each(function() {
		var top = $(this).offset().top - nav_height,
			bottom = top + $(this).outerHeight();
		if (cur_pos >= top && cur_pos <= bottom) {
			nav.find('a').removeClass('active');
			sections.removeClass('active');
			$(this).addClass('active');
			nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
		}
		});
	});
	nav.find('a').on('click', function () {
		var $el = $(this), id = $el.attr('href');
		$('html, body').animate({
		scrollTop: $(id).offset().top - nav_height
		}, 100);
		return false;
	});

// setTimeout(function() { $(".final-announcement").slideUp(500); }, 5000)
// $('.final-announcement').slideDown(500);
$('.btclosed').click(function(){
	$(".final-announcement").slideUp(500);
});

 // Add slideDown animation to Bootstrap dropdown when expanding.
 $('.dropdown').on('show.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true);
  });

  // Add slideUp animation to Bootstrap dropdown when collapsing.
  $('.dropdown').on('hide.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true);
  });

  $(".moretext").hide()
	$('.moreless-button').click(function() {
		$('.moretext').slideToggle();
		if ($('.moreless-button').text() == "Read more") {
		$(this).text("Read less")
		} else {
		$(this).text("Read more")
		}
	});


	// $(".ds-hd-right>li").on("show.bs.dropdown", function (e) {
	// 	$(this).find(".dropdown-menu").first().stop(true, true).show();
	// });
	// $(".ds-hd-right>li").on("hide.bs.dropdown", function (e) {
	// 	$(this).find(".dropdown-menu").first().stop(true, true).hide();
	// });

	document.querySelectorAll('.dropdown-menu').forEach(function(element){
		element.addEventListener('click', function (e) {
		  e.stopPropagation();
		});
	})



	// mobile view dropdown  08-april-2024

	// function handleResize() {
	// 	var windowWidth = $(window).width();
	// 	var navLink = $('.nav-item.dropdown.secondnav .nav-link.dropdown-toggle');
	
	// 	if (windowWidth < 786) {
	// 	  navLink.click(function() {
	// 		$(this).attr('data-bs-toggle', 'dropdown');
	// 		$(this).attr('aria-expanded', 'false');
	// 		lert("hi");

			
			
	// 	  });

	// 	  $("#test22").dblclick(function() {
	// 		window.location.href = "post-graduate-diploma-in-management.php";
	// 	  });
	
	// 	} else {
	// 	  navLink.off('click');
	// 	  navLink.removeAttr('data-bs-toggle');
	// 	  navLink.removeAttr('aria-expanded');
	// 	}
	//   }
	
	//   $(window).on('resize', handleResize);
	//   handleResize();

	
	// // mobile view dropdown 

	function handleResize() {
		var windowWidth = $(window).width();
		var navLink = $('.nav-item.dropdown.secondnav .nav-link.dropdown-toggle');
		var dropdownToggle = $('.secondnav .dropdown-toggle::after');
	
		if (windowWidth < 786) {
		  dropdownToggle.click(function(e) {
			e.preventDefault(); // Prevent default link behavior
			navLink.attr('data-bs-toggle', 'dropdown');
			navLink.attr('aria-expanded', 'false');
			alert('Check Mobile View');
			window.location.href = navLink.attr('href'); // Open the URL
		  });
	
		  $("#test22").on('click', function(e) {
			e.preventDefault(); // Prevent default link behavior
			var confirmResult = confirm('Check All PGDM Course Page');
			if (!confirmResult) {
			  window.location.href = "post-graduate-diploma-in-management.php";
			}
		  });

		  
		} else {
		  dropdownToggle.off('dblclick');
		  navLink.removeAttr('data-bs-toggle');
		  navLink.removeAttr('aria-expanded');
		  $("#test22").off('dblclick');
		}
	  }
	
	  $(window).on('resize', handleResize);
	  handleResize(); // Call the function initially
	



	



	