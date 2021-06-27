import {
  formatDate,
  extractIdsFromSlug,
  mapifyArray,
  updateChoices,
  calcTotalVotes,
  calcPerc,
} from '../utils';
import questionDetail from '../redux/mock/questionDetail.json';

describe('Utils', () => {
  it('formatDate should format date string to nice easy format', () => {
    const dateString = '2015-05-27T21:22:26.431Z';

    expect(formatDate(dateString)).toEqual('27 May 2015');
  });

  it('extractIdsFromSlug extracts id from url which is at the last part in slug', () => {
    const questionSlug = '/questions/12';
    const choiceSlug = '/questions/12/choice/70';
    const choicesSlug = ['/questions/12/choice/70', '/questions/12/choice/80'];

    expect(extractIdsFromSlug(questionSlug)).toEqual('12');
    expect(extractIdsFromSlug(choiceSlug)).toEqual('70');
    expect(extractIdsFromSlug(choicesSlug)).toEqual(['70', '80']);
  });

  it('mapifyArray will convert array to map', () => {
    const questions = [{ ...questionDetail.data }];
    const func = slug => extractIdsFromSlug(slug.url);

    expect(mapifyArray(questions, func)).toEqual({
      [extractIdsFromSlug(questionDetail.data.url)]: { ...questionDetail.data },
    });
  });

  it('updateChoices updates with new choices', () => {
    const choices = [
      { ...questionDetail.data.choices[0], votes: 50 },
      { ...questionDetail.data.choices[1], votes: 60 },
    ];

    const expected = {
      ...questionDetail.data,
      choices: [
        ...choices,
        questionDetail.data.choices[2],
        questionDetail.data.choices[3],
      ],
    };

    expect(updateChoices(questionDetail.data, choices)).toEqual(expected);
  });

  it('calcTotalVotes calculate total votes of all choices in a question', () => {
    expect(calcTotalVotes(questionDetail.data)).toEqual(1);
  });

  it('calcPerc calculate percentage of votes for a choice in a question', () => {
    const voteIds = [77];
    const total = calcTotalVotes(questionDetail.data);
    const choice = questionDetail.data.choices[0];

    expect(calcPerc(choice, voteIds, total)).toEqual(parseFloat(50).toFixed(1));
  });
});
