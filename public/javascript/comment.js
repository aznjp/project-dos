async function commentFormHandler(event) {
    event.preventDefault();
    const recipe_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                recipe_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            await Swal.fire(
                'NICE!',
                'Comment is a GO!!!',
                'success'
            )
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);