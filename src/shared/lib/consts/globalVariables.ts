export const headersNameDecks = [
  { key: 'name', locale: 'tableComponentWithTypes.name', title: 'Name' },
  { key: 'cardsCount', locale: 'tableComponentWithTypes.cards', title: 'Cards' },
  { key: 'updated', locale: 'tableComponentWithTypes.lastUpdated', title: 'Last Updated' },
  { key: 'author.name', locale: 'tableComponentWithTypes.createdBy', title: 'Created by' }
];

export const headersNameCards = [
  { key: 'question', locale: 'tableComponentWithTypes.question', title: 'Question' },
  { key: 'answer', locale: 'tableComponentWithTypes.answer', title: 'Answer' },
  // { key: 'updated', locale: 'tableComponentWithTypes.lastUpdated', title: 'Last Updated' },
  { key: 'grade', locale: 'tableComponentWithTypes.grade', title: 'Grade' }
];

export const headersNameCardsMobile = [
  { key: 'question', locale: 'tableComponentWithTypes.question', title: 'Question' },
  { key: 'answer', locale: 'tableComponentWithTypes.answer', title: 'Answer' },
  { key: 'updated', locale: 'tableComponentWithTypes.lastUpdated', title: 'Last Updated' },
  { key: 'grade', locale: 'tableComponentWithTypes.grade', title: 'Grade' }
];

export const selectOptionPagination = [
  { text: '5', value: '5' },
  { text: '10', value: '10' },
  { text: '15', value: '15' },
  { text: '30', value: '30' },
  { text: '50', value: '50' }
];

export const tabsValuesData = [
  { locale: 'useTabsValuesParams.myDecks', text: 'myDecks', value: 'My Decks' },
  { locale: 'useTabsValuesParams.allDecks', text: 'allDecks', value: 'All decks' },
  { locale: 'useTabsValuesParams.favorites', text: 'favorites', value: 'Favorites' }
];
export const gradeNames = [
  { grade: 1, name: 'learnPage.didtKnow' },
  { grade: 2, name: 'learnPage.forgot' },
  { grade: 3, name: 'learnPage.aLotThought' },
  { grade: 4, name: 'learnPage.confused' },
  { grade: 5, name: 'learnPage.knewAnswer' }
];

export const initCurrentPage = '1';

export enum LikeStatus {
  DISLIKE = 'DISLIKE',
  LIKE = 'LIKE',
  NONE = 'NONE'
}
