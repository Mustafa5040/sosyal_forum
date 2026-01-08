
document.addEventListener("DOMContentLoaded", function () {
    const baseTopicUrl = document.getElementById("topicData").dataset.topicUrl;
    const topicListPlaceholder = document.getElementById('topic-list-placeholder');
    const saveTopicButton = document.getElementById('saveTopicButton');
    const newTopicModal = new bootstrap.Modal(document.getElementById('newTopicModal'));

    const LOCAL_STORAGE_KEY = 'forum_topics';
    async function getCombinedTopics() {
        try {
            const response = await fetch('topics.json');
            if (!response.ok) {
                throw new Error('topics.json yüklenemedi');
            }
            const baseTopics = await response.json();

            const localTopics = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
            
            const combinedMap = new Map();
            baseTopics.forEach(topic => combinedMap.set(topic.id, topic));
            localTopics.forEach(topic => combinedMap.set(topic.id, topic));

            return Array.from(combinedMap.values());

        } catch (error) {
            console.error("Konular yüklenirken hata oluştu:", error);
            return [];
        }
    }
    function renderTopics(topics) {
        if (!topicListPlaceholder) return;
        
        topics.sort((a, b) => b.id - a.id);

        topicListPlaceholder.innerHTML = '';
        if (topics.length === 0) {
            topicListPlaceholder.innerHTML = '<p class="text-body-secondary">Gösterilecek konu bulunamadı.</p>';
            return;
        }

        topics.forEach(topic => {
            const topicCardHTML = `
                <div class="card shadow-sm card-topic"> 
                    <div class="card-body">
                        <span class="badge ${topic.badge_class || 'bg-secondary'} mb-2">${topic.category}</span>
                        <h5 class="card-title mb-1">
                            <a href="${baseTopicUrl}?id=${topic.id}" class="stretched-link">
                                ${topic.title}
                            </a>
                        </h5>
                        <small class="text-body-secondary d-block mb-3">${topic.timestamp}</small>
                        <div class="d-flex align-items-center gap-2">
                            <img class="profile-pic-sm" src="/images/logo.png">
                            <span class="fw-bold small">${topic.author}</span>
                        </div>
                    </div>
                </div>`;
            topicListPlaceholder.innerHTML += topicCardHTML;
        });
    }

    async function saveNewTopic() {
        const title = document.getElementById('topicTitle').value.trim();
        const category = document.getElementById('topicCategory').value.trim();
        const body = document.getElementById('topicBody').value.trim();
        const loggedUsername = localStorage.getItem('loggedUsername') || 'anon';

        if (!title || !category || !body) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }


        const allTopics = await getCombinedTopics();

  
        const maxId = allTopics.length > 0 ? Math.max(...allTopics.map(t => t.id)) : 0;
        const newId = maxId + 1;


        const newTopic = {
            id: newId,
            title: title,
            category: category,
            badge_class: "bg-info text-white",
            timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            author: loggedUsername,
            author_image: "logo.png",
            body: body,
            likes: 0,
            comments: []
        };
        
        const localTopics = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        localTopics.push(newTopic);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localTopics));

        document.getElementById('newTopicForm').reset();
        newTopicModal.hide();

        loadAndRenderTopics();
    }

    async function loadAndRenderTopics() {
        const topics = await getCombinedTopics();
        renderTopics(topics);
    }
    saveTopicButton.addEventListener('click', saveNewTopic);

    loadAndRenderTopics();
});