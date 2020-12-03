async function deleteCommentHandler(event) {
    event.preventDefault();

    const id = document.getElementById("comment-number").getAttribute("href")
    console.log(id)
    const response = await fetch(`/api${id}`, {
        method: 'DELETE'
    });
    console.log(response)
    if (response.ok) {
        await Swal.fire(
            'Comment Deleted',
            'Hope the next one is better',
            'warning'
        )
        document.location.reload();
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.delete-comment-btn').addEventListener('click', deleteCommentHandler);