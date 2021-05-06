// @ts-nocheck
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHotkeys } from 'react-hotkeys-hook'

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 25,
  duration: 1,
}

const questionVariants = {
  hidden: { opacity: 0, translateY: 200 },
  show: {
    opacity: 1,
    translateY: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const variant = {
  hidden: { opacity: 0, translateY: 50 },
  show: { opacity: 1, translateY: 0 },
}

interface Props {
  item: {
    qid: string
    type: string
    question: string
    answers: [string]
    chosenAnswer?: string
    button?: string
  }
  nextSlide: () => {}
  chooseAnswer: () => {}
}

export function Options({ qid, answers, chosenAnswer, chooseAnswer }) {
  useHotkeys('1', () => {
    chooseAnswer(qid, answers && answers[0])
  })
  useHotkeys('2', () => {
    chooseAnswer(qid, answers && answers[1])
  })
  useHotkeys('3', () => {
    chooseAnswer(qid, answers && answers[2])
  })
  useHotkeys('4', () => {
    chooseAnswer(qid, answers && answers[3])
  })
  return answers.map((ans, i) => (
    <motion.li
      key={i}
      variants={variant}
      onClick={() => chooseAnswer(qid, ans)}
      className={`${chosenAnswer === ans ? 'active' : ''}`}
    >
      <kbd title={`Key ${i + 1}`}>{i + 1}</kbd>
      <a href="#">{ans}</a>
    </motion.li>
  ))
}

export default function Question({ item, chooseAnswer, nextSlide }: Props) {
  // const [answer, setAnswer] = useState(item.chosenAnswer)

  const isWelcomeSlide = item.type === 'welcome'
  function isEnableNext() {
    const hasChosenAnswer = typeof item.chosenAnswer !== 'undefined'
    return hasChosenAnswer || isWelcomeSlide
  }

  const handleNextSlide = () => {
    if (isEnableNext()) {
      nextSlide()
    }
  }

  useHotkeys('enter', handleNextSlide)

  return (
    <motion.article
      variants={questionVariants}
      initial="hidden"
      animate="show"
      transition={spring}
      exit={{ opacity: 0, translateY: -50 }}
    >
      <motion.p className="h1" variants={variant}>
        {item.question}
      </motion.p>
      {item.type === 'options' && (
        <ol>
          <Options
            qid={item.qid}
            answers={item.answers}
            chosenAnswer={item.chosenAnswer}
            chooseAnswer={chooseAnswer}
          />
        </ol>
      )}
      <motion.div variants={item} className="button-container">
        <button onClick={handleNextSlide} disabled={!isEnableNext()}>
          {item.button}
        </button>
        <kbd title="Press Enter/Return key">Enter ↵</kbd>
        <div className="msg">{!isEnableNext() && 'Please choose an answer to continue'}</div>
      </motion.div>
      {isWelcomeSlide && (
        <motion.div
          className="keyboardTips"
          animate={{ opacity: [0, 1], y: [10, 0] }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <strong>&#9432; Tip:</strong> Keyboard shortcuts are marked with <kbd>Key</kbd>
        </motion.div>
      )}
    </motion.article>
  )
}
