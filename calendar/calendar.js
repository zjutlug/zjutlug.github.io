function initCalendar() {
  var calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  // 防止重复渲染
  if (calendarEl.innerHTML !== '') return;

  if (typeof FullCalendar === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js';
    script.onload = function() {
      renderCalendar(calendarEl);
    };
    document.head.appendChild(script);
  } else {
    renderCalendar(calendarEl);
  }
}

function renderCalendar(calendarEl) {
  var isMobile = window.innerWidth < 768;
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: isMobile ? 'listMonth' : 'dayGridMonth',
    locale: 'zh-cn',
    contentHeight: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: isMobile ? 'listMonth,dayGridMonth' : 'dayGridMonth,listMonth'
    },
    buttonText: {
      today: '今天',
      month: '月视图',
      list: '列表'
    },
    events: '/calendar/events.json',
    eventClick: function(info) {
      if (info.event.url) {
        info.jsEvent.preventDefault();
        if (window.pjax) {
            window.pjax.loadUrl(info.event.url);
        } else {
            window.location.href = info.event.url;
        }
      }
    }
  });
  calendar.render();
}

document.addEventListener('DOMContentLoaded', initCalendar);
document.addEventListener('pjax:complete', initCalendar);

// 立即尝试初始化，适配 PJAX 加载脚本的情况
initCalendar();
