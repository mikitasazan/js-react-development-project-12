import leoProfanity from 'leo-profanity';

leoProfanity.add(leoProfanity.getDictionary('ru'));

/** Replaces swear words with asterisks in anything users typed. */
const clean = (text) => leoProfanity.clean(text);

export default clean;
