// i18next 初始化
i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'zh-CN',
        supportedLngs: ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'ru', 'hi', 'ar'],
        load: 'currentOnly',
        debug: true,
        ns: ['translation'],
        defaultNS: 'translation',
        backend: {
            loadPath: './translations/{{lng}}.json',
            allowMultiLoading: false,
            crossDomain: false,
            withCredentials: false,
            requestOptions: {
                cache: 'default'
            }
        },
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupQuerystring: 'lng',
            lookupLocalStorage: 'i18nextLng'
        }
    }).then(function() {
        // 初始化 jquery-i18next
        jqueryI18next.init(i18next, $, {
            useOptionsAttr: true
        });
        
        // 添加调试日志
        console.log('Current language:', i18next.language);
        console.log('Loaded resources:', i18next.store.data);
        
        // 更新所有翻译元素，包括铰链分类
        $('[data-i18n]').localize();
        
        // 更新UI和视频源
        updateLanguageUI();
        updateVideoSource(i18next.language || 'zh-CN');
    });

// 更新UI函数
function updateLanguageUI() {
    const currentLang = i18next.language;
    console.log('Updating UI for language:', currentLang);
    
    // 强制重新加载翻译
    i18next.reloadResources(currentLang).then(() => {
        // 更新所有翻译元素，包括铰链分类
        $('[data-i18n]').localize();
        
        // 更新选中状态
        $('.language-option .fa-check').addClass('opacity-0');
        $(`.language-option[data-lang="${currentLang}"] .fa-check`).removeClass('opacity-0');
        
        // 更新移动端选择框
        $('#mobileLangSelect').val(currentLang);
        
        // 更新文档方向（针对阿拉伯语）
        if (currentLang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }

        // 更新 HTML lang 属性
        document.documentElement.setAttribute('lang', currentLang);
        
        console.log('UI update completed for language:', currentLang);
    });
}

// 语言切换事件处理
$(document).on('click', '.language-option', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const lang = $(this).data('lang');
    console.log('Language option clicked:', lang);
    
    if (lang) {
        // 如果是切换到简体中文，直接使用内置资源
        if (lang === 'zh-CN') {
            i18next.changeLanguage(lang).then(function() {
                console.log('Changed to default Chinese language');
                updateLanguageUI();
                $('.language-dropdown-content').removeClass('show');
                localStorage.setItem('i18nextLng', lang);
            });
        } else {
            // 其他语言需要加载语言文件
            localStorage.removeItem('i18nextLng');
            i18next.removeResourceBundle(i18next.language);
            
            i18next.changeLanguage(lang).then(function() {
                console.log('Language successfully changed to:', lang);
                updateLanguageUI();
                $('.language-dropdown-content').removeClass('show');
                localStorage.setItem('i18nextLng', lang);
            }).catch(function(err) {
                console.error('Error changing language:', err);
            });
        }
    }
});

// 移动端语言切换
$('#mobileLangSelect').on('change', function() {
    const lang = $(this).val();
    console.log('Mobile language select changed:', lang);
    
    if (lang) {
        // 先清除缓存
        localStorage.removeItem('i18nextLng');
        i18next.removeResourceBundle(i18next.language);
        
        // 然后切换语言
        i18next.changeLanguage(lang).then(function() {
            console.log('Mobile language successfully changed to:', lang);
            updateLanguageUI();
            // 保存语言选择到 localStorage
            localStorage.setItem('i18nextLng', lang);
        }).catch(function(err) {
            console.error('Error changing mobile language:', err);
        });
    }
}); 