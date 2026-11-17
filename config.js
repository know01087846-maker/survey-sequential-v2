// 응답이 저장되는 Supabase 프로젝트 (왓슈와 같은 프로젝트를 사용).
// 다른 프로젝트에 저장하려면 이 두 값만 바꾸면 됩니다.
const SURVEY_DB_URL = 'https://izpchwapocujcxpeqdot.supabase.co';
const SURVEY_DB_KEY = 'sb_publishable_f-9Vx_Vdf7bmeF2LI5HsdA_caczwvz3';

async function surveyRpc(fn, params) {
  const res = await fetch(`${SURVEY_DB_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      'apikey': SURVEY_DB_KEY,
      'Authorization': `Bearer ${SURVEY_DB_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json()).message || ''; } catch (e) {}
    const err = new Error(detail || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// 문항 정의 — 설문 페이지와 결과 페이지가 함께 사용
const SCALE_SAT = ['매우 만족', '만족', '보통', '다소 불만족', '매우 불만족'];
const SCALE_SAT2 = ['매우 만족', '만족', '보통', '불만족', '매우 불만족'];
const SCALE_POS = ['매우 긍정', '긍정', '보통', '다소 부정', '매우 부정'];
const YES_NO = ['예', '아니오'];
const SUPPORT_ROWS = [
  ['a', '가', '생활지원'], ['b', '나', '건강지원'], ['c', '다', '학업지원'], ['d', '라', '자립지원'],
  ['e', '마', '상담지원'], ['f', '바', '법률지원'], ['g', '사', '활동지원'], ['h', '아', '기타지원'],
];
const GENDER = ['남', '여'];
const AGE = ['9~15세', '16세~19세', '20세~24세'];
const DIFFICULTY = [
  ['비행·일탈 예방 청소년', ['가출', '가정폭력', '범죄 피해', '우울, 자해 등 정신적 문제', '인터넷 중독']],
  ['학교 밖 청소년', ['학교폭력', '학업중단']],
  ['보호자의 실질적 보호를 받지 못하는 청소년', ['부모 부재', '보호자의 실질적 보호를 받지 못하는 경우']],
  ['고립·은둔 청소년', []],
];
const HOW_KNOWN = [
  '현재 상담 받고 있는 기관의 선생님 추천으로', '행정복지센터 등 공무원의 추천으로',
  '학교 선생님의 추천으로', '홍보(홍보물, 인터넷, SNS, 매체를 통한 홍보 포함)', '기타',
];
const SUPPORT_ITEMS = ['생활지원', '건강지원', '학업지원', '자립지원', '법률지원', '상담지원', '활동지원', '그 밖의 지원'];
const WRITTEN_AT = ['청소년상담복지센터', '학교밖청소년지원센터', '청소년쉼터', '학교', '행정복지센터', '기타'];
