// JavaScript function to handle sharing
function shareEvent(eventName, eventDetails) {
    const shareText = `${eventName} - ${eventDetails}`;
    const shareUrl = window.location.href; // Current page URL
    if (navigator.share) {
        // If Web Share API is supported
        navigator.share({
            title: eventName,
            text: shareText,
            url: shareUrl,
        }).then(() => {
            alert("Event shared successfully!");
        }).catch((err) => {
            alert("Error sharing event: " + err);
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
            alert("Event link copied to clipboard!");
        }).catch((err) => {
            alert("Error copying link: " + err);
        });
    }
}

// JavaScript function to handle likes
function likeEvent(button) {
    if (button.classList.contains('liked')) {
        alert("You have already liked this event.");
        return;
    }
    const likeCount = button.querySelector('.like-count');
    let count = parseInt(likeCount.textContent);
    count++;
    likeCount.textContent = count;
    button.classList.add('liked');
}