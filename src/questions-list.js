export default [
  {
    qid: 'welcome',
    question:
      'We’ll ask some questions about your concerns, areas of interest, and finally about you.',
    type: 'welcome',
    button: 'Get Started',
  },
  {
    qid: 'user-type',
    question: 'What kind of loan are you looking for?',
    type: 'options',
    answers: ['Car loan', 'Home loan', 'Education loan', 'Others'],
    button: 'Next',
  },
  {
    qid: 'consultation-type',
    question: 'What type of consultations are you interested in?',
    type: 'options',
    answers: ['Personal', 'Online', 'Phone call', 'Others'],
    button: 'Next',
  },
  {
    qid: 'customer-type',
    question: 'Tell us about your occupation...',
    type: 'options',
    answers: ['Fulltime', 'Contractor', 'Student', "Don't want to disclose"],
    button: 'Finish',
  },
];
