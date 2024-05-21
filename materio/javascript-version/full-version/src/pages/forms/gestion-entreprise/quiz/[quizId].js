import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const Quiz = () => {
  const router = useRouter()
  const { quizId } = router.query

  const [sections, setSections] = useState([])
  const [currentSection, setCurrentSection] = useState(0)

  const [selections, setSelections] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [sectionScores, setSectionScores] = useState([])
  const [sideImage, setSideImage] = useState('side-img.png')
  const [chatGptResponse, setChatGptResponse] = useState('')
  const [selectedSuggestionIds, setSelectedSuggestionIds] = useState([])
  const [showScorePage, setShowScorePage] = useState(false)
  const [strengths, setStrengths] = useState([])
  const [blindSpots, setBlindSpots] = useState([])
  const [chatGptResponse1, setChatGptResponse1] = useState('')
  const [chatGptResponse2, setChatGptResponse2] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch('http://localhost:5000/api/v1/getQuizId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ quizId })
        })
          .then(() => {
            console.log('Quiz ID submitted successfully')
          })
          .catch(error => {
            console.error('Error submitting quiz ID:', error)
          })

        const sectionsResponse = await fetch(`http://localhost:5000/api/v1/sections?quizId=${quizId}`)
        const sectionsData = await sectionsResponse.json()

        const sectionsWithQuestions = await Promise.all(
          sectionsData.sections.map(async section => {
            const questionsResponse = await fetch(`http://localhost:5000/api/v1/questions?sectionId=${section.id}`)
            const questionsData = await questionsResponse.json()

            const questionsWithSuggestions = await Promise.all(
              questionsData.questions.map(async question => {
                const suggestionsResponse = await fetch(
                  `http://localhost:5000/api/v1/suggestions?questionId=${question.id}`
                )
                const suggestionsData = await suggestionsResponse.json()

                return { ...question, suggestions: suggestionsData }
              })
            )

            return { ...section, questions: questionsWithSuggestions }
          })
        )

        setSections(sectionsWithQuestions)
      } catch (error) {
        console.error('Error fetching quiz data:', error)
      }
    }

    if (quizId) {
      fetchData()
    }
  }, [quizId])

  useEffect(() => {
    const sendResponses = async () => {
      const suggestionIds = selections.map(selection => selection.suggestionId)

      try {
        const response1 = await fetch('http://localhost:5000/api/v1/soumettreEtTraiterQuiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quizId: quizId,
            selectedSuggestionIds: suggestionIds,
            message:
              'Tu vas jouer le rôle de notre expert en finance et marketing Je vais t envoyer un questionnaire ainsi que les réponses des clients.je souhaite que tu me fournisses séparément, pour chaque section  les points forts de lentreprise. donner moi la reponse en quelque petit phrase n afficher pas les id des questions afficher la reponse directement sans introduction et sans des hashtag et citer les section sous forme de tiret chaque section la mettre dans une nouvelle ligne  '
          })
        })

        if (!response1.ok) {
          throw new Error('Error submitting quiz responses')
        }

        const result1 = await response1.json()
        setChatGptResponse1(result1.response)
      console.log(sectionScores)

        const response2 = await fetch('http://localhost:5000/api/v1/soumettreEtTraiterQuiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quizId: quizId,
            selectedSuggestionIds: suggestionIds,
            message:
              'Tu vas jouer le rôle de notre expert en finance et marketing Je vais t envoyer un questionnaire ainsi que les réponses des clients.je souhaite que tu me fournisses séparément, pour chaque section les angles  morts de lentreprise. donner moi la reponse en quelque petit phrase n afficher pas les id des questions afficher la reponse directement sans introduction et sans des hashtag et citer les les section sous forme de tiret chaque section la mettre dans une ligne separé  '
          })
        })

        if (!response2.ok) {
          throw new Error('Error submitting quiz responses')
        }

        const result2 = await response2.json()
        setChatGptResponse2(result2.response)
      } catch (error) {
        console.error("Erreur lors de l'envoi des réponses:", error)
      }
    }

    if (submitted) {
      sendResponses()
    }
  }, [submitted, selections, quizId])
  if (!sections.length) {
    return <div>Loading...</div>
  }

  const handlePreviousSection = () => {
    setCurrentSection(prevSection => prevSection - 1)
  }

  const handleNextSection = () => {
    const selectedSuggestions = Array.from(document.querySelectorAll('input[name^="op"]:checked')).map(
      element => element.value
    )
    setSelections([...selections, ...selectedSuggestions])

    const sectionResult = calculateSectionScore(selectedSuggestions, currentSection)
    setSectionScores([...sectionScores, sectionResult])

    if (currentSection === sections.length - 1) {
      setSubmitted(true)
    } else {
      setCurrentSection(prevSection => prevSection + 1)

      if (currentSection === 0) {
        setSideImage('side-img2.png')
      } else if (currentSection === 1) {
        setSideImage('side-img3.png')
      }
    }
  }

  const calculateSectionScore = (selectedSuggestions, currentSection) => {
    let sectionScore = 0
    let sectionTitle = ''

    const section = sections[currentSection]
    if (section && section.questions) {
      section.questions.forEach(question => {
        question.suggestions.suggestions.forEach(suggestion => {
          if (suggestion.note && selectedSuggestions.includes(suggestion.content)) {
            sectionScore += suggestion.note
          }
        })
      })
    }

    if (section) {
      sectionTitle = section.title
    }

    return { score: sectionScore, title: sectionTitle }
  }

  const calculateTotalScore = () => {
    let totalScore = 0
    sectionScores.forEach(sectionResult => {
      totalScore += sectionResult.score
    })

    return totalScore
  }
  const totalScore = calculateTotalScore()

  const handleScorePage = () => {
    setShowScorePage(true)
  }

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
              {!submitted ? (
                <i className='fa-solid fa-phone' />
              ):null}
                {!submitted ? (
                <article>
                  <h5>Besoin d'aide ?</h5>
                  <span>Appelez un expert : +1 514-788-1458 </span>{' '}
                </article> ) :null }
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
                                    <div
                                      className={`form-${
                                        question.type === 'single_choice' ? 'radio' : 'checkbox'
                                      } suggestions-container`}
                                    >
                                      {question.type === 'single_choice' ? (
                                        <input
                                          type='radio'
                                          name={`op${sectionIndex + 1}`}
                                          value={suggestion.content}
                                          onChange={e => {
                                            setSelections([
                                              ...selections,
                                              { value: e.target.value, suggestionId: suggestion.id }
                                            ])
                                          }}
                                        />
                                      ) : (
                                        <input
                                          type='checkbox'
                                          name={`op${sectionIndex + 1}`}
                                          value={suggestion.content}
                                          onChange={e => {
                                            if (e.target.checked) {
                                              setSelections([
                                                ...selections,
                                                { value: e.target.value, suggestionId: suggestion.id }
                                              ])
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
                <>
                  <div className='row' style={{ width: '900px' }}>
                    <div style={{ width: '700px' }}>
                      <Card>
                        <CardContent>
                          <h2>Quiz Terminé! 🏁🏁</h2>
                          <h3>Résultats</h3>
                          <p>Score Total: {totalScore}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div style={{ width: '700px' }}>
                      <Card>
                        <CardContent>
                          <div>
                            <h4>Points forts 💪:</h4>
                            <p>{chatGptResponse1}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div style={{ width: '700px' }}>
                      <Card>
                        <CardContent>
                          <div>
                            <h4>Angles morts 🚩:</h4>
                            <p>{chatGptResponse2}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      {!submitted ? (
        <div className='bg-partical-2'>
          <img src='/images/quiz/partical_2.png' alt='Partical' />
        </div>
      ) : null}
    </>
  )
}

export default Quiz
