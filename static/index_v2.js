const weeks = ['日', '月' ,'火' ,'水' ,'木' ,'金' ,'土']
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
const config = {
  show: 3,
}

function showCalendar(year, month){
  for (i = 0; i < config.show; i++){
    let calendarHtml = createCalendar(year, month)
    let sec = document.createElement('section')
    sec.innerHTML = calendarHtml
    console.log(sec.innerHTML)
    document.querySelector('#calendar').appendChild(sec)
    month++;
    if (month > 12){
      year++;
      month = 1
    }
  }
}


function createCalendar(year, month){
  // 月の最初の日の情報
  const startDate = new Date(year, month - 1, 1)
  // 月の最後の日の情報
  const endDate = new Date(year, month, 0)
  // 月の末日
  const endDayCount = endDate.getDate()
  // 前月の最後の日の情報
  const lastMonthEndDate = new Date(year, month -1, 0)
  // 前月の末日
  const lastMonthendDayCount = lastMonthEndDate.getDate()
  // 月の最初の日の曜日を取得
  const startDay = startDate.getDay()
  // 日にちのカウント
  let dayCount = 1
  // HTMLを組み立てる変数
  let calendarHtml = ''

  calendarHtml += '<h1>' + year + '/' + month + '</h1>'
  calendarHtml += '<table>'

  // 曜日の行を作成
  for (let i = 0; i < weeks.length; i++){
    calendarHtml += '<td>' + weeks[i] + '</td>'
  }

  for (let w = 0; w < 6; w++){
    calendarHtml += '<tr>'

    for (let d = 0; d < 7; d++){
      if (w == 0 && d < startDay){
        // 1行目で1日の曜日の前
        let num = lastMonthendDayCount - startDay + d + 1
        calendarHtml += '<td class="is-disabled">' + num + '</td>'
      } else if (dayCount > endDayCount){
        // 末尾の日数を超えた
        let num = dayCount - endDayCount
        calendarHtml += '<td class="is-disabled">' + num + '</td>'
        dayCount++;
      } else{
        calendarHtml += '<td>' + dayCount + '</td>'
        dayCount++;
      }
    }
    calendarHtml += '</tr>'
  }
  calendarHtml += '</table>'
  
  return calendarHtml
}

showCalendar(year, month)
