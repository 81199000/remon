// 视频源切换函数
function updateVideoSource(lang) {
    const videoSource = document.getElementById('videoSource');
    const video = document.getElementById('productVideo');
    
    console.log('Updating video source for language:', lang);
    
    // 根据语言选择视频源
    if (lang === 'zh-CN' || lang === 'zh-TW') {
        videoSource.src = './TP/视频/M2介绍.mp4';
    } else {
        videoSource.src = './TP/视频/M2介绍-英文版.mp4';
    }
    
    // 重新加载视频
    video.load();
}

// 视频模态框相关功能
document.addEventListener('DOMContentLoaded', function() {
    const videoBtn = document.querySelector('.video-btn');
    const videoModal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-btn');
    const video = document.getElementById('productVideo');

    if (videoBtn) {
        videoBtn.addEventListener('click', function() {
            videoModal.style.display = 'block';
            // 开始播放视频并进入全屏
            video.play().then(() => {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) { /* Safari */
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) { /* IE11 */
                    video.msRequestFullscreen();
                }
            }).catch((error) => {
                console.log("播放失败:", error);
            });
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            videoModal.style.display = 'none';
            video.pause();
            // 退出全屏
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        });
    }

    // 点击模态框背景关闭
    window.addEventListener('click', function(event) {
        if (event.target == videoModal) {
            videoModal.style.display = 'none';
            video.pause();
            // 退出全屏
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
    });

    // 监听全屏变化事件
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    function exitHandler() {
        if (!document.fullscreenElement && 
            !document.webkitIsFullScreen && 
            !document.mozFullScreen && 
            !document.msFullscreenElement) {
            // 退出全屏时关闭视频和模态框
            videoModal.style.display = 'none';
            video.pause();
        }
    }
}); 