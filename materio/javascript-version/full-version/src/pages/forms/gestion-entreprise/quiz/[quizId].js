import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Quiz = () => {
  const router = useRouter();
  const { quizId } = router.query;

  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);

  const [selections, setSelections] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [sectionScores, setSectionScores] = useState([]);
  const [sideImage, setSideImage] = useState('side-img.png');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsResponse = await fetch(`http://localhost:5000/api/v1/sections?quizId=${quizId}`);
        const sectionsData = await sectionsResponse.json();

        const sectionsWithQuestions = await Promise.all(
          sectionsData.sections.map(async section => {
            const questionsResponse = await fetch(`http://localhost:5000/api/v1/questions?sectionId=${section.id}`);
            const questionsData = await questionsResponse.json();

            const questionsWithSuggestions = await Promise.all(
              questionsData.questions.map(async question => {
                const suggestionsResponse = await fetch(
                  `http://localhost:5000/api/v1/suggestions?questionId=${question.id}`
                );
                const suggestionsData = await suggestionsResponse.json();

                return { ...question, suggestions: suggestionsData };
              })
            );

            return { ...section, questions: questionsWithSuggestions };
          })
        );

        setSections(sectionsWithQuestions);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    if (quizId) {
      fetchData();
    }
  }, [quizId]);

  if (!sections.length) {
    return <div>Loading...</div>;
  }

  const handlePreviousSection = () => {
    setCurrentSection(prevSection => prevSection - 1);
  };

  const handleNextSection = () => {
    const selectedSuggestions = Array.from(document.querySelectorAll('input[name^="op"]:checked')).map(
      element => element.value
    );
    setSelections([...selections, ...selectedSuggestions]);

    const sectionResult = calculateSectionScore(selectedSuggestions, currentSection);
    setSectionScores([...sectionScores, sectionResult]);

    if (currentSection === sections.length - 1) {
      setSubmitted(true);
    } else {
      setCurrentSection(prevSection => prevSection + 1);
      
      if (currentSection === 0) {
        setSideImage('side-img2.png');
      } else if (currentSection === 1) {
        setSideImage('side-img3.png');
      }
    }
  };

  const calculateSectionScore = (selectedSuggestions, currentSection) => {
    let sectionScore = 0;
    let sectionTitle = '';

    const section = sections[currentSection];
    if (section && section.questions) {
      section.questions.forEach(question => {
        question.suggestions.suggestions.forEach(suggestion => {
          if (suggestion.note && selectedSuggestions.includes(suggestion.content)) {
            sectionScore += suggestion.note;
          }
        });
      });
    }

    if (section) {
      sectionTitle = section.title;
    }

    return { score: sectionScore, title: sectionTitle };
  };

  const calculateTotalScore = () => {
    let totalScore = 0;
    sectionScores.forEach(sectionResult => {
      totalScore += sectionResult.score;
    });

    return totalScore;
  };
  const totalScore = calculateTotalScore();

  return (
    <>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>Questionnaire Blue Sky</title>
      {/* Import CSS files here */}

      {/* Font awesome 6 */}
      <link rel='stylesheet' type='text/css' href='https://use.fontawesome.com/releases/v6.1.1/css/all.css' />
      {/* custom styles */}

      <main className='overflow-hidden'>
        <div className='row h-100'>
          {/* side area */}
          <div className='slideup side col-md-5 order-c'>
            <div className='side-inner'>
              <img src={`/images/quiz/${sideImage}`} alt='side image' />
            </div>
          </div>
          <div className='slidedown col-md-7 h-100'>
            <div className='wrapper'>
              <div className='contact'>
                <i className='fa-solid fa-phone' />
                <article>
                  <h5>Besoin d'aide ?</h5>
                  <span>Appelez un expert : +1 514-788-1458 </span>{' '}
                </article>
              </div>
              {!submitted ? (
                <form id='steps' method='post' className='show-section h-100' noValidate=''>
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} style={{ display: sectionIndex === currentSection ? 'block' : 'none' }}>
                      <div className='secTitle'>{section.title}</div>
                      <div className='step-count'>
                        <h4>
                          {' '}
                          Question {sectionIndex + 1} / {sections.length}{' '}
                        </h4>
                      </div>

                      <fieldset className='form' id={`step${sectionIndex + 1}`}>
                        {section.questions.map((question, questionIndex) => (
                          <div key={questionIndex}>
                            <div className='quest'>{question.texte}</div>
                            <div className='line-break'></div>
                            <div className='row justify-content-space-between'>
                              {question.suggestions &&
                                question.suggestions.suggestions.length > 0 &&
                                question.suggestions.suggestions.map((suggestion, suggestionIndex) => (
                                  <div className='col-md-10 tab-5' key={suggestionIndex}>

                                    <div className={`form-${question.type === 'single_choice' ? 'radio' : 'checkbox'} suggestions-container`}>

                                      {question.type === 'single_choice' ? (

                                        <input
                                          type='radio'
                                          name={`op${sectionIndex + 1}`}
                                          value={suggestion.content}
                                          onChange={e => {
                                            setSelections([...selections, e.target.value])
                                          }}
                                        />

                                      ) : (
                                        <input
                                          type='checkbox'
                                          name={`op${sectionIndex + 1}`}
                                          value={suggestion.content}
                                          onChange={e => {
                                            if (e.target.checked) {
                                              setSelections([...selections, e.target.value])
                                            } else {
                                              setSelections(selections.filter(value => value !== e.target.value))
                                            }
                                          }}
                                        />
                                      )}
                                      <label>{suggestion.content}</label>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </fieldset>

                      <div className='next-prev-button'>
                        <button type='button' className='prev' onClick={handlePreviousSection}>
                          Question précédente
                        </button>
                        <button
                          type='button'
                          className='next'
                          onClick={handleNextSection}
                          id={`step${sectionIndex + 1}btn`}
                        >
                          {sectionIndex === sections.length - 1 ? 'Soumettre' : 'Question suivante'}
                        </button>
                      </div>
                    </div>
                  ))}
                </form>
              ) : (
                <div className='result-container'>
                  <div>
                    Your scores:
                    {sectionScores.map((sectionResult, index) => (
                      <div key={index}>
                        {sectionResult.title}: {sectionResult.score}
                      </div>
                    ))}
                    Total score: {totalScore}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className='bg-partical-2'>
        <img src='/images/quiz/partical_2.png' alt='Partical' />
      </div>
    </>
  );
};

export default Quiz;
