// topic_loader.js - ASP.NET + _Layout + localStorage + TAM UYUMLU
const LOCAL_STORAGE_KEY = 'forum_topics';
const USER_LIKES_KEY = 'forum_user_likes';

document.addEventListener("DOMContentLoaded", function () {
    if (typeof currentTopicId === "undefined" || !currentTopicId) {
        document.body.innerHTML = '<h1 class="text-danger text-center mt-5">Geçersiz konu!</h1>';
        return;
    }

    const loggedUsername = localStorage.getItem('loggedUsername') || 'Misafir';

    const topicHeader = document.getElementById('topic-header-placeholder');
    const topicBody = document.getElementById('topic-body-placeholder');
    const commentsList = document.getElementById('comments-list-placeholder');
    const likeButton = document.getElementById('likeButton');
    const likeCount = document.getElementById('likeCount');
    const newCommentText = document.getElementById('newCommentText');
    const submitCommentButton = document.getElementById('submitCommentButton');

    function getLikedItems() {
        return new Set(JSON.parse(localStorage.getItem(USER_LIKES_KEY)) || []);
    }
    function hasLikedItem(id) { return getLikedItems().has(id); }
    function addLikedItem(id) {
        const set = getLikedItems();
        set.add(id);
        localStorage.setItem(USER_LIKES_KEY, JSON.stringify(Array.from(set)));
    }
    function removeLikedItem(id) {
        const set = getLikedItems();
        set.delete(id);
        localStorage.setItem(USER_LIKES_KEY, JSON.stringify(Array.from(set)));
    }

    async function getCombinedTopics() {
        try {
            const response = await fetch('/topics.json'); // KÖK YOLDAN ALIYOR
            if (!response.ok) throw new Error();
            const base = await response.json();
            const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
            const map = new Map();
            base.forEach(t => map.set(t.id, t));
            local.forEach(t => map.set(t.id, t));
            return Array.from(map.values());
        } catch {
            return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        }
    }

    async function getTopic() {
        const topics = await getCombinedTopics();
        return topics.find(t => t.id === currentTopicId);
    }

    async function saveTopic(updatedTopic) {
        const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const index = local.findIndex(t => t.id === updatedTopic.id);
        if (index >= 0) local[index] = updatedTopic;
        else local.push(updatedTopic);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));
    }

    function renderTopic(topic) {
        if (!topic) {
            topicHeader.innerHTML = "<h1>Konu bulunamadı!</h1>";
            return;
        }

        document.title = `${topic.title} | ATÜ SOSYAL`;

        topicHeader.innerHTML = `
            <div class="card text-white shadow-sm p-4" style="background-color: #76B900;">
                <span class="badge ${topic.badge_class || 'bg-secondary'} mb-2">${topic.category}</span>
                <h1 class="mb-3">${topic.title}</h1>
                <div class="d-flex align-items-center gap-2 small">
                    <img src="${topic.author_image || '/images.png'}" class="rounded-circle profile-pic-sm">
                    <span>${topic.author}</span> • <span>${topic.timestamp}</span>
                </div>
            </div>`;

        topicBody.querySelector('.card-body').innerHTML = topic.body?.replace(/\n/g, '<br>') || '';

        likeCount.textContent = topic.likes || 0;
        if (hasLikedItem(topic.id)) {
            likeButton.className = 'btn btn-danger';
            likeButton.innerHTML = 'Beğenildi';
        } else {
            likeButton.className = 'btn btn-outline-danger';
            likeButton.innerHTML = 'Beğen';
        }

        commentsList.innerHTML = '';
        if (topic.comments?.length > 0) {
            topic.comments.forEach((c, i) => {
                const commentId = `topic_${topic.id}_comment_${i}`;
                const isLiked = hasLikedItem(commentId);
                const isOwn = c.author === loggedUsername;

                commentsList.innerHTML += `
                    <div class="d-flex gap-3 border-bottom pb-3 mb-3">
                        <img src="/images/logo.png" class="rounded-circle" width="40">
                        <div class="w-100">
                            <strong>${c.author}</strong> <small class="text-secondary">• ${c.timestamp}</small>
                            <div class="mt-1">${c.text.replace(/\n/g, '<br>')}</div>
                            <div class="mt-2 d-flex gap-2">
                                <button class="btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-danger'} comment-like" data-index="${i}">
                                    (${c.likes || 0})
                                </button>
                                <button class="btn btn-sm btn-outline-secondary reply-comment" data-index="${i}">Yanıtla</button>
                                ${isOwn ? `<button class="btn btn-sm btn-outline-danger delete-comment" data-index="${i}">Sil</button>` : ''}
                            </div>
                        </div>
                    </div>`;
            });
        } else {
            commentsList.innerHTML = '<p class="text-center text-secondary py-4">Henüz yorum yok.</p>';
        }
    }

    // YORUM GÖNDER
    submitCommentButton.addEventListener('click', async () => {
        const text = newCommentText.value.trim();
        if (!text) return;

        const topic = await getTopic();
        if (!topic.comments) topic.comments = [];

        topic.comments.push({
            author: loggedUsername,
            timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            text: text,
            likes: 0
        });

        await saveTopic(topic);
        newCommentText.value = '';
        renderTopic(topic);
    });

    // BEĞEN
    likeButton.addEventListener('click', async () => {
        const topic = await getTopic();
        if (hasLikedItem(topic.id)) {
            topic.likes = Math.max((topic.likes || 1) - 1, 0);
            removeLikedItem(topic.id);
        } else {
            topic.likes = (topic.likes || 0) + 1;
            addLikedItem(topic.id);
        }
        await saveTopic(topic);
        renderTopic(topic);
    });

    // YORUM BEĞEN / SİL / YANITLA
    commentsList.addEventListener('click', async (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const index = parseInt(btn.dataset.index);
        const topic = await getTopic();

        if (btn.classList.contains('comment-like')) {
            const id = `topic_${topic.id}_comment_${index}`;
            if (hasLikedItem(id)) {
                topic.comments[index].likes--;
                removeLikedItem(id);
            } else {
                topic.comments[index].likes++;
                addLikedItem(id);
            }
        }

        if (btn.classList.contains('delete-comment')) {
            if (topic.comments[index].author !== loggedUsername) return alert("Sadece kendi yorumunu silebilirsin!");
            if (!confirm("Silmeyi onaylıyor musun?")) return;
            topic.comments.splice(index, 1);
        }

        if (btn.classList.contains('reply-comment')) {
            const c = topic.comments[index];
            newCommentText.value = `@${c.author}\n> ${c.text.split('\n')[0]}\n\n`;
            newCommentText.focus();
        }

        await saveTopic(topic);
        renderTopic(topic);
    });

    // ENTER ile gönder
    newCommentText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitCommentButton.click();
        }
    });

    // SAYFA BAŞLAT
    (async () => {
        const topic = await getTopic();
        renderTopic(topic);
    })();
});