export function formatPhoneNumberToInternational(phoneNumber: string) {
  // 한국 전화번호 형식인지 확인
  const localPhonePattern = /^010(\d{8})$/;

  // 매칭된 경우, 국제 형식으로 변환
  if (localPhonePattern.test(phoneNumber)) {
    return phoneNumber.replace(localPhonePattern, '+8210$1');
  }

  // 매칭되지 않는 경우 원본 반환
  return phoneNumber;
}