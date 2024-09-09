# 집돌이즘
### 프로젝트명과 기획동기
------------
집돌이즘은 인테리어 견적문의 사이트 입니다.   
회원가입 없이 간단하게 견적문의를 할 수 있는 사이트를 만들고자 했습니다.   
유저가 문의사항을 등록하고, 관리자는 그에 따라 서비스를 제공하는 일반적인 형태의 홈페이지 입니다.   

### 사이트 기능
------------
본 프로젝트는 Next.js App router 기반으로 vercel를 통해 배포 되었습니다.   


**유저(고객)**
1. 인테리어 견적문의 : user form등록을 통해 견적 문의 접수.
2. 문의 접수시 등록한 고객 핸드폰 번호로 접수 완료 문자 전송. (현재 문자 service가 free 계정이어서 등록된 번호에만 전송됨)


**관리자**
1. 문의 접수시 등록된 관리자에게 email로 고객 상담 접수 결과 메일 알림.
2. 관리자 등록 및 로그인.
    - 로그인시 jose를 활용한 token방식의 로그인 설정.
    - 관리자 등록시 암호 bcrypt로 암호화하여 vercel postgre DB 저장, local에서는 mysql 사용.
3. 관리자 로그인 시 Dashboard에서 등록현황 확인가능.

 
**최고 관리자 또는 개발자**
1. 관리자 등록 요청에 대한 승인 및 거부를 위한 페이지.


**기타** 
1. 모바일 반응형 작업 (420px).
2. SEO: Google Search Console, 네이버 서치 어드바이저 등록.
3. SEO: 메타데이터 설정.
4. Google RECAPCHA 설정, bot방지.
5. not-found page.
6. Main slide visibilitychange 설정.
7. Image 최적화.


----------
### pacakage.json   
   
 "dependencies": {   
       "@emotion/react": "^11.13.0",   
       "@emotion/styled": "^11.13.0",   
       "@headlessui/react": "^2.1.2",   
       "@heroicons/react": "^2.1.5",   
       "@vercel/analytics": "^1.3.1",   
       "@vercel/postgres": "^0.9.0",   
       "@vercel/speed-insights": "^1.0.12",   
       "autoprefixer": "^10.4.20",   
       "bcrypt": "^5.1.1",   
       "jose": "^5.8.0",   
       "mysql2": "^3.11.0",   
       "next": "14.2.5",   
       "next-recaptcha-v3": "^1.4.1",   
       "nodemailer": "^6.9.14",   
       "postcss": "^8.4.41",   
       "react": "^18",   
       "react-dom": "^18",   
       "sharp": "^0.33.5",   
       "tailwindcss": "^3.4.7",   
       "twilio": "^5.2.3"   
  }

----------
### 도메인   

**공식**   
[집돌이즘](zipdorism.store)   

**관리자**  
  - [로그인](zipdorism.store/admin/login)   
  - [등록](zipdorism.store/adimin/signup)   
  - [대쉬보드](zipdorism.store/admin/dashboard)   

**개발자**   
[등록승인](zipdorism.store/developer)   
