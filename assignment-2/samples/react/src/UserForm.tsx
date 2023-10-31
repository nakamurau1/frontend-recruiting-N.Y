import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./UserForm.css";
import styled from "styled-components";

const Form = styled.form`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 14px;
`;

const Section = styled.div`
  width: 400px;
  display: flex;
  margin-bottom: 14px;
  align-items: center;
`;

const Label = styled.label`
  flex: 1;
  text-align: right;
  font-size: 12px;
  font-weight: 700;
`;

const InputWrapper = styled.div`
  padding-left: 8px;
  width: 250px;
  text-align: left;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
`;

const InputZip = styled.input`
  width: 101px;
`;

const Button = styled.button`
  background-color: #5dd669;
  border: none;
  width: 100px;
  height: 40px;
  color: white;
  border-radius: 10px;
  margin-top: 24px;
`;

const ErrorText = styled.div`
  color: #fb0000;
  font-size: 10px;
  font-weight: 400;
  font-family: "inter";
  margin-top: 2px;
`;

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

const validationSchema = Yup.object({
  name: Yup.string().required("氏名は必須です"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "無効なメールアドレスです"
    )
    .required("Eメールは必須です"),
  zip: Yup.string()
    .matches(/^\d{7}$/, "ハイフンを含めず半角数字で入力してください")
    .required("郵便番号は必須です"),
  prefecture: Yup.string().required("都道府県は必須です"),
  address1: Yup.string().required("市区町村・番地は必須です"),
  address2: Yup.string(),
});

const UserForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      zip: "",
      prefecture: "",
      address1: "",
      address2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post("https://httpstat.us/201", values).then((response) => {
        if (response.status === 201) {
          console.log("送信成功");
        } else {
          console.log("送信失敗");
        }
        console.log(response);
      });
    },
    validateOnBlur: false,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* 氏名 */}
      <Section>
        <Label>氏名</Label>
        <InputWrapper>
          <Input
            type="text"
            placeholder="(例)トレタ 太郎"
            {...formik.getFieldProps("name")}
            className={
              formik.touched.name && formik.errors.name ? "error-input" : ""
            }
          />
          {formik.touched.name && formik.errors.name ? (
            <ErrorText>{formik.errors.name}</ErrorText>
          ) : null}
        </InputWrapper>
      </Section>

      {/* Eメール */}
      <Section>
        <Label>Eメール</Label>
        <InputWrapper>
          <Input
            type="email"
            placeholder="(例)yoyaku@toreta.in"
            {...formik.getFieldProps("email")}
            className={
              formik.touched.email && formik.errors.email ? "error-input" : ""
            }
          />
          {formik.touched.email && formik.errors.email ? (
            <ErrorText>{formik.errors.email}</ErrorText>
          ) : null}
        </InputWrapper>
      </Section>

      {/* 郵便番号 */}
      <Section>
        <Label>郵便番号</Label>
        <InputWrapper>
          <InputZip
            type="text"
            placeholder="(例)00000000"
            {...formik.getFieldProps("zip")}
            className={
              formik.touched.zip && formik.errors.zip ? "error-input" : ""
            }
          />
          {formik.touched.zip && formik.errors.zip ? (
            <ErrorText>{formik.errors.zip}</ErrorText>
          ) : null}
        </InputWrapper>
      </Section>

      {/* 都道府県 */}
      <Section>
        <Label>都道府県</Label>
        <InputWrapper>
          <Select
            {...formik.getFieldProps("prefecture")}
            className={
              formik.touched.prefecture && formik.errors.prefecture
                ? "error-input"
                : ""
            }
          >
            <option value="" label="選択してください" />
            {prefectures.map((pref, index) => (
              <option value={pref} key={index}>
                {pref}
              </option>
            ))}
          </Select>
          {formik.touched.prefecture && formik.errors.prefecture ? (
            <ErrorText>{formik.errors.prefecture}</ErrorText>
          ) : null}
        </InputWrapper>
      </Section>

      {/* 市区町村・番地 */}
      <Section>
        <Label>市区町村・番地</Label>
        <InputWrapper>
          <Input
            type="text"
            placeholder="(例)品川区西五反田７丁目２２−１７"
            {...formik.getFieldProps("address1")}
            className={
              formik.touched.address1 && formik.errors.address1
                ? "error-input"
                : ""
            }
          />
          {formik.touched.address1 && formik.errors.address1 ? (
            <ErrorText>{formik.errors.address1}</ErrorText>
          ) : null}
        </InputWrapper>
      </Section>

      {/* マンション名等 */}
      <Section>
        <Label>マンション名等</Label>
        <InputWrapper>
          <Input
            type="text"
            placeholder="(例)TOCビル 8F"
            {...formik.getFieldProps("address2")}
            className={
              formik.touched.address2 && formik.errors.address2
                ? "error-input"
                : ""
            }
          />
          {formik.touched.address2 && formik.errors.address2 ? (
            <ErrorText>{formik.errors.address2}</ErrorText>
          ) : null}
        </InputWrapper>
      </Section>

      <Button type="submit">登録</Button>
    </Form>
  );
};

export default UserForm;
