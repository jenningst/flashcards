// todo: pull in question collection into state
const fakeDatabase = {
  javascript: {
    questions: {
      byId: {
        1: {
          id: 1,
          text: '"JavaScript lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae ultrices eros. Mauris bibendum orci purus, id luctus odio molestie eu. Suspendisse potenti. Donec ut eleifend lacus. Suspendisse malesuada ante bibendum, cursus mi id, finibus arcu. Cras convallis tincidunt facilisis. Cras ac orci non justo elementum pellentesque non eu orci. Integer bibendum nec nulla at tempor. Nunc faucibus felis auctor nisi iaculis semper in nec enim. Nullam dui urna, auctor eu ante non, aliquet volutpat?"',
          answer: '4',
        },
        2: {
          id: 2,
          text: 'What is the capitol of Sweden?',
          answer: 'Stockholm',
        },
      },
      allIds: [1, 2],
    },
  },
  css: {
    questions: {
      byId: {
        1: {
          id: 1,
          text: '"CSS lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae ultrices eros. Mauris bibendum orci purus, id luctus odio molestie eu. Suspendisse potenti. Donec ut eleifend lacus. Suspendisse malesuada ante bibendum, cursus mi id, finibus arcu. Cras convallis tincidunt facilisis. Cras ac orci non justo elementum pellentesque non eu orci. Integer bibendum nec nulla at tempor. Nunc faucibus felis auctor nisi iaculis semper in nec enim. Nullam dui urna, auctor eu ante non, aliquet volutpat?"',
          answer: 'Flexbox, duh.',
        },
        2: {
          id: 2,
          text: 'Who is your daddy and what does he do?',
          answer: 'Um, nun-ya-business',
        },
      },
      allIds: [1, 2],
    }
  },
  angular: { questions: { byId: {}, allIds: []}},
  html: { questions: { byId: {}, allIds: []}},
  react: { questions: { byId: {}, allIds: []}},
  theory: { questions: { byId: {}, allIds: []}},
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchQuestions = (filter, pack) =>
  delay(500).then(() => {
    switch (filter) {
      case 'ALL':
        console.log('all');
        console.log(pack);
        console.log(fakeDatabase[pack]);
        return fakeDatabase[pack];
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });

export { fakeDatabase };