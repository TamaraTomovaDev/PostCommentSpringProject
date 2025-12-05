const API = "/api";

// URL PARAMETER

function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// POSTS PAGINA (posts.html)

if (document.getElementById("posts-container")) {

    fetch(`${API}/posts`)
        .then(res => res.json())
        .then(posts => {
            const div = document.getElementById("posts-container");
            div.innerHTML = "";

            posts.forEach(p => {
                div.innerHTML += `
                <div class="post-card">
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>

                    <div class="button-row">
                        <a class="btn" href="post-detail.html?id=${p.id}">Bekijken</a>
                        <a class="btn" href="edit-post.html?id=${p.id}">Bewerken</a>
                        <button class="btn" onclick="deletePost(${p.id})">Verwijderen</button>
                    </div>
                </div>`;
            });
        });
}

function deletePost(id) {
    fetch(`${API}/posts/${id}`, { method: "DELETE" })
        .then(() => window.location.reload());
}

// POST DETAIL PAGINA

if (document.getElementById("post-detail")) {

    const postId = getParam("id");

    fetch(`${API}/posts/${postId}`)
        .then(res => res.json())
        .then(post => {
            document.getElementById("post-detail").innerHTML = `
                <div class="post-card">
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <p>${post.content}</p>
                </div>
            `;
        });

    loadComments(postId);

    document.getElementById("new-comment-form").addEventListener("submit", e => {
        e.preventDefault();

        const comment = {
            text: document.getElementById("new-comment-text").value
        };

        fetch(`${API}/posts/${postId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        })
            .then(res => {
                if (!res.ok) throw new Error("Comment toevoegen mislukt");
                return res.json();
            })
            .then(() => {
                document.getElementById("new-comment-text").value = "";
                loadComments(postId);
            })
            .catch(err => console.error(err));
    });
}

// COMMENTS LADEN

function loadComments(postId) {
    fetch(`${API}/posts/${postId}/comments`)
        .then(res => res.json())
        .then(comments => {
            const div = document.getElementById("comments");
            div.innerHTML = "";

            comments.forEach(c => {
                div.innerHTML += `
                    <div class="comment">
                        <p>${c.text}</p>

                        <div class="button-row">
                            <button class="btn" 
                                onclick="startEditComment(${c.id}, '${c.text.replace(/'/g, "\\'")}', ${postId})">
                                Bewerken
                            </button>

                            <button class="btn" onclick="deleteComment(${c.id}, ${postId})">
                                Verwijderen
                            </button>
                        </div>
                    </div>
                `;
            });
        });
}

// COMMENT VERWIJDEREN

function deleteComment(commentId, postId) {
    fetch(`${API}/comments/${commentId}`, { method: "DELETE" })
        .then(() => loadComments(postId));
}

// COMMENT BEWERKEN (MODAL)
function startEditComment(commentId, text, postId) {
    document.getElementById("edit-modal").style.display = "flex";
    document.getElementById("edit-comment-text").value = text;

    document.getElementById("edit-comment-form").onsubmit = function (e) {
        e.preventDefault();

        const updated = { text: document.getElementById("edit-comment-text").value };

        fetch(`${API}/comments/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        })
            .then(() => {
                closeEditModal();
                loadComments(postId);
            });
    };
}

function closeEditModal() {
    document.getElementById("edit-modal").style.display = "none";
}

// POST TOEVOEGEN

if (document.getElementById("add-post-form")) {

    document.getElementById("add-post-form").addEventListener("submit", e => {
        e.preventDefault();

        const post = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            content: document.getElementById("content").value
        };

        fetch(`${API}/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        })
            .then(() => window.location = "posts.html");
    });
}

// POST BEWERKEN

if (document.getElementById("edit-post-form")) {

    const id = getParam("id");

    fetch(`${API}/posts/${id}`)
        .then(res => res.json())
        .then(post => {
            document.getElementById("title").value = post.title;
            document.getElementById("description").value = post.description;
            document.getElementById("content").value = post.content;
        });

    document.getElementById("edit-post-form").addEventListener("submit", e => {
        e.preventDefault();

        const updated = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            content: document.getElementById("content").value
        };

        fetch(`${API}/posts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        })
            .then(() => window.location = "posts.html");
    });
}
