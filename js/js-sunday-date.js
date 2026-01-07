// Calculate and display upcoming Sunday date
function getUpcomingSunday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek; // If today is Sunday, show next Sunday
    const upcomingSunday = new Date(today);
    upcomingSunday.setDate(today.getDate() + daysUntilSunday);
    
    const day = upcomingSunday.getDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[upcomingSunday.getMonth()];
    const year = upcomingSunday.getFullYear();
    
    // Add ordinal suffix (st, nd, rd, th)
    const suffix = (day % 10 === 1 && day !== 11) ? 'st' : 
                   (day % 10 === 2 && day !== 12) ? 'nd' : 
                   (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
    
    return `${day}<sup>${suffix}</sup> ${month} ${year}`;
}

// Update all elements with class 'blinklastdate' or id 'upcomingSundayDate'
document.addEventListener('DOMContentLoaded', function() {
    const sundayDate = getUpcomingSunday();
    
    // Update by ID
    const dateElement = document.getElementById('upcomingSundayDate');
    if (dateElement) {
        dateElement.innerHTML = sundayDate;
    }
    
    // Update all elements with blinklastdate class
    const blinkElements = document.querySelectorAll('.blinklastdate');
    blinkElements.forEach(function(el) {
        el.innerHTML = sundayDate;
    });
    
    // Update all elements with blinklastdate1 class
    const blinkElements1 = document.querySelectorAll('.blinklastdate1');
    blinkElements1.forEach(function(el) {
        el.innerHTML = '<strong>' + sundayDate + '</strong>';
    });
});
