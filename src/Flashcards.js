// src/OrderNowPage.js
import React, { useState } from "react";
import "./Flashcards.css"; // Importing the CSS file for this page

export default function Flashcards() {
  return (
    <div className="All">
      <Header />
      <FlashCards />
    </div>
  );
}

function Header() {
  return <h1>Flash Cards</h1>;
}

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);
  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
  }
  return (
    <div className="flashcards">
      {questions.map((question) => (
        <div
          key={question.id}
          onClick={() => handleClick(question.id)}
          className={question.id === selectedId ? "selected" : ""}
        >
          <p>
            {question.id === selectedId ? question.answer : question.question}
          </p>
        </div>
      ))}
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "ما هي عاصمة التشيك ؟",
    answer: "براج",
  },
  {
    id: 7336,
    question: "متى تحررت الجزائر من الاستعمار الفرنسي ؟",
    answer: "مارس 1962",
  },
  {
    id: 8832,
    question: "كيف تصنع الشوكولاتة من الكاكاو ؟",
    answer: `تستخرج حبوب الكاكاو من شجرة الكاكاو ثم تطحن كحبوب القهوة لمدة طويلة
            حتى تتحول لبودرة ناعمة ثم تتحول لعجين قوامه سائل بعض الشيء
            ويمكن اضافة الحليب او البندق حسب الرغبة ثم توضع في قوالب`,
  },
  {
    id: 1297,
    question: "ما هي شهور زراعة النعناع؟",
    answer: "Props",
  },
  {
    id: 9103,
    question: "عاصمتين متتالتين للبرازيل؟",
    answer: "ريو دي چينيرو - برازيليا",
  },
  {
    id: 2002,
    question: "ما هو السحلب؟",
    answer:
      "إن السحلب هو مشروب يتم تحضيره عادةً في الشرق الأوسط والبلدان العربية وغالبًا ما يتم إضافة ماء الزهر إليه، حيث يشتهر هذا المشروب في فصل الشتاء.",
  },
  {
    id: 9104,
    question: "منين بيجي الشجن؟",
    answer: "من اختلاف الزمن",
  },
  {
    id: 9105,
    question: "منين بيجي الهوى؟",
    answer: "من ائتلاف النوى",
  },
  {
    id: 9106,
    question: "منين بيجي السواد؟",
    answer: "من الطمع والعناد",
  },
  {
    id: 9107,
    question: "منين بيجي الرضا؟",
    answer: "من الإيمان بالقضا",
  },
  {
    id: 9108,
    question: "لفين ياخدنا الحنين؟",
    answer: "لواحة الحيرانين",
  },
  {
    id: 9109,
    question: "لفين ياخدنا الأنين",
    answer: "لليالي مالهاش عينين",
  },
];
