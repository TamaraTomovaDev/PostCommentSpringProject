const API = "/api";

/* ============================
   GET URL PARAM
============================ */
function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

/* ============================
   POSTS PAGINA (posts.html)
============================ */
if (document.getElementById("posts-container")) {

    fetch(`${API}/posts`)
        .then(res => res.json())
        .then(posts => {
            const div = document.getElementById("posts-container");
            div.innerHTML = "";

            posts.forEach(p => {
                div.innerHTML += `
                <div class="card">
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <a class="btn" href="post-detail.html?id=${p.id}">Bekijk</a>
                    <a class="btn" href="edit-post.html?id=${p.id}">Bewerken</a>
                    <button class="btn" onclick="deletePost(${p.id})">Verwijderen</button>
                </div>`;
            });
        });
}

function deletePost(id) {
    fetch(`${API}/posts/${id}`, { method: "DELETE" })
        .then(() => window.location.reload());
}

/* ============================
   POST DETAIL PAGINA
============================ */
if (document.getElementById("post-detail")) {

    const postId = getParam("id");

    // Post tonen
    fetch(`${API}/posts/${postId}`)
        .then(res => res.json())
        .then(post => {
            document.getElementById("post-detail").innerHTML = `
                <div class="card">
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <p>${post.content}</p>
                </div>
            `;
        });

    loadComments(postId);

    // Nieuw comment
    document.getElementById("new-comment-form").addEventListener("submit", e => {
        e.preventDefault();

        const comment = {
            text: document.getElementById("new-comment-text").value
        };

        fetch(`${API}/comments/posts/${postId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        })
            .then(() => {
                document.getElementById("new-comment-text").value = "";
                loadComments(postId);
            });
    });
}

/* ============================
   COMMENTS LADEN
============================ */
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

                        <button class="btn" onclick="startEditComment(${c.id}, '${c.text.replace(/'/g, "\\'")}', ${postId})">
                            Bewerken
                        </button>

                        <button class="btn" onclick="deleteComment(${c.id}, ${postId})">
                            Verwijderen
                        </button>
                    </div>
                `;
            });
        });
}

/* ============================
   COMMENT VERWIJDEREN
============================ */
function deleteComment(commentId, postId) {
    fetch(`${API}/comments/${commentId}`, { method: "DELETE" })
        .then(() => loadComments(postId));
}

/* ============================
   COMMENT BEWERKEN (POPUP)
============================ */
function startEditComment(commentId, text, postId) {
    document.getElementById("edit-comment-box").style.display = "block";
    document.getElementById("edit-comment-text").value = text;

    document.getElementById("edit-comment-form").onsubmit = function (e) {
        e.preventDefault();

        const updated = {
            text: document.getElementById("edit-comment-text").value
        };

        fetch(`${API}/comments/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        })
            .then(() => {
                document.getElementById("edit-comment-box").style.display = "none";
                loadComments(postId);
            });
    };
}

// Annuleren
function cancelEdit() {
    document.getElementById("edit-comment-box").style.display = "none";
}

/* ============================
   POST TOEVOEGEN
============================ */
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

/* ============================
   POST BEWERKEN
============================ */
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
