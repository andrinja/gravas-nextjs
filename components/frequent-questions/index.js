import React, { useState } from "react";
import tabData from "../../static/data/contacts/faq";
import { TabList, TabButton, TabItem, TabContent, FaqItem, Question } from "./style";
import { useTranslation } from 'next-i18next/pages';
import { TR_NS } from '../../constants/translationNamespace';

// The tab strip used to be MUI v4's <Tabs>/<Tab>, which pulled in the whole
// of @material-ui/core plus its own ThemeProvider for one row of buttons.
// It is now a plain ARIA tablist styled with Emotion.
const FAQ = () => {
	const {t} = useTranslation(TR_NS.FREQUENT_QUESTIONS);
	const [activeTab, setActiveTab] = useState(0);
	const [activeQuestion, setActiveQuestion] = useState();

  const onTabKeyDown = event => {
    const last = tabData.length - 1;
    let next = null;
    if (event.key === 'ArrowRight') next = activeTab === last ? 0 : activeTab + 1;
    if (event.key === 'ArrowLeft') next = activeTab === 0 ? last : activeTab - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    setActiveTab(next);
    event.currentTarget.parentElement.children[next]?.focus();
  };

  return (
    <React.Fragment>
      <TabList role="tablist">
        {tabData.map((item, index) => (
          <TabButton
            key={item.title}
            type="button"
            role="tab"
            id={`faq-tab-${index}`}
            aria-selected={activeTab === index}
            aria-controls={`faq-panel-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
            onKeyDown={onTabKeyDown}
          >
            {t(item.title)}
          </TabButton>
        ))}
      </TabList>

      <TabContent>
        {tabData.map((item, index) => (
          <TabItem
            key={index}
            role="tabpanel"
            id={`faq-panel-${index}`}
            aria-labelledby={`faq-tab-${index}`}
            active={activeTab === index}
          >
            {item.questions.map(({ label, answer }, qIndex) => (
              <FaqItem key={label}>
                <Question active={answer === activeQuestion}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setActiveQuestion(answer)}
                      aria-expanded={answer === activeQuestion}
                      aria-controls={`faq-answer-${index}-${qIndex}`}
                      id={`faq-question-${index}-${qIndex}`}
                      style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', width: '100%', textAlign: 'left', minHeight: 44 }}
                    >
                      {t(label)}
                    </button>
                  </h3>
                  <p className="answer" id={`faq-answer-${index}-${qIndex}`} role="region" aria-labelledby={`faq-question-${index}-${qIndex}`}>
                    {t(answer)}
                  </p>
                </Question>
              </FaqItem>
            ))}
          </TabItem>
        ))}
      </TabContent>
    </React.Fragment>
  );
};

export default FAQ;
