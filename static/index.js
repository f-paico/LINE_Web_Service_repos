const weeks = ['Sunday','Monday' ,'Tuesday' ,'Wednesday' ,'Thursday' ,'Friday' ,'Saturday']
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
const config = {
    show: 3,
}

function showCalendar(year, month){
    for (i = 0; i < config.show; i++){
        const calendarHtml = createCalendar(year, month)
        const sec = document.createElement('section')
        sec.innerHTML = calendarHtml
        document.querySelector('#calendar').appendChild(sec)

        month++;
        if (month > 12){
            year++;
            month = 1
        }
    }
}


function createCalendar(year, month){
    // 月の最初の日を取得
    const startDate = new Date(year, month - 1, 1)
    // 月の最後の日を取得
    const endDate = new Date(year, month, 0)
    // 月の末日
    const endDayCount = endDate.getDate()
    // 前月の最後の日の情報
    const lastMonthEndDate = new Date(year, month - 1, 0)
    // 前月の末日
    const lastMonthendDayCount = lastMonthEndDate.getDate()
    // 月の最初の日の曜日を取得
    const startDay = startDate.getDay()
    // 日にちのカウント
    let dayCount = 1;
    let calendarHtml = ''

    calendarHtml += '<h1>' + year + '/' + month + '</h1>'
    calendarHtml += '<table>'

    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++){
        calendarHtml += '<td height="4%" width="100/7%">' + weeks[i] + '</td>'
    }

    for (let w = 0; w < 6; w++){
        calendarHtml += '<tr height="16%">'

        for (let d = 0; d < 7; d++){
            if (w == 0 && d < startDay){
                // 1行目で1日の曜日の前
                let num = lastMonthendDayCount - startDay + d + 1
                calendarHtml += `<td class="is-disabled" width="100/7%"><p style="height: 5%">${num}</td>`
            } else if (dayCount > endDayCount){
                // 末尾の日数を超えた
                let num = dayCount - endDayCount
                calendarHtml += `<td class="is-disabled" width="100/7%"><p style="height: 5%;">${num}</td>`
                dayCount++;
            } else{
                calendarHtml += `<td class="calendar_td" width="100/7%" data-date="${year}/${month}/${dayCount}"><p style="height: 5%;">${dayCount}</p><textarea name="memo" style="width: 95%; height: 70%; border: none;"></textarea></td>`
                dayCount++;
            }
        }
        calendarHtml += '</tr>'
    }
    calendarHtml += '</table>'

    return calendarHtml

}

// prevボタンを押したときの処理とnextボタンを押したときの処理が似ているため，関数をひとまとめにした
function moveCalendar(e){
    document.querySelector('#calendar').innerHTML = ''

    if (e.target.id === 'prev'){
        month--;

        if (month < 1){
            year--;
            month = 12
        }
        
    }
    if (e.target.id === 'next'){
        month++;

        if (month > 12){
            year++;
            month = 1
        }
    }

    showCalendar(year, month)
}

document.querySelector('#prev').addEventListener('click', moveCalendar)
document.querySelector('#next').addEventListener('click', moveCalendar)
document.querySelector('#calendar').addEventListener('click', function(e){
    if (e.target.classList.contains("calendar_td")){
        alert('クリックした日付は' + e.target.dataset.date + 'です')
    }
})


showCalendar(year, month)


















