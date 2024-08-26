
export function convertUtcTimeToKoreanTime(time:string) {
    // UTC 시간 문자열
    const utcDateStr = time;

    // UTC 시간 문자열을 Date 객체로 변환
    const utcDate = new Date(utcDateStr);

    // 한국 시간(UTC+9)으로 변환
    const koreanTimeOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    // 한국 시간으로 포맷팅
    const koreanTime = new Intl.DateTimeFormat('ko-KR', koreanTimeOptions).format(utcDate);
    return koreanTime;
}

