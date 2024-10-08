import Input from "@blog/ui/components/commons/Input";
import Button from "@blog/ui/components/commons/Button";
import TitleSection from "@blog/ui/components/commons/TitleSection";
import React, { ChangeEvent, FormEvent, useState } from "react";
import QRCode from "react-qr-code";
import downloadQr from "@blog/utils/downloadQr";

export default function QrSection() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [qrText, setQrText] = useState("https://blog.hansolbangul.com");

  const onChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    if (target.name === "qrCode") {
      setIsDisabled(target.value.length === 0);
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const jsonData = Object.fromEntries(form.entries()) as {
      qrCode: string;
    };

    setQrText(jsonData.qrCode);
  };

  return (
    <TitleSection
      title={"QR 생성하기"}
      description={
        "react-qr-code 라이브러리를 사용해서 구현하였습니다.\n텍스트를 입력하면 QR코드를 생성합니다."
      }
    >
      <form
        className={"flex w-full gap-4 mb-4"}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      >
        <Input
          name={"qrCode"}
          className={"w-full"}
          placeholder={"QR코드로 변환한 테스트를 입력해주세요."}
          defaultValue={qrText}
        />
        <Button.Primary disabled={isDisabled} type={"submit"}>
          생성하기
        </Button.Primary>
      </form>
      <div className={"w-full flex flex-col items-center relative gap-4"}>
        <QRCode id={"qrcode"} value={qrText} />
        <Button.Primary
          disabled={isDisabled}
          className={"custom:absolute custom:right-0 custom:top-0"}
          onClick={downloadQr}
          type={"button"}
        >
          QR 이미지 다운로드
        </Button.Primary>
      </div>
    </TitleSection>
  );
}
