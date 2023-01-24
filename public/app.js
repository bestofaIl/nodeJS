document.addEventListener("click", (e) => {
    if (e.target.dataset.type === "remove") {
        const id = e.target.dataset.id;
        remove(id).then(() => {
            e.target.closest("li").remove();
        })
    } else if (e.target.dataset.type === "edit") {
        const id = e.target.dataset.id;
        const newTitle = prompt("Write new title");
        if (newTitle !== null) {
            edit(id, newTitle).then(() => {
                e.target.closest("li").children[0].textContent = newTitle;
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}

async function edit(id, title) {
    await fetch(`/${id}/${title}`, {
        method: "PUT"
    })
}