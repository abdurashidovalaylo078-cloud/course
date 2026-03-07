// ---- Toast Notification ----
function showToast(message, duration = 3000) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.style.cssText = `
            position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px);
            background: var(--color-surface, #1e1e2e); color: var(--color-text, #fff);
            padding: 0.8rem 1.5rem; border-radius: 999px; font-size: 0.9rem;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 99999;
            transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
            opacity: 0; border: 1px solid rgba(245,158,11,0.3); pointer-events: none;
            display: flex; align-items: center; gap: 0.5rem; white-space: nowrap;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    clearTimeout(toast._hideTimer);
    // Show
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    });
    toast._hideTimer = setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.opacity = '0';
    }, duration);
}

// App Logic
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navItems = document.querySelectorAll('.nav-item');
    const contentArea = document.getElementById('content-area');
    const profileName = document.querySelector('.user-info .name');
    const profileRole = document.querySelector('.user-info .role');

    // Init User Data
    if (profileName) profileName.textContent = currentUser.name;
    if (profileRole) profileRole.textContent = currentUser.role;

    // State
    let currentState = {
        currentPage: 'courses',
        activeCourseId: null,
        activeLessonId: null,
        settingsTab: 'profile' // 'profile', 'security', 'notifications', 'app'
    };

    // Initial Load
    loadPage('courses');

    // Navigation Events
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');

            // UI Updates
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            currentState.currentPage = page;
            loadPage(page);
        });
    });

    // --- Page Routing ---
    function loadPage(page) {
        contentArea.style.opacity = '0';

        // Update nav active state
        navItems.forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-page') === page);
        });
        currentState.currentPage = page;

        setTimeout(() => {
            switch (page) {
                case 'courses':
                    renderCoursesList();
                    break;
                case 'certificates':
                    renderCertificates();
                    break;
                case 'chat':
                    renderChat();
                    break;
                case 'settings':
                    if (!currentState.settingsTab) currentState.settingsTab = 'profile';
                    renderSettings();
                    break;
            }
            contentArea.style.opacity = '1';
        }, 200);
    }
    // Make loadPage globally accessible for inline onclick
    window.loadPage = loadPage;

    // Settings Tab Switcher
    window.switchSettingsTab = function (tab) {
        currentState.settingsTab = tab;
        renderSettings();
    };

    // --- Render Functions ---

    function renderCoursesList() {
        // Calculate dynamic progress or use static for now
        const coursesHTML = coursesData.map(course => `
            <div class="card course-card" onclick="openCourse(${course.id})">
                <div class="course-thumb" style="background-image: url('${course.thumbnail}'); background-size: cover; background-position: center; height: 180px; position: relative;">
                    <div class="play-overlay" style="position: absolute; inset:0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s;">
                        <i class="ph-fill ph-play-circle" style="font-size: 3rem; color: white;"></i>
                    </div>
                </div>
                <div class="course-info" style="padding: 1.2rem;">
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem;">${course.title}</h3>
                    <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1rem;">${course.instructor}</p>
                    <div class="progress-container">
                        <div class="progress-bar" style="background: var(--color-bg-dark); height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 0.5rem;">
                            <div class="progress-fill" style="width: ${course.progress}%; background: var(--color-primary); height: 100%;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--color-text-muted);">
                            <span>${course.progress}% tugatildi</span>
                            <span>${course.completedLessons}/${course.totalLessons} dars</span>
                        </div>
                    </div>
                </div>
                <style>
                    .course-card { cursor: pointer; overflow: hidden; padding: 0 !important; }
                    .course-card:hover .play-overlay { opacity: 1 !important; }
                </style>
            </div>
        `).join('');

        contentArea.innerHTML = `
            <h2 class="section-title">Mening Kurslarim</h2>
            <div class="grid-3">
                ${coursesHTML}
            </div>
        `;
    }



    window.openCourse = function (id) {
        const course = coursesData.find(c => c.id === id);
        if (!course) return;

        currentState.activeCourseId = id;

        // Find first unfinished lesson or first lesson
        let firstLesson = null;
        for (let module of course.modules) {
            if (module.lessons.length > 0) {
                firstLesson = module.lessons[0];
                break;
            }
        }

        if (firstLesson) {
            renderCoursePlayer(course, firstLesson);
        } else {
            contentArea.innerHTML = `<h2>Ushbu kursda hali darslar yo'q.</h2>`;
        }
    };

    function renderCoursePlayer(course, activeLesson) {
        currentState.activeLessonId = activeLesson.id;

        // Generate Playlist HTML
        let playlistHTML = '';
        course.modules.forEach(module => {
            playlistHTML += `<div class="module-title">${module.title}</div>`;
            module.lessons.forEach(lesson => {
                const isActive = lesson.id === activeLesson.id ? 'active' : '';
                const isCompleted = lesson.completed ? 'completed' : '';
                const icon = lesson.type === 'video' ? 'ph-play-circle' : 'ph-file-text';
                const statusIcon = lesson.completed ? 'ph-check-circle' : icon;

                playlistHTML += `
                    <div class="lesson-item ${isActive} ${isCompleted}" onclick="playLesson(${course.id}, ${lesson.id})">
                        <i class="ph-fill ${statusIcon} status-icon"></i>
                        <div class="lesson-info">
                            <span class="lesson-title">${lesson.title}</span>
                        </div>
                    </div>
                `;
            });
        });

        // Main Player UI
        contentArea.innerHTML = `
            <button class="btn-primary" style="margin-bottom: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="loadPage('courses')">
                <i class="ph ph-arrow-left"></i> Kurslarga qaytish
            </button>
            
            <div class="player-container">
                <div class="video-section">
                    <div class="video-wrapper">
                        ${activeLesson.type === 'video' && activeLesson.videoUrl ? (() => {
                const videoId = activeLesson.videoUrl.split('/embed/')[1];
                return `
                            <iframe 
                                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
                                style="position:absolute;inset:0;width:100%;height:100%;border:none;"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                                title="${activeLesson.title}"
                            ></iframe>`;
            })() : activeLesson.type === 'homework' ? `
                            <div class="video-placeholder-content" style="background: linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.03) 100%); border: 2px dashed rgba(245,158,11,0.3);">
                                <i class="ph-fill ph-file-arrow-up" style="font-size: 4rem; color: var(--color-primary); margin-bottom: 1rem;"></i>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.4rem;">Uyga Vazifa</p>
                                <p style="font-size: 0.9rem; color: var(--color-text-muted);">Ishingizni pastdagi yuklash oynasiga yuboring</p>
                            </div>
                        ` : `
                            <div class="video-placeholder-content">
                                <i class="ph-fill ph-play-circle"></i>
                                <p>Video yuklanmoqda: ${activeLesson.title}</p>
                            </div>
                        `}
                    </div>
                    
                    <div class="lesson-details card">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <h2>${activeLesson.title}</h2>
                                <div class="lesson-meta">
                                    <span><i class="ph ph-folder"></i> ${course.title}</span>
                                    ${activeLesson.type === 'homework' ? `<span style="margin-left:0.5rem; background: rgba(245,158,11,0.15); color: var(--color-primary); padding: 0.15rem 0.7rem; border-radius: 999px; font-size: 0.8rem;"><i class="ph ph-pencil-line"></i> Uyga Vazifa</span>` : ''}
                                </div>
                            </div>
                            <button class="btn-primary" id="complete-btn-${activeLesson.id}" onclick="markAsComplete(${activeLesson.id}, ${course.id})">
                                ${activeLesson.completed ? '<i class="ph ph-check"></i> Tugatilgan' : 'Tugatdim'}
                            </button>
                        </div>
                        
                        <p style="color: var(--color-text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
                            ${activeLesson.type === 'homework'
                ? `Vazifani bajaring va faylingizni quyidagi maydonga yuklang. Qo'llab-quvvatlanadigan formatlar: .rar, .zip, .max, .jpg, .png, .pdf`
                : `Ushbu darsda siz ${activeLesson.title.toLowerCase()} haqida batafsil ma'lumot olasiz. Diqqat bilan kuzating va amaliyotda qo'llang.`
            }
                        </p>

                        ${activeLesson.type === 'homework' ? `

                        <!-- Teacher Review Status -->
                        <div style="margin-bottom: 1.2rem;">
                            ${activeLesson.reviewStatus === 'checked' ? `
                            <div style="display:flex; align-items:flex-start; gap:1rem; padding:1rem 1.2rem; border-radius:12px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.3);">
                                <div style="display:flex; align-items:center; gap:0.5rem; flex-shrink:0; margin-top:0.1rem;">
                                    <i class="ph-fill ph-seal-check" style="font-size:1.6rem; color:#10B981;"></i>
                                </div>
                                <div style="flex:1;">
                                    <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.35rem; flex-wrap:wrap;">
                                        <span style="font-weight:700; color:#10B981; font-size:0.95rem;">O'qituvchi tekshirdi</span>
                                        ${activeLesson.reviewGrade ? `<span style="background:#10B981; color:#fff; font-weight:700; padding:0.1rem 0.65rem; border-radius:999px; font-size:0.82rem;">Baho: ${activeLesson.reviewGrade}</span>` : ''}
                                    </div>
                                    ${activeLesson.reviewComment ? `<p style="margin:0; font-size:0.87rem; color:var(--color-text-muted); line-height:1.5;"><i class="ph ph-quotes" style="color:#10B981; margin-right:0.3rem;"></i>${activeLesson.reviewComment}</p>` : ''}
                                </div>
                            </div>
                            ` : `
                            <div style="display:flex; align-items:center; gap:0.8rem; padding:0.8rem 1.2rem; border-radius:12px; background:rgba(245,158,11,0.07); border:1px solid rgba(245,158,11,0.25);">
                                <i class="ph ph-clock" style="font-size:1.3rem; color:var(--color-primary); flex-shrink:0;"></i>
                                <div>
                                    <p style="margin:0; font-weight:600; color:var(--color-primary); font-size:0.9rem;">O'qituvchi hali tekshirmadi</p>
                                    <p style="margin:0; font-size:0.8rem; color:var(--color-text-muted);">Vazifangiz yuborilgandan so'ng o'qituvchi tekshirib, baho qo'yadi</p>
                                </div>
                            </div>
                            `}
                        </div>

                        <!-- Upload / Submitted state -->
                        ${activeLesson.status === 'submitted' ? `
                        <div style="display:flex; align-items:center; gap:0.8rem; padding:1rem 1.2rem; border-radius:12px; background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.25);">
                            <i class="ph-fill ph-paper-plane-tilt" style="font-size:1.4rem; color:#3B82F6; flex-shrink:0;"></i>
                            <div style="flex:1;">
                                <p style="margin:0; font-weight:600; color:#3B82F6; font-size:0.9rem;">Vazifa yuborilgan</p>
                                <p style="margin:0; font-size:0.8rem; color:var(--color-text-muted);">Ish topshirildi. Yangi fayl yuklash uchun quyidagi tugmani bosing.</p>
                            </div>
                            <button onclick="document.getElementById('hw-reupload-box-${activeLesson.id}').style.display='block'; this.parentElement.style.display='none';"
                                style="background:rgba(59,130,246,0.15); border:1px solid rgba(59,130,246,0.4); color:#3B82F6; border-radius:8px; padding:0.4rem 0.9rem; cursor:pointer; font-size:0.82rem; white-space:nowrap; flex-shrink:0;">
                                <i class="ph ph-arrow-clockwise"></i> Qayta yuklash
                            </button>
                        </div>
                        <div id="hw-reupload-box-${activeLesson.id}" style="display:none; margin-top:0.8rem;">
                        ` : ''}

                        <!-- Upload Box - Label based (100% reliable) -->
                        <label for="hw-file-input-${activeLesson.id}"
                            id="hw-upload-box-${activeLesson.id}"
                            style="${activeLesson.status === 'submitted' ? 'display:none;' : 'display:block;'} position:relative; overflow:hidden; border-radius:16px; cursor:pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;"
                            ondragover="event.preventDefault(); this.style.transform='scale(1.01)'; this.style.boxShadow='0 0 0 3px rgba(245,158,11,0.4)';"
                            ondragleave="this.style.transform=''; this.style.boxShadow='';"
                            ondrop="handleHwDrop(event, ${activeLesson.id}, ${course.id}); this.style.transform=''; this.style.boxShadow='';"
                            onmouseenter="this.style.transform='scale(1.005)'; this.style.boxShadow='0 8px 30px rgba(245,158,11,0.15)';"
                            onmouseleave="this.style.transform=''; this.style.boxShadow='';">

                            <!-- gradient bg -->
                            <div style="position:absolute;inset:0; background:linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(217,119,6,0.03) 50%, rgba(245,158,11,0.08) 100%); border:1.5px dashed rgba(245,158,11,0.4); border-radius:16px; pointer-events:none;"></div>
                            <!-- shimmer line -->
                            <div style="position:absolute;top:0;left:0;right:0;height:2px; background:linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent); border-radius:16px 16px 0 0; pointer-events:none;"></div>

                            <div style="position:relative; padding:2.2rem 1.5rem; display:flex; flex-direction:column; align-items:center; gap:1rem;">

                                <!-- icon circle -->
                                <div style="
                                    width:72px; height:72px;
                                    background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.08));
                                    border:1.5px solid rgba(245,158,11,0.35);
                                    border-radius:50%;
                                    display:flex; align-items:center; justify-content:center;
                                    box-shadow: 0 0 24px rgba(245,158,11,0.12);
                                ">
                                    <i class="ph ph-upload-simple" style="font-size:2rem; color:var(--color-primary);"></i>
                                </div>

                                <div style="text-align:center;">
                                    <p style="font-size:1rem; font-weight:700; margin:0 0 0.3rem; letter-spacing:-0.2px;">Faylni bu yerga tashlang</p>
                                    <p style="font-size:0.85rem; color:var(--color-text-muted); margin:0;">yoki <span style="color:var(--color-primary); font-weight:600; text-decoration:underline; text-underline-offset:3px;">kompyuterdan tanlang</span></p>
                                </div>

                                <!-- format badges -->
                                <div style="display:flex; flex-wrap:wrap; gap:0.4rem; justify-content:center;">
                                    ${['RAR', 'ZIP', 'MAX', 'JPG', 'PNG', 'PDF'].map(f => `<span style="font-size:0.7rem; font-weight:700; letter-spacing:0.5px; padding:0.2rem 0.55rem; border-radius:6px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2); color:rgba(245,158,11,0.85);">${f}</span>`).join('')}
                                </div>

                                <p style="font-size:0.75rem; color:var(--color-text-muted); margin:0; opacity:0.7;">Maksimal hajm: <strong style="color:var(--color-text);">50 MB</strong></p>
                            </div>

                            <input type="file" id="hw-file-input-${activeLesson.id}"
                                style="position:absolute; width:1px; height:1px; opacity:0; pointer-events:none;"
                                accept=".rar,.zip,.max,.jpg,.jpeg,.png,.pdf"
                                onchange="handleHwFileSelect(event, ${activeLesson.id}, ${course.id})">
                        </label>

                        ${activeLesson.status === 'submitted' ? '</div>' : ''}

                        <!-- Progress Bar -->
                        <div id="hw-progress-wrap-${activeLesson.id}" style="display:none; margin-top:1rem; padding:1.2rem 1.4rem; border-radius:14px; background:var(--color-surface, rgba(255,255,255,0.04)); border:1px solid var(--color-border);">
                            <div style="display:flex; align-items:center; gap:0.9rem; margin-bottom:1rem;">
                                <div style="width:40px;height:40px; border-radius:10px; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.25); display:flex;align-items:center;justify-content:center; flex-shrink:0;">
                                    <i class="ph-fill ph-file-zip" style="color:var(--color-primary); font-size:1.1rem;"></i>
                                </div>
                                <div style="flex:1; min-width:0;">
                                    <span id="hw-file-name-${activeLesson.id}" style="font-size:0.88rem; font-weight:600; display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"></span>
                                    <span id="hw-status-${activeLesson.id}" style="font-size:0.78rem; color:var(--color-text-muted);">Yuklanmoqda...</span>
                                </div>
                                <span id="hw-percent-${activeLesson.id}" style="font-size:1rem; color:var(--color-primary); font-weight:700; flex-shrink:0;">0%</span>
                            </div>
                            <div style="background:rgba(255,255,255,0.06); border-radius:999px; height:6px; overflow:hidden;">
                                <div id="hw-bar-${activeLesson.id}" style="height:100%; width:0%; background:linear-gradient(90deg,#F59E0B,#fbbf24,#d97706); border-radius:999px; transition:width 0.25s ease; position:relative;">
                                    <div style="position:absolute;right:0;top:50%;transform:translateY(-50%);width:10px;height:10px;border-radius:50%;background:#F59E0B;box-shadow:0 0 6px rgba(245,158,11,0.8);"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Success -->
                        <div id="hw-success-${activeLesson.id}" style="display:none; margin-top:1rem; padding:1.2rem 1.4rem; border-radius:14px; background:linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.06)); border:1px solid rgba(16,185,129,0.3); align-items:center; gap:1rem;">
                            <div style="width:44px;height:44px;border-radius:12px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="ph-fill ph-check-fat" style="font-size:1.3rem; color:#10B981;"></i>
                            </div>
                            <div style="flex:1; min-width:0;">
                                <p style="font-weight:700; color:#10B981; margin:0 0 0.2rem; font-size:0.95rem;">Muvaffaqiyatli yuklandi!</p>
                                <p id="hw-success-name-${activeLesson.id}" style="font-size:0.8rem; color:var(--color-text-muted); margin:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"></p>
                            </div>
                            <i class="ph-fill ph-sparkle" style="font-size:1.2rem; color:rgba(16,185,129,0.5); flex-shrink:0;"></i>
                        </div>
                        ` : ''}

                    </div>
                </div>

                <aside class="course-playlist">
                    <div class="playlist-header">
                        <h3>Kurs Mundarijasi</h3>
                        <p style="font-size: 0.8rem; color: var(--color-text-muted);">${course.completedLessons}/${course.totalLessons} dars tugatildi</p>
                    </div>
                    <div class="playlist-content">
                        ${playlistHTML}
                    </div>
                </aside>
            </div>
        `;
    }


    window.playLesson = function (courseId, lessonId) {
        const course = coursesData.find(c => c.id === courseId);
        let lesson = null;
        for (let m of course.modules) {
            const found = m.lessons.find(l => l.id === lessonId);
            if (found) {
                lesson = found;
                break;
            }
        }
        if (lesson) {
            renderCoursePlayer(course, lesson);
        }
    };

    window.markAsComplete = function (lessonId, courseId) {
        const course = coursesData.find(c => c.id === courseId);
        if (!course) return;
        let lesson = null;
        for (const mod of course.modules) {
            const found = mod.lessons.find(l => l.id === lessonId);
            if (found) { lesson = found; break; }
        }
        if (!lesson || lesson.completed) return;

        lesson.completed = true;
        course.completedLessons = Math.min(course.completedLessons + 1, course.totalLessons);
        course.progress = Math.round((course.completedLessons / course.totalLessons) * 100);

        // Update button appearance
        const btn = document.getElementById('complete-btn-' + lessonId);
        if (btn) {
            btn.innerHTML = '<i class="ph ph-check"></i> Tugatilgan';
            btn.disabled = true;
            btn.style.opacity = '0.7';
        }

        // Update playlist item
        const lessonItem = document.querySelector(`.lesson-item[onclick*="${lessonId}"]`);
        if (lessonItem) {
            lessonItem.classList.add('completed');
            const icon = lessonItem.querySelector('.status-icon');
            if (icon) {
                icon.className = 'ph-fill ph-check-circle status-icon';
            }
        }

        // Show toast
        showToast('Dars muvaffaqiyatli tugatildi! 🎉');
    };

    // ---- Homework Upload Handlers ----
    window.handleHwFileSelect = function (event, lessonId, courseId) {
        const file = event.target.files[0];
        if (file) simulateHwUpload(file, lessonId, courseId);
    };

    window.handleHwDrop = function (event, lessonId, courseId) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) simulateHwUpload(file, lessonId, courseId);
    };

    function simulateHwUpload(file, lessonId, courseId) {
        // Validate size (50MB)
        if (file.size > 50 * 1024 * 1024) {
            showToast('❌ Fayl hajmi 50MB dan oshmasligi kerak!');
            return;
        }

        const box = document.getElementById('hw-upload-box-' + lessonId);
        const progressWrap = document.getElementById('hw-progress-wrap-' + lessonId);
        const bar = document.getElementById('hw-bar-' + lessonId);
        const percent = document.getElementById('hw-percent-' + lessonId);
        const status = document.getElementById('hw-status-' + lessonId);
        const fileName = document.getElementById('hw-file-name-' + lessonId);
        const successBox = document.getElementById('hw-success-' + lessonId);
        const successName = document.getElementById('hw-success-name-' + lessonId);

        if (!box || !progressWrap || !bar) return;

        // Hide upload area, show progress
        box.style.display = 'none';
        progressWrap.style.display = 'block';
        if (fileName) fileName.textContent = file.name;
        if (status) status.textContent = 'Yuklanmoqda...';
        if (bar) bar.style.width = '0%';
        if (percent) percent.textContent = '0%';

        // Create Blob URL for download (works offline, no server needed)
        const blobUrl = URL.createObjectURL(file);
        const isImage = file.type.startsWith('image/');
        const fileSize = file.size < 1024 * 1024
            ? (file.size / 1024).toFixed(1) + ' KB'
            : (file.size / (1024 * 1024)).toFixed(2) + ' MB';
        const ext = file.name.split('.').pop().toUpperCase();

        // Animate progress bar realistically
        let progress = 0;
        const totalTime = Math.min(file.size / 50000, 3000); // faster for smaller files
        const stepTime = 80;
        const steps = totalTime / stepTime;

        const interval = setInterval(() => {
            // Ease-out curve: fast start, slow finish
            const remaining = 100 - progress;
            progress += remaining * 0.18 + Math.random() * 4;
            if (progress >= 97) {
                progress = 97;
                clearInterval(interval);
                if (bar) bar.style.width = '97%';
                if (percent) percent.textContent = '97%';
                if (status) status.textContent = 'Tekshirilmoqda...';

                // Final step
                setTimeout(() => {
                    if (bar) bar.style.width = '100%';
                    if (percent) percent.textContent = '100%';

                    setTimeout(() => {
                        progressWrap.style.display = 'none';

                        // Build success content with preview + download
                        if (successBox) {
                            successBox.innerHTML = `
                                <div style="width:48px;height:48px;border-radius:12px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                    ${isImage
                                    ? `<img src="${blobUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:11px;">`
                                    : `<span style="font-size:0.65rem;font-weight:800;color:#10B981;">${ext}</span>`
                                }
                                </div>
                                <div style="flex:1;min-width:0;">
                                    <p style="font-weight:700;color:#10B981;margin:0 0 0.15rem;font-size:0.92rem;">Muvaffaqiyatli yuklandi!</p>
                                    <p style="font-size:0.8rem;color:var(--color-text-muted);margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${file.name}">${file.name}</p>
                                    <p style="font-size:0.75rem;color:var(--color-text-muted);margin:0.1rem 0 0;opacity:0.7;">${fileSize}</p>
                                </div>
                                <a href="${blobUrl}" download="${file.name}"
                                    style="display:flex;align-items:center;gap:0.4rem;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.35);color:#10B981;border-radius:8px;padding:0.45rem 0.85rem;font-size:0.82rem;font-weight:600;text-decoration:none;flex-shrink:0;cursor:pointer;transition:background 0.2s;"
                                    onmouseenter="this.style.background='rgba(16,185,129,0.25)'"
                                    onmouseleave="this.style.background='rgba(16,185,129,0.15)'">
                                    <i class="ph ph-download-simple"></i> Yuklab olish
                                </a>
                            `;
                            successBox.style.display = 'flex';
                        }

                        // Update lesson data
                        const course = coursesData.find(c => c.id === courseId);
                        if (course) {
                            for (const mod of course.modules) {
                                const lesson = mod.lessons.find(l => l.id === lessonId);
                                if (lesson) {
                                    lesson.status = 'submitted';
                                    lesson.uploadedFile = { name: file.name, size: fileSize, blobUrl, isImage };
                                    break;
                                }
                            }
                        }

                        showToast('📤 Uyga vazifangiz muvaffaqiyatli yuklandi!');
                    }, 400);
                }, 500);
            } else {
                if (bar) bar.style.width = progress + '%';
                if (percent) percent.textContent = Math.floor(progress) + '%';
            }
        }, stepTime);
    }

    function renderCertificates() {
        contentArea.innerHTML = `
            <h2 class="section-title">Mening Sertifikatlarim</h2>
            <div class="grid-3">
                ${certificatesData.map(cert => `
                    <div class="card cert-card" style="overflow:hidden; padding:0;">
                        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding:2rem; text-align:center; position:relative;">
                            <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at 70% 30%, rgba(245,158,11,0.15) 0%, transparent 60%);pointer-events:none;"></div>
                            <i class="ph-fill ph-certificate" style="font-size:3.5rem; color:#F59E0B; margin-bottom:0.8rem; display:block; position:relative;"></i>
                            <h3 style="color:white; margin-bottom:0.3rem; position:relative;">${cert.title}</h3>
                            <p style="color:rgba(255,255,255,0.6); font-size:0.85rem; position:relative;">Kurs sertifikati</p>
                        </div>
                        <div style="padding:1.5rem;">
                            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.6rem;">
                                <i class="ph ph-user-circle" style="color:var(--color-primary);"></i>
                                <span style="font-size:0.9rem;">${currentUser.name}</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1.5rem;">
                                <i class="ph ph-calendar" style="color:var(--color-primary);"></i>
                                <span style="font-size:0.9rem; color:var(--color-text-muted);">Berilgan sana: ${cert.issueDate}</span>
                            </div>
                            <div style="display:flex; gap:0.8rem;">
                                <button class="btn-primary" style="flex:1; justify-content:center;" onclick="previewCert(${cert.id})">
                                    <i class="ph ph-eye"></i> Ko'rish
                                </button>
                                <button class="btn-primary" style="flex:1; justify-content:center; background:transparent; border:1px solid var(--color-primary); color:var(--color-primary);" onclick="downloadCert(${cert.id})">
                                    <i class="ph ph-download-simple"></i> PDF
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Certificate Modal -->
            <div id="cert-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:9999; align-items:center; justify-content:center; padding:1rem;">
                <div style="position:relative; max-width:800px; width:100%;">
                    <button onclick="closeCertModal()" style="position:absolute; top:-2.5rem; right:0; background:none; border:none; color:white; font-size:1.5rem; cursor:pointer;">
                        <i class="ph ph-x-circle"></i>
                    </button>
                    <div id="cert-preview"></div>
                    <div style="display:flex; gap:1rem; margin-top:1rem; justify-content:center;">
                        <button class="btn-primary" onclick="printCert()">
                            <i class="ph ph-printer"></i> PDF sifatida saqlash
                        </button>
                        <button class="btn-primary" style="background:transparent; border:1px solid white; color:white;" onclick="closeCertModal()">
                            <i class="ph ph-x"></i> Yopish
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Build cert data map for modal
        window._certMap = {};
        certificatesData.forEach(c => { window._certMap[c.id] = c; });
    }

    function buildCertHTML(cert) {
        return `
        <div id="cert-document" style="
            background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 40%, #0f1923 100%);
            width: 100%;
            aspect-ratio: 1.414/1;
            box-sizing: border-box;
            position: relative;
            font-family: 'Inter', sans-serif;
            color: #fff;
            border-radius: 12px;
            overflow: hidden;
        ">
            <!-- Geometric BG shapes -->
            <div style="position:absolute;top:-80px;right:-80px;width:300px;height:300px;border:2px solid rgba(245,158,11,0.15);border-radius:50%;pointer-events:none;"></div>
            <div style="position:absolute;top:-40px;right:-40px;width:200px;height:200px;border:2px solid rgba(245,158,11,0.1);border-radius:50%;pointer-events:none;"></div>
            <div style="position:absolute;bottom:-100px;left:-60px;width:280px;height:280px;border:1px solid rgba(245,158,11,0.08);border-radius:50%;pointer-events:none;"></div>

            <!-- Left orange accent bar -->
            <div style="position:absolute;left:0;top:0;bottom:0;width:6px;background:linear-gradient(to bottom,#F59E0B,#d97706,#92400e);"></div>

            <!-- Top right glow -->
            <div style="position:absolute;top:0;right:0;width:250px;height:200px;background:radial-gradient(ellipse at top right,rgba(245,158,11,0.18) 0%,transparent 70%);pointer-events:none;"></div>

            <!-- Subtle grid lines -->
            <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(245,158,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;"></div>

            <!-- Outer border frame -->
            <div style="position:absolute;inset:10px;border:1px solid rgba(245,158,11,0.3);border-radius:8px;pointer-events:none;"></div>

            <!-- Content wrapper -->
            <div style="position:relative;height:100%;display:flex;flex-direction:column;padding:3% 4% 3% 5%;">

                <!-- HEADER: Logo + Title -->
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2%;">
                    <!-- 3D Max Pro Logo -->
                    <div style="display:flex;align-items:center;gap:0.6rem;">
                        <div style="
                            width:44px;height:44px;
                            background:linear-gradient(135deg,#F59E0B,#d97706);
                            border-radius:10px;
                            display:flex;align-items:center;justify-content:center;
                            box-shadow:0 4px 20px rgba(245,158,11,0.4);
                            flex-shrink:0;
                        ">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#1a1a1a"/>
                                <path d="M2 17l10 5 10-5" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
                                <path d="M2 12l10 5 10-5" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;letter-spacing:1px;color:#fff;line-height:1.1;">3D Max <span style="color:#F59E0B;">Pro</span></div>
                            <div style="font-size:0.55rem;letter-spacing:3px;color:rgba(245,158,11,0.7);text-transform:uppercase;">Online Ta'lim Markazi</div>
                        </div>
                    </div>
                    <!-- Cert number badge -->
                    <div style="text-align:right;">
                        <div style="font-size:0.55rem;letter-spacing:2px;color:rgba(255,255,255,0.4);text-transform:uppercase;">Sertifikat ID</div>
                        <div style="font-size:0.75rem;color:rgba(245,158,11,0.8);font-weight:600;">#3DMP-${cert.id.toString().padStart(4, '0')}-2024</div>
                    </div>
                </div>

                <!-- Divider -->
                <div style="height:1px;background:linear-gradient(to right,#F59E0B,rgba(245,158,11,0.3),transparent);margin-bottom:4%;"></div>

                <!-- MAIN BODY -->
                <div style="flex:1;display:flex;flex-direction:column;justify-content:center;text-align:center;padding:0 2%;">
                    <p style="font-size:clamp(0.6rem,1.2vw,0.85rem);letter-spacing:3px;text-transform:uppercase;color:rgba(245,158,11,0.7);margin-bottom:1rem;">Muvaffaqiyat Sertifikati</p>

                    <div style="margin-bottom:1rem;">
                        <p style="font-size:clamp(0.65rem,1.1vw,0.8rem);color:rgba(255,255,255,0.5);margin-bottom:0.4rem;">Ushbu sertifikat</p>
                        <h2 style="
                            font-size:clamp(1.6rem,4.5vw,3.2rem);
                            font-weight:800;
                            margin:0;
                            background:linear-gradient(135deg,#ffffff 0%,#F59E0B 100%);
                            -webkit-background-clip:text;
                            -webkit-text-fill-color:transparent;
                            background-clip:text;
                            line-height:1.1;
                            letter-spacing:-0.5px;
                        ">${currentUser.name}</h2>
                        <div style="display:flex;align-items:center;gap:0.6rem;justify-content:center;margin-top:0.6rem;">
                            <div style="height:1px;width:60px;background:linear-gradient(to left,#F59E0B,transparent);"></div>
                            <i class="ph-fill ph-star" style="color:#F59E0B;font-size:0.75rem;"></i>
                            <div style="height:1px;width:60px;background:linear-gradient(to right,#F59E0B,transparent);"></div>
                        </div>
                    </div>

                    <p style="font-size:clamp(0.65rem,1.1vw,0.8rem);color:rgba(255,255,255,0.5);margin-bottom:0.5rem;">quyidagi kursni to'liq yakunlagan holda taqdim etiladi</p>

                    <div style="
                        display:inline-block;
                        background:rgba(245,158,11,0.12);
                        border:1px solid rgba(245,158,11,0.4);
                        border-radius:8px;
                        padding:0.6rem 2rem;
                        margin:0 auto 0.8rem;
                    ">
                        <h3 style="
                            font-size:clamp(0.85rem,2vw,1.3rem);
                            color:#F59E0B;
                            margin:0;
                            font-weight:700;
                            letter-spacing:0.5px;
                        ">${cert.title}</h3>
                    </div>

                    <p style="font-size:clamp(0.55rem,1vw,0.75rem);color:rgba(255,255,255,0.35);max-width:80%;margin:0 auto;">
                        Kurs davomida barcha modul va topshiriqlarni muvaffaqiyatli bajarib, kasbiy bilim va ko'nikmalarni o'zlashtirdi.
                    </p>
                </div>

                <!-- FOOTER -->
                <div>
                    <div style="height:1px;background:linear-gradient(to right,transparent,rgba(245,158,11,0.3),transparent);margin-bottom:2%;"></div>
                    <div style="display:flex;justify-content:space-between;align-items:flex-end;">


                        <!-- Center seal -->
                        <div style="text-align:center;">
                            <div style="
                                width:64px;height:64px;
                                border:2px solid rgba(245,158,11,0.6);
                                border-radius:50%;
                                display:flex;align-items:center;justify-content:center;
                                background:rgba(245,158,11,0.1);
                                box-shadow:0 0 20px rgba(245,158,11,0.25),inset 0 0 15px rgba(245,158,11,0.05);
                                margin:0 auto;
                            ">
                                <i class="ph-fill ph-seal-check" style="font-size:2rem;color:#F59E0B;"></i>
                            </div>
                            <div style="font-size:0.5rem;letter-spacing:2px;color:rgba(245,158,11,0.5);text-transform:uppercase;margin-top:0.3rem;">Tasdiqlangan</div>
                        </div>

                        <!-- Date -->
                        <div style="text-align:center;">
                            <div style="font-size:clamp(0.7rem,1.2vw,0.85rem);font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:0.2rem;">${cert.issueDate}</div>
                            <div style="font-size:clamp(0.55rem,0.9vw,0.65rem);color:rgba(255,255,255,0.4);letter-spacing:1px;text-transform:uppercase;">Berilgan Sana</div>
                            <div style="width:80px;height:1px;background:rgba(245,158,11,0.4);margin-top:0.3rem;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    window.previewCert = function (id) {
        const cert = window._certMap[id];
        if (!cert) return;
        const modal = document.getElementById('cert-modal');
        document.getElementById('cert-preview').innerHTML = buildCertHTML(cert);
        modal.style.display = 'flex';
    };

    window.closeCertModal = function () {
        document.getElementById('cert-modal').style.display = 'none';
    };

    window.printCert = function () {
        const certHTML = document.getElementById('cert-document').outerHTML;
        const win = window.open('', '_blank');
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Sertifikat</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
                <script src="https://unpkg.com/@phosphor-icons/web"><\/script>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { background: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
                    #cert-document { width: 90vw; max-width: 900px; }
                    @media print {
                        body { min-height: auto; }
                        #cert-document { width: 100%; max-width: 100%; }
                    }
                </style>
            </head>
            <body>
                ${certHTML}
                <script>
                    setTimeout(function(){ window.print(); window.close(); }, 800);
                <\/script>
            </body>
            </html>
        `);
        win.document.close();
    };

    window.downloadCert = function (id) {
        window.previewCert(id);
        setTimeout(() => window.printCert(), 300);
    };


    function renderChat() {
        // Generate Groups List
        const groupsHTML = chatData.groups.map(group => `
            <div class="chat-list-item ${group.id === 1 ? 'active' : ''}">
                <div class="chat-avatar-container">
                    <img src="${group.avatar}" alt="${group.name}" class="chat-avatar">
                    ${group.type === 'direct' ? '<span class="status-indicator online"></span>' : ''}
                </div>
                <div class="chat-list-info">
                    <div class="chat-list-header">
                        <span class="chat-name">${group.name}</span>
                        ${group.unread > 0 ? `<span class="unread-badge">${group.unread}</span>` : ''}
                    </div>
                    <p class="chat-preview-text">
                        ${group.type === 'group'
                ? '<span class="sender-name">Alisher:</span> Yangi dars yuklandi...'
                : 'Onlayn'}
                    </p>
                </div>
            </div>
        `).join('');

        // Generate Messages
        const messagesHTML = chatData.messages.map(msg => `
            <div class="message-wrapper ${msg.isMe ? 'message-own' : 'message-other'}">
                ${!msg.isMe ? `
                    <div class="message-avatar">
                         <div class="avatar-placeholder" style="background-color: ${getColorForName(msg.sender)}">${getInitials(msg.sender)}</div>
                    </div>
                ` : ''}
                <div class="message-content-group">
                    ${!msg.isMe ? `<span class="message-sender-name">${msg.sender}</span>` : ''}
                    <div class="message-bubble">
                        ${msg.text}
                        <span class="message-time">${msg.time} <i class="ph ${msg.isMe ? 'ph-check-double' : ''}"></i></span>
                    </div>
                </div>
            </div>
        `).join('');

        contentArea.innerHTML = `
            <div class="chat-layout">
                <!-- Chat Sidebar -->
                <aside class="chat-sidebar-panel">
                    <div class="chat-sidebar-header">
                        <h2>Xabarlar</h2>
                        <button class="icon-btn-sm"><i class="ph ph-note-pencil"></i></button>
                    </div>
                    <div class="chat-search-container">
                        <i class="ph ph-magnifying-glass"></i>
                        <input type="text" placeholder="Qidirish...">
                    </div>
                    <div class="chat-groups-list">
                        ${groupsHTML}
                    </div>
                </aside>

                <!-- Chat Main Area -->
                <main class="chat-main-window">
                    <div class="chat-main-header">
                        <div class="chat-header-info">
                            <div class="avatar-group">
                                <img src="${chatData.groups[0].avatar}" class="header-avatar">
                            </div>
                            <div>
                                <h3>3D Max General</h3>
                                <p>125 ishtirokchi • 12 online</p>
                            </div>
                        </div>
                        <div class="chat-header-actions">
                            <button class="icon-btn"><i class="ph ph-phone"></i></button>
                            <button class="icon-btn"><i class="ph ph-video-camera"></i></button>
                            <button class="icon-btn"><i class="ph ph-dots-three-vertical"></i></button>
                        </div>
                    </div>

                    <div class="chat-messages-scroll" id="msg-area">
                        <div class="date-divider"><span>Bugun</span></div>
                        ${messagesHTML}
                    </div>

                    <div class="chat-input-area">
                        <button class="attach-btn"><i class="ph ph-plus"></i></button>
                        <div class="input-wrapper">
                            <input type="text" placeholder="Xabar yozing..." onkeypress="handleenter(event)">
                            <button class="emoji-btn"><i class="ph ph-smiley"></i></button>
                        </div>
                        <button class="send-btn" onclick="sendMessage()">
                            <i class="ph-fill ph-paper-plane-right"></i>
                        </button>
                    </div>
                </main>
            </div>
        `;

        scrollToBottom();
    }

    // Helper functions for chat
    function getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }

    function getColorForName(name) {
        const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    function scrollToBottom() {
        setTimeout(() => {
            const msgArea = document.getElementById('msg-area');
            if (msgArea) msgArea.scrollTop = msgArea.scrollHeight;
        }, 50);
    }

    window.handleenter = function (e) {
        if (e.key === 'Enter') sendMessage();
    }

    window.sendMessage = function () {
        const input = document.querySelector('.input-wrapper input');
        if (!input || !input.value.trim()) return;

        const msgArea = document.getElementById('msg-area');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newMsgHTML = `
            <div class="message-wrapper message-own">
                <div class="message-content-group">
                    <div class="message-bubble">
                        ${input.value}
                        <span class="message-time">${time} <i class="ph ph-check"></i></span>
                    </div>
                </div>
            </div>
        `;

        msgArea.insertAdjacentHTML('beforeend', newMsgHTML);
        input.value = '';
        msgArea.scrollTop = msgArea.scrollHeight;
    };

    function renderSettings() {
        const tabs = [
            { id: 'profile', label: 'Profil', icon: 'ph-user' },
            { id: 'security', label: 'Xavfsizlik', icon: 'ph-lock-key' },
            { id: 'notifications', label: 'Bildirishnomalar', icon: 'ph-bell' },
            { id: 'app', label: 'Ilova sozlamalari', icon: 'ph-sliders' }
        ];

        // Generate Sidebar items
        const sidebarHTML = tabs.map(tab => `
            <li class="settings-nav-item ${currentState.settingsTab === tab.id ? 'active' : ''}" 
                onclick="switchSettingsTab('${tab.id}')">
                <i class="ph ${tab.icon}"></i> ${tab.label}
            </li>
        `).join('');

        // Generate Content based on active tab
        let contentHTML = '';
        switch (currentState.settingsTab) {
            case 'profile':
                contentHTML = renderProfileSettings();
                break;
            case 'security':
                contentHTML = renderSecuritySettings();
                break;
            case 'notifications':
                contentHTML = renderNotificationSettings();
                break;
            case 'app':
                contentHTML = renderAppSettings();
                break;
            default:
                contentHTML = renderProfileSettings();
        }

        contentArea.innerHTML = `
            <h2 class="section-title">Sozlamalar</h2>
            <div class="settings-layout">
                <div class="card settings-sidebar">
                    <ul>
                        ${sidebarHTML}
                    </ul>
                </div>

                <div class="card settings-content">
                    ${contentHTML}
                </div>
            </div>
            <style>
                .settings-layout {
                    display: grid;
                    grid-template-columns: 260px 1fr;
                    gap: 1.5rem;
                }
                @media (max-width: 768px) {
                    .settings-layout { grid-template-columns: 1fr; }
                }
            </style>
        `;
    }

    function renderProfileSettings() {
        return `
            <h3 style="margin-bottom: 1.5rem;">Profilni tahrirlash</h3>
            <form onsubmit="event.preventDefault(); alert('Ma\\'lumotlar saqlandi!')">
                <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
                    <img src="${currentUser.avatar}" style="width: 80px; height: 80px; border-radius: 50%;">
                    <button class="btn-primary" style="font-size: 0.85rem;">Rasmni o'zgartirish</button>
                </div>
            
                <div class="form-group">
                    <label>Ism Familiya</label>
                    <input type="text" value="${currentUser.name}" class="form-input">
                </div>
                <div class="form-group">
                    <label>Email manzil</label>
                    <input type="email" value="olimjon@example.com" class="form-input">
                </div>
                <div class="form-group">
                    <label>Telefon raqam</label>
                    <input type="tel" value="+998 90 123 45 67" class="form-input">
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--color-border); display: flex; justify-content: flex-end;">
                        <button class="btn-primary">O'zgarishlarni saqlash</button>
                </div>
            </form>
        `;
    }

    function renderSecuritySettings() {
        return `
            <h3 style="margin-bottom: 1.5rem;">Xavfsizlik</h3>
            <form onsubmit="event.preventDefault(); alert('Parol o\\'zgartirildi!')">
                <div class="form-group">
                    <label>Joriy parol</label>
                    <input type="password" placeholder="********" class="form-input">
                </div>
                <div class="form-group">
                    <label>Yangi parol</label>
                    <input type="password" placeholder="Yangi parol" class="form-input">
                </div>
                <div class="form-group">
                    <label>Parolni tasdiqlang</label>
                    <input type="password" placeholder="Parolni tasdiqlang" class="form-input">
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--color-border); display: flex; justify-content: flex-end;">
                        <button class="btn-primary">Parolni yangilash</button>
                </div>
            </form>
        `;
    }

    function renderNotificationSettings() {
        return `
            <h3 style="margin-bottom: 1.5rem;">Bildirishnomalar</h3>
            <div class="settings-list">
                <div class="setting-item">
                    <div>
                        <h4>Yangi darslar</h4>
                        <p class="text-muted">Yangi darslar qo'shilganda xabar berish</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="setting-item">
                    <div>
                        <h4>Uyga vazifa natijalari</h4>
                        <p class="text-muted">O'qituvchi baholaganda xabar berish</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="setting-item">
                    <div>
                        <h4>Guruh yangiliklari</h4>
                        <p class="text-muted">Chatdagi yangi xabarlar</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        `;
    }

    function renderAppSettings() {
        return `
            <h3 style="margin-bottom: 1.5rem;">Ilova sozlamalari</h3>
            <div class="settings-list">
                <div class="setting-item">
                    <div>
                        <h4>Tungi rejim</h4>
                        <p class="text-muted">Interfeys rangini o'zgartirish</p>
                    </div>
                    <button class="btn-primary" onclick="toggleThemeManually()">
                        Rejimni o'zgartirish
                    </button>
                </div>
                <div class="setting-item">
                    <div>
                        <h4>Til</h4>
                        <p class="text-muted">Ilova tilini tanlang</p>
                    </div>
                    <select class="form-input" style="width: auto;">
                        <option value="uz">O'zbekcha</option>
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div class="setting-item">
                     <div style="color: #ef4444;">
                        <h4>Hisobni o'chirish</h4>
                        <p class="text-muted">Barcha ma'lumotlar o'chib ketadi</p>
                    </div>
                    <button class="btn-primary" style="background-color: #fee2e2; color: #ef4444; border: 1px solid #ef4444;">
                        O'chirish
                    </button>
                </div>
            </div>
        `;
    }

    // Manual Theme Toggle for Settings Page
    window.toggleThemeManually = function () {
        const themeBtn = document.querySelector('.theme-toggle');
        if (themeBtn) themeBtn.click();
    };

    // Theme Toggle Logic
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = themeBtn.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                icon.classList.replace('ph-moon', 'ph-sun');
            } else {
                icon.classList.replace('ph-sun', 'ph-moon');
            }
        });
    }


    // Header Dropdowns Logic
    const notifBtn = document.getElementById('notifications-btn');
    const notifMenu = document.getElementById('notifications-menu');
    const profileBtn = document.getElementById('profile-btn');
    const profileMenu = document.getElementById('profile-menu');

    function toggleDropdown(menu, btn) {
        // Close others
        document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menu) m.classList.remove('active');
        });
        menu.classList.toggle('active');
    }

    if (notifBtn && notifMenu) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(notifMenu, notifBtn);
        });
    }

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(profileMenu, profileBtn);
        });
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-actions')) {
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('active'));
        }
    });

    // ---- Search Functionality ----
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                // If on courses page, re-render normally
                if (currentState.currentPage === 'courses') renderCoursesList();
                return;
            }

            // Search across all courses and lessons
            const results = [];
            coursesData.forEach(course => {
                if (course.title.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query)) {
                    results.push({ type: 'course', course });
                }
                course.modules.forEach(mod => {
                    mod.lessons.forEach(lesson => {
                        if (lesson.title.toLowerCase().includes(query)) {
                            results.push({ type: 'lesson', course, lesson });
                        }
                    });
                });
            });

            if (currentState.currentPage !== 'courses' && currentState.currentPage !== 'search') {
                return; // Only search on courses page
            }
            currentState.currentPage = 'search';

            if (results.length === 0) {
                contentArea.innerHTML = `
                    <h2 class="section-title">Qidiruv natijalari: "${e.target.value}"</h2>
                    <div style="text-align:center; padding: 3rem; color: var(--color-text-muted);">
                        <i class="ph ph-magnifying-glass" style="font-size: 3rem; display:block; margin-bottom: 1rem;"></i>
                        <p>Hech narsa topilmadi. Boshqa so'z kiriting.</p>
                    </div>
                `;
                contentArea.style.opacity = '1';
                return;
            }

            const resultsHTML = results.map(r => {
                if (r.type === 'course') {
                    return `
                        <div class="card" onclick="openCourse(${r.course.id})" style="cursor:pointer; display:flex; align-items:center; gap:1rem; padding: 1rem;">
                            <i class="ph-fill ph-video" style="font-size:2rem; color:var(--color-primary); flex-shrink:0;"></i>
                            <div>
                                <strong>${r.course.title}</strong>
                                <p style="font-size:0.85rem; color:var(--color-text-muted);">${r.course.instructor} • Kurs</p>
                            </div>
                        </div>`;
                } else {
                    return `
                        <div class="card" onclick="playLesson(${r.course.id}, ${r.lesson.id})" style="cursor:pointer; display:flex; align-items:center; gap:1rem; padding: 1rem;">
                            <i class="ph-fill ph-play-circle" style="font-size:2rem; color:var(--color-primary); flex-shrink:0;"></i>
                            <div>
                                <strong>${r.lesson.title}</strong>
                                <p style="font-size:0.85rem; color:var(--color-text-muted);">${r.course.title} • Dars</p>
                            </div>
                        </div>`;
                }
            }).join('');

            contentArea.innerHTML = `
                <h2 class="section-title">Qidiruv natijalari: "${e.target.value}" (${results.length} ta)</h2>
                <div style="display:flex; flex-direction:column; gap:0.75rem;">
                    ${resultsHTML}
                </div>
            `;
            contentArea.style.opacity = '1';
        });

        // Clear search on focus out if empty
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                loadPage('courses');
            }
        });
    }

    // ---- "Read All" Notifications Button ----
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-all-btn') || e.target.closest('.read-all-btn')) {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            const badge = document.querySelector('#notifications-btn .badge');
            if (badge) badge.style.display = 'none';
            showToast('Barcha bildirishnomalar o\'qildi ✓');
        }
    });

});

