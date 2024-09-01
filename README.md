### Notion Blog - 모노레포 프로젝트

이 리포지토리는 `Turborepo`와 `pnpm`을 사용하여 두 개의 블로그 플랫폼을 관리하고 배포하는 모노레포 구조를 가지고 있습니다:

1. **한솔방울의 기술 블로그**: [hansolbangul.com](https://hansolbangul.com)
2. **우당탕탕 도서관 블로그**: [blog.uddangtangtang.com](https://blog.uddangtangtang.com)

## 개요

이 프로젝트는 두 블로그가 Notion API를 사용하여 유사한 컴포넌트와 유틸리티를 공유함으로써 모노레포로 구성되었습니다. 이를 통해 유지보수와 개발 효율성을 높였습니다.

### 주요 기능

- **모노레포 아키텍처**: 여러 프로젝트를 한 리포지토리에서 관리, 의존성과 빌드를 간소화.
- **패키지 관리**: `pnpm`을 사용하여 빠르고 효율적인 설치와 엄격한 패키지 관리를 구현.
- **Next.js 통합**: SSR(서버 사이드 렌더링)과 SSG(정적 사이트 생성)을 활용하여 두 블로그를 구동.
- **Notion API**: 두 블로그의 콘텐츠 관리를 위한 커스텀 훅과 컴포넌트를 중앙에서 관리.
- **Tailwind CSS**: 일관된 스타일링을 위해 사용, 반응형 UI 컴포넌트를 제공.

## 프로젝트 구조

- **/apps**
    - `blog`: 기술 블로그 프로젝트.
    - `library`: 우당탕탕 도서관 블로그 프로젝트. `(공사중)`
- **/packages**
    - `notions`: Notion API 상호작용을 위한 공유 컴포넌트와 훅.
    - `ui`: 재사용 가능한 UI 컴포넌트. `(공사중)`
    - `utils`: 두 블로그 간에 공유되는 유틸리티 함수. `(공사중)`

## 설치 및 사용법

1. **리포지토리 클론**:
   ```bash
   git clone https://github.com/hansolbangul/notion-blog.git
   cd notion-blog
   ```

2. **의존성 설치**:
   ```bash
   pnpm install
   ```

3. **개발 서버 실행**:
   ```bash
   pnpm dev
   ```
   이 명령어는 두 블로그 플랫폼을 개발 모드로 실행합니다.

## 배포

이 프로젝트는 Vercel에 배포하도록 구성되어 있습니다. 각각의 블로그(`apps/blog` 및 `apps/library`)는 개별적으로 Vercel 프로젝트에서 배포 설정이 가능합니다.
