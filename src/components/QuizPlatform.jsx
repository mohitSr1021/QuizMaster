import { useState, useEffect } from "react"
import { Card, Button, Progress, Alert, Typography, Space, Radio } from "antd"
import { ClockCircleOutlined, TrophyOutlined, RedoOutlined } from "@ant-design/icons"
import { SAMPLE_QUESTIONS } from "../data/Data.api"
import { saveQuizAttempt, } from "../services/indexedDB"
import Celebration from "./Celebration"
import "../App.css"
import { Link, } from "react-router-dom"

const { Title, Text } = Typography

const QuizPlatform = () => {
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isActive, setIsActive] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    let timer
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimeUp()
    }
    return () => clearInterval(timer)
  }, [timeLeft, isActive])

  const handleTimeUp = () => {
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setTimeLeft(30)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      finishQuiz()
    }
  }

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)
    setIsActive(false)

    if (answerIndex === SAMPLE_QUESTIONS[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1)
    }

    setTimeout(() => {
      if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setTimeLeft(30)
        setIsActive(true)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        finishQuiz()
      }
    }, 1500)
  }

  const finishQuiz = async () => {
    const attemptData = {
      date: new Date().toLocaleString(),
      score: score + 1,
      totalQuestions: SAMPLE_QUESTIONS.length,
    }
    console.log("➡️➡️➡️ inside try", "running..")
    try {
      await saveQuizAttempt(attemptData)
      if (score === SAMPLE_QUESTIONS.length - 1) {
        setShowCelebration(true)
      }
      setShowScore(true)
    } catch (error) {
      console.error("Error saving attempt:", error)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setTimeLeft(30)
    setIsActive(true)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setShowCelebration(false)
  }

  if (showScore) {
    return (
      <Card style={{ maxWidth: 800, margin: "20px auto", }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Title level={2}>
              <TrophyOutlined style={{ color: "#faad14", marginRight: 8 }} />
              Quiz Complete!
            </Title>

            <Title level={3}>
              You scored {score} out of {SAMPLE_QUESTIONS.length}
            </Title>

            <Progress percent={(score / SAMPLE_QUESTIONS.length) * 100} status="active" style={{ marginBottom: 24 }} />
          </div>

          <div>
            <Link to={"/history"}>Check History</Link>
          </div>

          <Button type="primary" icon={<RedoOutlined />} onClick={restartQuiz} size="large" style={{ marginTop: 16 }}>
            Try Again
          </Button>
          {
            showCelebration && (
              <Celebration
                isVisible={showCelebration}
                onClose={() => setShowCelebration(false)}
                score={score}
                totalQuestions={SAMPLE_QUESTIONS.length}
              />
            )
          }
        </Space>
      </Card>
    )
  }

  return (
      <Card style={{ minWidth: 800, maxWidth: 800, margin: "20px auto", }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Title level={4}>
              Question {currentQuestion + 1}/{SAMPLE_QUESTIONS.length}
            </Title>
            <Text strong>
              <ClockCircleOutlined style={{ marginRight: 8 }} />
              {timeLeft}s
            </Text>
          </div>

          <div>
            <Title level={4}>{SAMPLE_QUESTIONS[currentQuestion].question}</Title>
            <Radio.Group style={{ width: "100%" }} value={selectedAnswer} disabled={showFeedback}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {SAMPLE_QUESTIONS[currentQuestion].options.map((option, index) => (
                  <Radio
                    key={index}
                    value={index}
                    onClick={() => handleAnswerClick(index)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      marginRight: 0,
                      backgroundColor: showFeedback
                        ? index === SAMPLE_QUESTIONS[currentQuestion].correctAnswer
                          ? "#b7eb8f"
                          : index === selectedAnswer
                            ? "#ffa39e"
                            : "transparent"
                        : "transparent",
                      borderRadius: 4,
                    }}
                  >
                    {option}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>

          {showFeedback && (
            <Alert
              message={
                selectedAnswer === SAMPLE_QUESTIONS[currentQuestion].correctAnswer
                  ? "Correct! Well done!"
                  : `Incorrect. The correct answer was: ${SAMPLE_QUESTIONS[currentQuestion].options[SAMPLE_QUESTIONS[currentQuestion].correctAnswer]
                  }`
              }
              type={selectedAnswer === SAMPLE_QUESTIONS[currentQuestion].correctAnswer ? "success" : "error"}
              showIcon
            />
          )}
        </Space>

      </Card>
  )
}

export default QuizPlatform

