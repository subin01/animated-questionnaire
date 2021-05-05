// @ts-nocheck
import { motion } from 'framer-motion'

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
    qid: string;
    type: string;
    question: string;
    answers: [string];
    chosenAnswer?: string;
    button?: string;
  }
  nextSlide: () => {};
  chooseAnswer: () => {};
}

export function Options({ qid, answers, chosenAnswer, chooseAnswer }) {
  return answers.map((ans, i) => (
    <motion.li
      key={i}
      variants={variant}
      onClick={() => chooseAnswer(qid, ans)}
      className={`${chosenAnswer === ans ? 'active' : ''}`}
    >
      <a href="#">{ans}</a>
    </motion.li>
  ))
}

export default function Question({ item, chooseAnswer, nextSlide }: Props) {
  const isEnableNext = item.chosenAnswer || item.type === 'welcome'
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
        <button onClick={nextSlide} disabled={!isEnableNext}>
          {item.button} &rarr;
        </button>
        {!isEnableNext && <span className="msg">Please choose one to continue</span>}
      </motion.div>
    </motion.article>
  )
}
